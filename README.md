# ⚡ NovaTech — Autonomous Emerging Tech Intelligence Agent

**NovaTech** is an autonomous emerging technology intelligence platform and interactive Radar designed to track, synthesize, rate, and brief users on frontier breakthroughs across Artificial Intelligence, Quantum Computing, Synthetic Biology, Fusion Energy, and Advanced Robotics.

---

## ✨ Key Capabilities

1. **🌐 Interactive Technology Radar Visualizer**:
   - Concentric Adoption Rings: **Adopt** (TRL 8–9), **Trial** (TRL 6–7), **Assess** (TRL 4–5), **Watch/Hold** (TRL 1–3).
   - Quadrant Domains: AI & Autonomous Systems, Quantum & Hardware, Biotech & Neural Interfaces, Clean Energy & Materials.
   - Real-time sweeping beam and interactive blips with instant hover tooltips.

2. **🔬 Autonomous Deep-Dive Research Reports**:
   - In-depth physical/hardware mechanisms, leading startups & research labs, critical bottlenecks, and market disruption timelines.

3. **📲 Daily Briefing Digest & WhatsApp Dispatch**:
   - Daily executive intelligence digest summarizing top 4 breakthroughs.
   - 1-Click WhatsApp dispatch to receive morning briefings straight to your phone.

4. **💬 AI Frontier Analyst Copilot**:
   - Interactive conversational assistant powered by Google Gemini 3.7 to compare architectures, evaluate silicon limits, and explain science papers.

---

## 🚀 Quick Start

### 1. Launch the Web Platform
```bash
cd /Users/priyanshudubey/Desktop/emerging-tech-agent
python3 run_server.py
```
Open **`http://localhost:8081`** in your browser.

### 2. Run the Standalone Python CLI Agent
```bash
# Generate Daily Frontier Tech Briefing
python3 python_agent/tech_agent.py --briefing

# Generate Deep Dive on a Technology
python3 python_agent/tech_agent.py --tech "Silicon Photonic AI Accelerators" --export-md photonic_report.md
```
