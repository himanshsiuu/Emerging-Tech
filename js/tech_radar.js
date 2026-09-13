/**
 * NovaTech - Interactive Canvas Technology Radar Visualizer
 */

const TechRadar = {
  canvas: null,
  ctx: null,
  width: 600,
  height: 600,
  centerX: 300,
  centerY: 300,
  maxRadius: 270,
  hoveredTech: null,
  activeDomain: 'all',
  activeRing: 'all',
  searchQuery: '',
  sweepAngle: 0,
  animationFrameId: null,

  init() {
    this.canvas = document.getElementById('radar-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse movement on radar
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => {
      this.hoveredTech = null;
      this.canvas.style.cursor = 'crosshair';
    });
    this.canvas.addEventListener('click', () => {
      if (this.hoveredTech) {
        App.openDeepDiveModal(this.hoveredTech.id);
      }
    });

    this.startAnimation();
  },

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 680);
    const dpr = window.devicePixelRatio || 1;

    this.width = size;
    this.height = size;
    this.canvas.width = size * dpr;
    this.canvas.height = size * dpr;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;

    this.ctx.scale(dpr, dpr);
    this.centerX = size / 2;
    this.centerY = size / 2;
    this.maxRadius = (size / 2) * 0.88;
  },

  startAnimation() {
    const loop = () => {
      this.sweepAngle = (this.sweepAngle + 0.015) % (Math.PI * 2);
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = requestAnimationFrame(loop);
  },

  draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Concentric Rings
    this.drawRings();

    // 2. Draw Quadrant Axes
    this.drawAxes();

    // 3. Draw Radar Sweep Ray
    this.drawSweepRay();

    // 4. Draw Quadrant Labels
    this.drawQuadrantLabels();

    // 5. Draw Technology Blip Nodes
    this.drawBlips();

    // 6. Draw Hover Tooltip if active
    if (this.hoveredTech) {
      this.drawTooltip(this.hoveredTech);
    }
  },

  drawRings() {
    const rings = TechKnowledgeBase.rings;

    rings.forEach((ring, idx) => {
      const r = this.maxRadius * ring.maxRadius;
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, r, 0, Math.PI * 2);
      this.ctx.strokeStyle = ring.color + '33';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Ring Name Label
      this.ctx.save();
      this.ctx.fillStyle = ring.color + 'aa';
      this.ctx.font = '700 10px "Plus Jakarta Sans", sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'bottom';
      this.ctx.fillText(ring.name.toUpperCase(), this.centerX, this.centerY - r + 14);
      this.ctx.restore();
    });
  },

  drawAxes() {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    this.ctx.setLineDash([4, 6]);

    // Horizontal axis
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX - this.maxRadius, this.centerY);
    this.ctx.lineTo(this.centerX + this.maxRadius, this.centerY);
    this.ctx.stroke();

    // Vertical axis
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY - this.maxRadius);
    this.ctx.lineTo(this.centerX, this.centerY + this.maxRadius);
    this.ctx.stroke();

    this.ctx.restore();
  },

  drawSweepRay() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.centerX, this.centerY);
    this.ctx.arc(this.centerX, this.centerY, this.maxRadius, this.sweepAngle, this.sweepAngle + 0.35);
    this.ctx.closePath();

    const gradient = this.ctx.createRadialGradient(
      this.centerX, this.centerY, 10,
      this.centerX, this.centerY, this.maxRadius
    );
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.25)');
    gradient.addColorStop(1, 'rgba(14, 165, 233, 0.0)');

    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.restore();
  },

  drawQuadrantLabels() {
    this.ctx.save();
    this.ctx.font = '700 11px "Outfit", sans-serif';
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    const offset = this.maxRadius * 0.95;

    // Top-Right: AI & Systems (Quadrant 0)
    this.ctx.textAlign = 'right';
    this.ctx.fillText('AI & AUTONOMOUS SYSTEMS', this.centerX + offset, this.centerY - offset + 15);

    // Top-Left: Quantum & Hardware (Quadrant 1)
    this.ctx.textAlign = 'left';
    this.ctx.fillText('QUANTUM & HARDWARE', this.centerX - offset, this.centerY - offset + 15);

    // Bottom-Left: Biotech (Quadrant 2)
    this.ctx.textAlign = 'left';
    this.ctx.fillText('BIOTECH & NEURAL INTERFACES', this.centerX - offset, this.centerY + offset - 5);

    // Bottom-Right: Clean Energy (Quadrant 3)
    this.ctx.textAlign = 'right';
    this.ctx.fillText('ENERGY & MATERIALS', this.centerX + offset, this.centerY + offset - 5);

    this.ctx.restore();
  },

  getBlipPosition(tech) {
    const rad = (tech.radar.angle * Math.PI) / 180;
    const dist = tech.radar.dist * this.maxRadius;
    const x = this.centerX + Math.cos(rad) * dist;
    const y = this.centerY + Math.sin(rad) * dist;
    return { x, y };
  },

  drawBlips() {
    const techs = TechKnowledgeBase.technologies;

    techs.forEach((tech) => {
      // Filter check
      if (this.activeDomain !== 'all' && tech.domainId !== this.activeDomain) return;
      if (this.activeRing !== 'all' && tech.ring !== this.activeRing) return;
      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        if (!tech.name.toLowerCase().includes(q) && !tech.summary.toLowerCase().includes(q)) return;
      }

      const pos = this.getBlipPosition(tech);
      tech._renderedPos = pos;

      const isHovered = this.hoveredTech && this.hoveredTech.id === tech.id;
      const ringMeta = TechKnowledgeBase.rings.find(r => r.id === tech.ring) || { color: '#0ea5e9' };
      const dotColor = ringMeta.color;

      this.ctx.save();

      // Outer glow on hover or high impact
      if (isHovered || tech.impactScore >= 98) {
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, isHovered ? 14 : 10, 0, Math.PI * 2);
        this.ctx.fillStyle = dotColor + '44';
        this.ctx.fill();
      }

      // Core blip dot
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, isHovered ? 7 : 5, 0, Math.PI * 2);
      this.ctx.fillStyle = dotColor;
      this.ctx.shadowColor = dotColor;
      this.ctx.shadowBlur = isHovered ? 15 : 6;
      this.ctx.fill();

      // Mini text label next to blip
      this.ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
      this.ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)';
      this.ctx.textAlign = pos.x > this.centerX ? 'left' : 'right';
      this.ctx.fillText(tech.name.split(' ')[0], pos.x + (pos.x > this.centerX ? 9 : -9), pos.y + 3);

      this.ctx.restore();
    });
  },

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let closest = null;
    let minDist = 18; // Hit radius

    TechKnowledgeBase.technologies.forEach((tech) => {
      if (!tech._renderedPos) return;
      const dx = mouseX - tech._renderedPos.x;
      const dy = mouseY - tech._renderedPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) {
        minDist = dist;
        closest = tech;
      }
    });

    this.hoveredTech = closest;
    this.canvas.style.cursor = closest ? 'pointer' : 'crosshair';
  },

  drawTooltip(tech) {
    if (!tech._renderedPos) return;
    const pos = tech._renderedPos;

    const padding = 12;
    const boxWidth = 230;
    const boxHeight = 85;

    let boxX = pos.x + 14;
    let boxY = pos.y - 45;

    if (boxX + boxWidth > this.width) boxX = pos.x - boxWidth - 14;
    if (boxY < 10) boxY = 10;
    if (boxY + boxHeight > this.height) boxY = this.height - boxHeight - 10;

    this.ctx.save();
    // Glass tooltip background
    this.ctx.fillStyle = 'rgba(13, 18, 29, 0.95)';
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
    this.ctx.fill();
    this.ctx.stroke();

    // Tooltip Content
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '700 12px "Outfit", sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(tech.name.substring(0, 28) + (tech.name.length > 28 ? '...' : ''), boxX + padding, boxY + 22);

    this.ctx.font = '500 10px "Plus Jakarta Sans", sans-serif';
    this.ctx.fillStyle = '#94a3b8';
    this.ctx.fillText(`${tech.domain} • ${tech.ring.toUpperCase()} (TRL ${tech.trl})`, boxX + padding, boxY + 40);

    this.ctx.fillStyle = '#38bdf8';
    this.ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
    this.ctx.fillText(`⚡ Disruption Score: ${tech.impactScore}/100`, boxX + padding, boxY + 60);

    this.ctx.fillStyle = '#64748b';
    this.ctx.font = '500 9px "Plus Jakarta Sans", sans-serif';
    this.ctx.fillText('Click node for full Deep Dive report →', boxX + padding, boxY + 75);

    this.ctx.restore();
  }
};
