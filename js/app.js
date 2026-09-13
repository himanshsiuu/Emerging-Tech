/**
 * NovaTech - Main Application Controller & UI Coordinator
 */

const App = {
  currentBriefing: null,
  activeDomain: 'all',
  activeRing: 'all',
  activeView: 'radar', // 'radar' or 'grid'

  init() {
    this.setupTheme();
    this.bindEvents();
    this.renderDomainButtons();
    this.renderTechGrid();
    this.loadMorningBriefing();

    // Initialize Radar
    TechRadar.init();
    this.checkApiStatus();
  },

  setupTheme() {
    const saved = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', saved);
    const btn = document.getElementById('btn-theme-toggle');
    if (btn) {
      btn.innerHTML = saved === 'light' ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
    }
  },

  toggleTheme() {
    const curr = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = curr === 'dark' ? 'light' : 'dark';
    StorageManager.setTheme(next);
    this.setupTheme();
    if (window.lucide) lucide.createIcons();
    TechRadar.draw();
  },

  async checkApiStatus() {
    try {
      const res = await fetch('/api/status');
      if (res.ok) {
        const data = await res.json();
        const badge = document.getElementById('api-status-badge');
        if (badge) {
          if (data.hasApiKey) {
            badge.innerHTML = `<span class="pulse-dot" style="background:#22c55e"></span> Gemini 3.7 Live Agent`;
            badge.style.color = '#22c55e';
          } else {
            badge.innerHTML = `<span class="pulse-dot" style="background:#0ea5e9"></span> Autonomous Knowledge Engine`;
            badge.style.color = '#0ea5e9';
          }
        }
      }
    } catch (e) {}
  },

  bindEvents() {
    // Search input
    const searchInput = document.getElementById('tech-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        TechRadar.searchQuery = val;
        TechRadar.draw();
        this.renderTechGrid();
      });
    }

    // Chat prompt enter key
    const chatInput = document.getElementById('chat-prompt-input');
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSendMessage();
        }
      });
    }

    // Settings Modal
    const apiKeyInput = document.getElementById('setting-api-key');
    const modelSelect = document.getElementById('setting-gemini-model');
    const phoneInput = document.getElementById('setting-user-phone');
    if (apiKeyInput) apiKeyInput.value = StorageManager.getApiKey();
    if (modelSelect) modelSelect.value = StorageManager.getModel();
    if (phoneInput) phoneInput.value = StorageManager.getUserPhone();
  },

  renderDomainButtons() {
    const container = document.getElementById('domain-filter-group');
    if (!container) return;

    container.innerHTML = TechKnowledgeBase.domains.map(d => `
      <button class="domain-btn ${this.activeDomain === d.id ? 'active' : ''}" 
              onclick="App.setDomainFilter('${d.id}')">
        <i data-lucide="${d.icon}"></i>
        <span>${d.name}</span>
      </button>
    `).join('');

    if (window.lucide) lucide.createIcons();
  },

  setDomainFilter(domainId) {
    this.activeDomain = domainId;
    TechRadar.activeDomain = domainId;
    this.renderDomainButtons();
    TechRadar.draw();
    this.renderTechGrid();
  },

  setRingFilter(ringId) {
    this.activeRing = ringId;
    TechRadar.activeRing = ringId;
    TechRadar.draw();
    this.renderTechGrid();
  },

  renderTechGrid() {
    const container = document.getElementById('tech-grid-container');
    if (!container) return;

    let items = TechKnowledgeBase.technologies;

    if (this.activeDomain !== 'all') {
      items = items.filter(t => t.domainId === this.activeDomain);
    }
    if (this.activeRing !== 'all') {
      items = items.filter(t => t.ring === this.activeRing);
    }
    if (TechRadar.searchQuery) {
      const q = TechRadar.searchQuery.toLowerCase();
      items = items.filter(t => t.name.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q));
    }

    if (items.length === 0) {
      container.innerHTML = `<div class="text-muted text-center" style="grid-column: 1/-1; padding: 3rem;">No frontier technologies match current filter.</div>`;
      return;
    }

    container.innerHTML = items.map(t => {
      const ringClass = `ring-${t.ring}`;
      const isBookmarked = StorageManager.isBookmarked(t.id);

      return `
        <div class="tech-card" onclick="App.openDeepDiveModal('${t.id}')">
          <div>
            <div class="tech-card-header">
              <span class="tech-domain-pill">${t.domain}</span>
              <span class="tech-ring-pill ${ringClass}">${t.ring.toUpperCase()}</span>
            </div>
            <h3 class="tech-title">${t.name}</h3>
            <p class="tech-desc">${t.summary}</p>
          </div>

          <div>
            <div class="tech-meta-row">
              <div class="score-badge">
                <i data-lucide="zap" style="width: 14px; height: 14px;"></i>
                <span>Disruption: ${t.impactScore}/100</span>
              </div>
              <div class="trl-badge">TRL ${t.trl} &bull; ${t.timeline}</div>
            </div>
            <div class="flex justify-between items-center" style="margin-top: 0.75rem;">
              <span style="font-size: 0.78rem; color: var(--primary-light); font-weight: 600;">View Deep Dive Report &rarr;</span>
              <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); App.toggleBookmark('${t.id}')" title="Save Bookmark">
                <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" style="width: 14px; height: 14px; color: ${isBookmarked ? 'var(--accent-emerald)' : 'var(--text-dim)'}"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
  },

  toggleBookmark(techId) {
    StorageManager.toggleBookmark(techId);
    this.renderTechGrid();
  },

  async loadMorningBriefing() {
    const listEl = document.getElementById('briefing-items-list');
    const macroEl = document.getElementById('briefing-macro-text');

    this.currentBriefing = await TechAgent.generateDailyBriefing();

    if (macroEl) {
      macroEl.textContent = this.currentBriefing.macroAnalysis || '';
    }

    if (listEl) {
      listEl.innerHTML = (this.currentBriefing.highlights || []).map(h => `
        <div class="briefing-item" onclick="App.askFromBriefing('${h.tech}')">
          <div class="flex justify-between items-center" style="margin-bottom: 2px;">
            <span class="tech-domain-pill" style="font-size: 0.65rem; padding: 0.1rem 0.45rem;">${h.domain}</span>
            <span style="font-size: 0.72rem; color: var(--accent-emerald); font-weight: 700;">${h.readiness}</span>
          </div>
          <strong>${h.tech}</strong>
          <span>${h.summary}</span>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();
  },

  triggerWhatsAppDispatch() {
    if (!this.currentBriefing) return;
    const phone = StorageManager.getUserPhone();
    TechAgent.dispatchWhatsAppBriefing(this.currentBriefing, phone);
  },

  // Deep Dive Technical Modal
  async openDeepDiveModal(techId) {
    const modal = document.getElementById('modal-deep-dive');
    const content = document.getElementById('deep-dive-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="text-center" style="padding: 3rem;">
        <div class="pulse-dot" style="width:16px;height:16px;margin: 0 auto 1rem;"></div>
        <p class="text-muted">Synthesizing technical architecture and competitive landscape...</p>
      </div>
    `;
    modal.classList.add('active');

    const deepData = await TechAgent.getDeepDive(techId);
    if (!deepData) return;

    content.innerHTML = `
      <div class="tech-deep-header">
        <div>
          <span class="tech-domain-pill">${deepData.domain} &bull; ${deepData.ring.toUpperCase()}</span>
          <h2 style="font-size: 1.6rem; margin-top: 0.4rem;">${deepData.name}</h2>
          <p class="text-muted" style="margin-top: 0.25rem;">${deepData.executiveSummary}</p>
        </div>
        <button class="btn btn-secondary btn-icon-only" onclick="App.closeDeepDiveModal()">
          <i data-lucide="x"></i>
        </button>
      </div>

      <div class="tech-stat-grid">
        <div class="tech-stat-box">
          <div class="stat-lbl">Disruption Score</div>
          <div class="stat-val" style="color: var(--accent-amber);">${deepData.impactScore}/100</div>
        </div>
        <div class="tech-stat-box">
          <div class="stat-lbl">Readiness Level</div>
          <div class="stat-val" style="color: var(--accent-cyan);">TRL ${deepData.trl}</div>
        </div>
        <div class="tech-stat-box">
          <div class="stat-lbl">Commercial Window</div>
          <div class="stat-val" style="color: var(--accent-emerald); font-size: 1.1rem;">${deepData.timeline}</div>
        </div>
      </div>

      <div class="section-block">
        <h4><i data-lucide="cpu" style="color: var(--primary-light);"></i> Core Physical / Technical Mechanism</h4>
        <p>${deepData.underlyingMechanism}</p>
      </div>

      <div class="section-block">
        <h4><i data-lucide="building-2" style="color: var(--accent-purple);"></i> Key Research Labs & Commercial Leaders</h4>
        <div class="flex" style="flex-wrap: wrap; gap: 0.5rem; margin-top: 0.35rem;">
          ${(deepData.leadingPlayers || []).map(p => `
            <span class="chip" style="background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.3); color: #ffffff; font-weight: 600;">
              ${p}
            </span>
          `).join('')}
        </div>
      </div>

      <div class="section-block">
        <h4><i data-lucide="alert-triangle" style="color: var(--accent-rose);"></i> Primary Technical Bottlenecks</h4>
        <ul>
          ${(deepData.technicalBottlenecks || []).map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>

      <div class="section-block">
        <h4><i data-lucide="rocket" style="color: var(--accent-emerald);"></i> Industrial & Market Disruption</h4>
        <p>${deepData.industrialDisruption}</p>
      </div>

      <div class="modal-footer" style="padding: 1rem 0 0; margin-top: 1.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="App.askAnalystAboutTech('${deepData.name}')">
          <i data-lucide="message-square"></i> Ask AI Analyst About This
        </button>
        <button class="btn btn-whatsapp-briefing btn-sm" style="width: auto; padding: 0.5rem 1rem;" onclick="App.sendTechToWhatsApp('${deepData.name}', '${deepData.summary}')">
          <i data-lucide="send"></i> Send Briefing to WhatsApp
        </button>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  },

  closeDeepDiveModal() {
    const modal = document.getElementById('modal-deep-dive');
    if (modal) modal.classList.remove('active');
  },

  sendTechToWhatsApp(name, summary) {
    const phone = StorageManager.getUserPhone();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = `⚡ *NovaTech Emerging Tech Spotlight: ${name}*\n\n📝 *Overview:* ${summary}\n\n_Generated by NovaTech Emerging Tech Intelligence Agent_`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  },

  // AI Analyst Chat
  async handleSendMessage(customPrompt) {
    const input = document.getElementById('chat-prompt-input');
    const msg = customPrompt || input?.value?.trim();
    if (!msg) return;

    if (input) input.value = '';

    const history = document.getElementById('analyst-chat-history');
    if (!history) return;

    history.innerHTML += `
      <div class="chat-msg user">${msg}</div>
    `;
    history.scrollTop = history.scrollHeight;

    const typingId = `typing_${Date.now()}`;
    history.innerHTML += `
      <div class="chat-msg agent" id="${typingId}"><em>Analyzing frontier literature...</em></div>
    `;
    history.scrollTop = history.scrollHeight;

    const reply = await TechAgent.askAnalyst(msg);

    const typingEl = document.getElementById(typingId);
    if (typingEl) {
      typingEl.innerHTML = reply.replace(/\n/g, '<br>');
    }
    history.scrollTop = history.scrollHeight;
  },

  askFromBriefing(techName) {
    this.handleSendMessage(`What are the primary commercial bottlenecks and startup leaders for ${techName}?`);
  },

  askAnalystAboutTech(techName) {
    this.closeDeepDiveModal();
    this.handleSendMessage(`Give me an in-depth architectural comparison between ${techName} and legacy solutions.`);
  },

  // Modals
  openSettingsModal() {
    const modal = document.getElementById('modal-tech-settings');
    if (modal) modal.classList.add('active');
  },

  closeSettingsModal() {
    const modal = document.getElementById('modal-tech-settings');
    if (modal) modal.classList.remove('active');
  },

  async saveSettings() {
    const key = document.getElementById('setting-api-key')?.value?.trim() || '';
    const model = document.getElementById('setting-gemini-model')?.value || 'gemini-3.7-flash';
    const phone = document.getElementById('setting-user-phone')?.value?.trim() || '+919876543210';

    StorageManager.setApiKey(key);
    StorageManager.setModel(model);
    StorageManager.setUserPhone(phone);

    try {
      await fetch('/api/save-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: key })
      });
    } catch (e) {}

    this.checkApiStatus();
    this.closeSettingsModal();
    alert('NovaTech settings updated successfully!');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
