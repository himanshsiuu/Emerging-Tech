/**
 * NovaTech - AI Emerging Technology Agent & Gemini 3.7 Engine
 */

const TechAgent = {
  // Generate Morning Frontier Briefing
  async generateDailyBriefing() {
    const apiKey = StorageManager.getApiKey();
    const model = StorageManager.getModel();

    if (apiKey) {
      try {
        const prompt = `
You are NovaTech, an elite Principal Research Analyst specializing in emerging and frontier technologies.
Generate a concise, high-impact Daily Emerging Tech Intelligence Briefing for today.
Select the top 4 most critical breakthroughs across AI/Hardware, Quantum, Biotech/Longevity, and Fusion/Clean Energy.

Format as clean JSON:
{
  "date": "Today",
  "title": "Frontier Intelligence Briefing",
  "highlights": [
    {
      "tech": "Technology Name",
      "domain": "Domain Name",
      "summary": "1-2 punchy sentences on the exact breakthrough and commercial consequence.",
      "impact": "High / Critical",
      "readiness": "TRL 6-8"
    }
  ],
  "macroAnalysis": "3-sentence executive summary connecting these breakthroughs to global supply chain and industrial transformation."
}
`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return JSON.parse(text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
          }
        }
      } catch (e) {
        console.warn('Gemini briefing generation fallback:', e);
      }
    }

    // High-Fidelity Curated Daily Briefing
    return {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: 'Frontier Tech Intelligence Digest',
      highlights: [
        {
          tech: 'Silicon Photonic AI Accelerators',
          domain: 'AI & Systems',
          summary: 'Optical matrix multiplication achieves 100x lower energy consumption over traditional GPUs, bypassing electrical interconnect thermal limits.',
          impact: 'Critical',
          readiness: 'TRL 6 (Pilot Trials)'
        },
        {
          tech: 'High-Density Brain-Computer Interfaces (BCI)',
          domain: 'Biotech & Neural Interfaces',
          summary: '1,000+ channel wireless cortical implants successfully restore full desktop digital control and sub-50ms robotic arm dexterity.',
          impact: 'Critical',
          readiness: 'TRL 7 (Human Trials)'
        },
        {
          tech: 'Compact HTS Magnetic Fusion',
          domain: 'Energy & Climate',
          summary: '20-Tesla REBCO superconducting magnets demonstrate stable plasma confinement, accelerating commercial net-electricity timeline to 2030.',
          impact: 'Transformational',
          readiness: 'TRL 5 (Prototype)'
        },
        {
          tech: 'Fault-Tolerant Logical Qubit Scaling',
          domain: 'Quantum & Hardware',
          summary: 'Demonstration of 100+ error-corrected logical qubits on neutral-atom optical tweezers paving way for quantum chemistry simulations.',
          impact: 'High',
          readiness: 'TRL 5 (Lab Validation)'
        }
      ],
      macroAnalysis: 'The convergence of photonic interconnects and high-density neural telemetry signals a shift toward physical-digital computing architectures that operate beyond traditional Von Neumann silicon bottlenecks.'
    };
  },

  // Deep Dive Synthesis for a Specific Technology
  async getDeepDive(techId) {
    const tech = TechKnowledgeBase.getTechById(techId);
    if (!tech) return null;

    const apiKey = StorageManager.getApiKey();
    const model = StorageManager.getModel();

    if (apiKey) {
      try {
        const prompt = `
You are NovaTech Principal Analyst. Provide an exhaustive technical briefing on the emerging technology: "${tech.name}".
Domain: ${tech.domain} | TRL: ${tech.trl} | Disruption Score: ${tech.impactScore}/100.

Return JSON:
{
  "executiveSummary": "2-3 comprehensive sentences",
  "underlyingMechanism": "Deep technical explanation of how the breakthrough operates at a physics/hardware/software level",
  "competitiveLandscape": [
    { "player": "Company / Lab name", "focus": "Their specific architectural approach or advantage" }
  ],
  "commercialTimeline": "Detailed 3-5 year projection",
  "technicalBottlenecks": ["Bullet 1", "Bullet 2", "Bullet 3"],
  "industrialDisruption": "Which legacy markets and industries will be disrupted"
}
`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim());
            return { ...tech, ...parsed };
          }
        }
      } catch (e) {
        console.warn('Gemini deep dive fallback:', e);
      }
    }

    // Curated Deep Dive Fallback
    return {
      ...tech,
      executiveSummary: tech.summary,
      underlyingMechanism: tech.breakthrough,
      competitiveLandscape: tech.leadingPlayers.map(p => ({
        player: p,
        focus: `Frontier research and active deployment in ${tech.domain}.`
      })),
      commercialTimeline: `Expected commercial scaling between ${tech.timeline}, reaching main enterprise adoption at TRL 8–9.`,
      technicalBottlenecks: tech.bottlenecks,
      industrialDisruption: `Major disruption anticipated in traditional ${tech.domain} workflows, dropping compute/energy barriers and enabling new market categories.`
    };
  },

  // Conversational Frontier Tech Analyst
  async askAnalyst(question, contextTech = null) {
    const apiKey = StorageManager.getApiKey();
    const model = StorageManager.getModel();

    if (apiKey) {
      try {
        const prompt = `
You are NovaTech, an authoritative, deeply knowledgeable Principal Frontier Technology Analyst.
${contextTech ? `Current Context Technology: "${contextTech.name}" (${contextTech.domain}, TRL ${contextTech.trl})` : ''}

User Query: "${question}"

Provide a concise, technically rigorous, and objective breakdown with bullet points, naming relevant startups, silicon architectures, or scientific papers.
`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      } catch (e) {
        console.warn('Gemini analyst chat fallback:', e);
      }
    }

    // Intelligent Offline Analyst Logic
    const q = question.toLowerCase();

    if (q.includes('photonic') || q.includes('optical') || q.includes('light')) {
      return `💡 **Silicon Photonics vs GPU Accelerators:**\n\n- **Core Physics:** Photonic chips perform matrix multiplication using passive light interference through Mach-Zehnder mesh arrays, computing at the speed of light.\n- **Energy Efficiency:** Consumes ~1 femtojoule per MAC operation (versus ~10 picojoules on 3nm digital CMOS)—a 100x improvement.\n- **Leading Players:** Lightmatter, Celestial AI, Luminous Computing.\n- **Bottleneck:** Thermal drift of laser wavelengths and conversion back to electrical signals for memory storage.`;
    }

    if (q.includes('fusion') || q.includes('clean energy') || q.includes('hts')) {
      return `⚡ **High-Temperature Superconducting (HTS) Fusion Status:**\n\n- **The Breakthrough:** REBCO (Rare-Earth Barium Copper Oxide) tapes allow magnetic fields exceeding 20 Tesla, shrinking the required tokamak volume by 40x.\n- **Net Energy (Q > 1):** Commonwealth Fusion Systems' SPARC reactor and Helion Energy's Polaris are targeting commercial pilot demos between 2026–2029.\n- **Primary Challenge:** Tritium self-sufficiency breeding blankets and high neutron flux wall durability.`;
    }

    if (q.includes('quantum') || q.includes('qubit')) {
      return `⚛️ **Quantum Computing Roadmap (2026–2030):**\n\n- **Shift to Logical Qubits:** The industry has moved beyond noisy physical qubit counts to fault-tolerant logical qubits using surface and color codes.\n- **Modality Race:** Neutral atoms (QuEra) and trapped ions (Quantinuum) are leading in error mitigation, while superconducting transmons (IBM/Google) lead in raw gate speed.\n- **PQC Transition:** NIST has finalized post-quantum encryption standards (ML-KEM, ML-DSA) as quantum decryption timelines shorten.`;
    }

    return `🔬 **Frontier Intelligence Assessment:**\n\nBased on current technological velocity across ${contextTech ? contextTech.domain : 'frontier domains'}, major industrial inflection points are occurring in photonic interconnects, high-density neural telemetry, and generative enzyme engineering. You can ask me to compare specific architectures, evaluate startup roadmaps, or explain underlying physics anytime!`;
  },

  // Format and Launch WhatsApp Briefing Dispatch
  dispatchWhatsAppBriefing(briefing, recipientPhone) {
    const cleanPhone = (recipientPhone || '+919876543210').replace(/[^0-9]/g, '');

    const lines = [
      `⚡ *NovaTech Frontier Emerging Tech Briefing*`,
      `📅 *Date:* ${briefing.date || 'Today'}`,
      `---------------------------------------`,
      `*TOP BREAKTHROUGHS TO WATCH:*`
    ];

    briefing.highlights?.forEach((h, i) => {
      lines.push(
        `\n🔹 *${i + 1}. ${h.tech}* (${h.domain})`,
        `   • *Status:* ${h.readiness} | *Impact:* ${h.impact}`,
        `   • *Summary:* ${h.summary}`
      );
    });

    lines.push(
      `\n---------------------------------------`,
      `📊 *Macro Executive Takeaway:*`,
      `${briefing.macroAnalysis || 'Frontier computing and biotechnology breakthroughs are accelerating towards enterprise adoption.'}`,
      `\n_Sent via NovaTech Autonomous Emerging Tech Intelligence Agent_`
    );

    const fullMessage = lines.join('\n');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
    window.open(waUrl, '_blank');
  }
};
