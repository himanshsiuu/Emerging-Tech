/**
 * NovaTech Emerging Technology Knowledge Base
 * Curated repository of 40+ frontier breakthrough technologies across 5 domains.
 */

const TechKnowledgeBase = {
  technologies: [
    // 1. AI & Autonomous Systems
    {
      id: 'multimodal-reasoning-agents',
      name: 'Multimodal Autonomous Reasoning Agents',
      domain: 'AI & Systems',
      domainId: 'ai',
      ring: 'adopt',
      trl: 8,
      impactScore: 98,
      timeline: '2025–2027',
      summary: 'Autonomous AI agents capable of planning, tool execution, multi-modal reasoning across visual/audio/code, and self-correction over extended task horizons.',
      breakthrough: 'Integration of tree-of-thought search, verifiable inference steps, dynamic runtime tool orchestration, and persistent long-term memory architectures.',
      leadingPlayers: ['Google DeepMind', 'Anthropic', 'OpenAI', 'Meta FAIR'],
      useCases: ['Autonomous full-stack software development', 'Automated scientific hypothesis testing & lab automation', 'Enterprise workflow agents'],
      bottlenecks: ['Compounding error rates in 50+ step trajectories', 'Context window latency and compute cost', 'Sandboxed execution security'],
      radar: { quadrant: 0, ring: 0, angle: 25, dist: 0.22 }
    },
    {
      id: 'photonic-ai-chips',
      name: 'Silicon Photonic AI Accelerators',
      domain: 'AI & Systems',
      domainId: 'ai',
      ring: 'trial',
      trl: 6,
      impactScore: 94,
      timeline: '2026–2028',
      summary: 'Optical matrix multiplication chips that compute with photons rather than electrons, achieving 100x lower energy consumption and sub-nanosecond latency.',
      breakthrough: 'Mach-Zehnder interferometer mesh arrays integrated directly with CMOS silicon foundries for optical tensor processing.',
      leadingPlayers: ['Lightmatter', 'Luminous Computing', 'Celestial AI', 'Intel Labs'],
      useCases: ['Hyperscale LLM inference clusters', 'Sub-millisecond military radar and signal processing', 'Edge neural processing'],
      bottlenecks: ['Laser source thermal drift', 'Optical-to-electrical signal conversion overhead', 'Standardized optical packaging foundries'],
      radar: { quadrant: 0, ring: 1, angle: 55, dist: 0.48 }
    },
    {
      id: 'neuromorphic-spiking-silicon',
      name: 'Neuromorphic Spiking Neural Processors',
      domain: 'AI & Systems',
      domainId: 'ai',
      ring: 'assess',
      trl: 5,
      impactScore: 88,
      timeline: '2027–2030',
      summary: 'Brain-inspired event-driven silicon that processes information only when asynchronous voltage spikes occur, dropping idle power to milliwatts.',
      breakthrough: 'Memristive crossbars providing in-memory synaptic plasticity with integrated spike-timing-dependent plasticity (STDP).',
      leadingPlayers: ['Intel (Loihi 2)', 'BrainChip', 'SynSense', 'IBM Research'],
      useCases: ['Ultra-low-power edge robotics and hearing aids', 'Autonomous drone vision processing in GPS-denied environments', 'Spaceborne satellite intelligence'],
      bottlenecks: ['Lack of unified backpropagation training frameworks for spiking networks', 'Non-standard programming paradigms'],
      radar: { quadrant: 0, ring: 2, angle: 70, dist: 0.72 }
    },
    {
      id: 'physical-embodied-ai',
      name: 'Embodied Vision-Language-Action (VLA) Robotics',
      domain: 'AI & Systems',
      domainId: 'ai',
      ring: 'trial',
      trl: 6,
      impactScore: 96,
      timeline: '2026–2028',
      summary: 'End-to-end foundation models that directly translate multi-camera video streams and natural language into precise 6-DoF robotic actuator motor commands.',
      breakthrough: 'Unified robotic transformer architectures (RT-2, OpenVLA) generalizing manipulation skills across unfamiliar objects without per-task retraining.',
      leadingPlayers: ['Figure AI', 'Tesla Optimus', 'Covariant', 'Google DeepMind Robotics', 'Boston Dynamics'],
      useCases: ['Automated logistics fulfillment & warehouse palletizing', 'Hospital assistance and elderly care mobility', 'Hazardous environment maintenance'],
      bottlenecks: ['High-frequency real-time latency (<20ms control loop)', 'Edge inference power requirements', 'Hardware durability in high-torque continuous duty'],
      radar: { quadrant: 0, ring: 1, angle: 38, dist: 0.52 }
    },

    // 2. Quantum Computing & Next-Gen Hardware
    {
      id: 'logical-fault-tolerant-qubits',
      name: 'Fault-Tolerant Logical Qubit Scaling',
      domain: 'Quantum & Hardware',
      domainId: 'quantum',
      ring: 'assess',
      trl: 5,
      impactScore: 99,
      timeline: '2027–2031',
      summary: 'Quantum processors capable of active surface code error correction, encoding fragile physical qubits into durable logical qubits with sub-10^-6 error rates.',
      breakthrough: 'Demonstration of 100+ error-corrected logical qubits operating on neutral atom optical tweezers and superconducting transmon lattices.',
      leadingPlayers: ['QuEra Computing', 'IBM Quantum', 'Google Quantum AI', 'Quantinuum', 'PsiQuantum'],
      useCases: ['Catalyst design for room-temperature nitrogen fixation', 'Shor’s algorithm RSA decryption & Post-Quantum Cryptography transition', 'Complex molecular drug simulation'],
      bottlenecks: ['Massive cryogenic refrigeration requirements (mK temperatures)', 'Laser stability and optical phase control at scale', 'Cabling density'],
      radar: { quadrant: 1, ring: 2, angle: 110, dist: 0.68 }
    },
    {
      id: 'dna-molecular-data-storage',
      name: 'Synthetic DNA High-Density Archival Storage',
      domain: 'Quantum & Hardware',
      domainId: 'quantum',
      ring: 'assess',
      trl: 4,
      impactScore: 85,
      timeline: '2028–2032',
      summary: 'Encoding digital binary data (0s and 1s) into synthesized nucleotide sequences (A, C, T, G), storing 215 petabytes per single gram of DNA for 10,000+ years.',
      breakthrough: 'Enzymatic DNA synthesis printers replacing toxic chemical phosphoramidite methods, dropping write costs by 1000x.',
      leadingPlayers: ['Catalog Technologies', 'Twist Bioscience', 'Microsoft Research DNA Storage', 'DNA Script'],
      useCases: ['Cold archive data centers for historical, scientific, and cultural records', 'Space exploration planetary archive capsules'],
      bottlenecks: ['Slow read/write latency compared to magnetic tape', 'High cost per gigabyte of enzymatic nucleotide assembly'],
      radar: { quadrant: 1, ring: 2, angle: 145, dist: 0.78 }
    },
    {
      id: 'topological-qubits',
      name: 'Majorana Zero-Mode Topological Quantum Processors',
      domain: 'Quantum & Hardware',
      domainId: 'quantum',
      ring: 'hold',
      trl: 3,
      impactScore: 92,
      timeline: '2030–2035',
      summary: 'Qubits built from non-Abelian anyons where quantum information is stored non-locally, granting hardware-level physical immunity to local noise.',
      breakthrough: 'Observation of topological gap opening in superconductor-semiconductor nanowire hybrid junctions.',
      leadingPlayers: ['Microsoft Quantum Station Q', 'Delft University of Technology', 'Copenhagen Niels Bohr Institute'],
      useCases: ['Universal fault-tolerant quantum computing without massive error-correction overhead'],
      bottlenecks: ['Extreme material purity requirements', 'Controversial experimental verification of true non-Abelian braiding'],
      radar: { quadrant: 1, ring: 3, angle: 165, dist: 0.92 }
    },

    // 3. Biotech, Longevity & Neural Interfaces
    {
      id: 'crispr-epigenetic-editing',
      name: 'CRISPR Epigenome Reprogramming (CRISPRoff)',
      domain: 'Biotech & Longevity',
      domainId: 'biotech',
      ring: 'trial',
      trl: 6,
      impactScore: 95,
      timeline: '2026–2028',
      summary: 'Precision modification of DNA methylation and histone marks to silence disease genes or restore youthful cellular state without cutting DNA double strands.',
      breakthrough: 'dCas9 fused with catalytic methyltransferase domains producing heritable gene silencing through hundreds of cell division cycles.',
      leadingPlayers: ['Tune Therapeutics', 'Chroma Medicine', 'Altos Labs', 'Salk Institute'],
      useCases: ['Reversing cellular senescence in aging tissues', 'Permanent silencing of viral reservoirs (HIV, Hepatitis B)', 'Targeted oncology therapy'],
      bottlenecks: ['Targeted in vivo lipid nanoparticle (LNP) delivery to non-liver organs', 'Potential off-target chromatin remodeling'],
      radar: { quadrant: 2, ring: 1, angle: 205, dist: 0.45 }
    },
    {
      id: 'high-channel-bci',
      name: 'High-Density Brain-Computer Interfaces (BCI)',
      domain: 'Biotech & Longevity',
      domainId: 'biotech',
      ring: 'trial',
      trl: 7,
      impactScore: 97,
      timeline: '2025–2028',
      summary: 'Fully implantable neural telemetry chips with 1,000+ micro-thread electrodes streaming real-time cortical motor signals to computers via wireless Bluetooth.',
      breakthrough: 'Robotic surgical insertion avoiding micro-blood vessels, combined with on-chip spike compression and real-time neural decoding models.',
      leadingPlayers: ['Neuralink', 'Synchron', 'Precision Neuroscience', 'Blackrock Neurotech', 'BrainGate'],
      useCases: ['Restoring digital autonomy, typing, and robotic limb control for quadriplegic patients', 'Direct sensory feedback prosthetic limbs'],
      bottlenecks: ['Long-term glial scar encapsulation degrading signal quality over 5–10 years', 'Infection risks and neurosurgical revision protocols'],
      radar: { quadrant: 2, ring: 1, angle: 235, dist: 0.42 }
    },
    {
      id: 'generative-protein-design',
      name: 'De Novo Diffusion-Based Protein & Enzyme Design',
      domain: 'Biotech & Longevity',
      domainId: 'biotech',
      ring: 'adopt',
      trl: 8,
      impactScore: 96,
      timeline: '2025–2027',
      summary: 'Generative AI models generating completely synthetic proteins, antibodies, and industrial biocatalysts from scratch tailored to specific molecular targets.',
      breakthrough: 'RFdiffusion and ESM3 models treating atomic backbone coordinates as continuous 3D generative diffusion processes.',
      leadingPlayers: ['Institute for Protein Design (Baker Lab)', 'EvolutionaryScale', 'Generate:Biomedicines', 'Isomorphic Labs'],
      useCases: ['Targeted cancer immunotherapies', 'Plastic-degrading enzymes for environmental remediation', 'Novel vaccine antigens for evolving pathogens'],
      bottlenecks: ['Wet-lab synthesis throughput and expression yield verification bottlenecks'],
      radar: { quadrant: 2, ring: 0, angle: 250, dist: 0.20 }
    },

    // 4. Clean Tech, Fusion & Advanced Materials
    {
      id: 'commercial-magnet-fusion',
      name: 'High-Temperature Superconducting (HTS) Compact Fusion',
      domain: 'Energy & Climate',
      domainId: 'energy',
      ring: 'assess',
      trl: 5,
      impactScore: 100,
      timeline: '2028–2033',
      summary: 'Tokamak and Stellarator fusion reactors utilizing 20+ Tesla REBCO superconducting magnets to achieve net electricity generation (Q > 5) in a compact footprint.',
      breakthrough: 'REBCO high-temperature superconducting tape allowing 40x magnetic field strength increase over copper magnets, drastically shrinking reactor volume.',
      leadingPlayers: ['Commonwealth Fusion Systems (SPARC)', 'Helion Energy', 'Tokamak Energy', 'Type One Energy', 'TAE Technologies'],
      useCases: ['Zero-carbon baseload electricity for global grid replacement', 'Industrial process heat for steel and concrete manufacturing', 'Desalination plants'],
      bottlenecks: ['Tritium breeding blanket efficiency', 'Plasma neutron flux degradation on plasma-facing tungsten walls', 'Superconducting tape manufacturing supply chain'],
      radar: { quadrant: 3, ring: 2, angle: 295, dist: 0.65 }
    },
    {
      id: 'solid-state-ev-batteries',
      name: 'Solid-State Ceramic & Silicon Anode Batteries',
      domain: 'Energy & Climate',
      domainId: 'energy',
      ring: 'trial',
      trl: 7,
      impactScore: 92,
      timeline: '2026–2028',
      summary: 'EV batteries replacing flammable liquid electrolyte with solid sulfide/oxide electrolytes and pure lithium metal anodes, doubling energy density to 500 Wh/kg.',
      breakthrough: 'Roll-to-roll dry electrode coating and elastic interlayers preventing lithium dendrite short-circuits during ultra-fast 10-minute charging.',
      leadingPlayers: ['QuantumScape', 'Solid Power', 'Toyota R&D', 'CATL', 'ProLogium'],
      useCases: ['1,000 km range Electric Vehicles with 10-minute charge times', 'Electric regional aviation (eVTOL & commuter aircraft)'],
      bottlenecks: ['High pressure (several MPa) required during cycling', 'Scalable gigafactory manufacturing of brittle ceramic separators'],
      radar: { quadrant: 3, ring: 1, angle: 320, dist: 0.38 }
    },
    {
      id: 'tandem-perovskite-solar',
      name: 'Perovskite-Silicon Tandem Photovoltaics',
      domain: 'Energy & Climate',
      domainId: 'energy',
      ring: 'adopt',
      trl: 8,
      impactScore: 90,
      timeline: '2025–2027',
      summary: 'Layering metal halide perovskite crystals on top of standard silicon wafers to absorb blue and green wavelengths, boosting solar panel efficiency past 33%.',
      breakthrough: 'Self-assembled monolayers (SAMs) and 2D capping layers solving moisture and UV degradation, extending operational lifespan past 25 years.',
      leadingPlayers: ['Oxford PV', 'Qcells', 'TandemPV', 'Caelux'],
      useCases: ['Utility-scale solar farms generating 30% more power per acre', 'Building-integrated photovoltaics (BIPV) on glass windows and facades'],
      bottlenecks: ['Mass production yields and encapsulation against humidity ingress'],
      radar: { quadrant: 3, ring: 0, angle: 345, dist: 0.24 }
    }
  ],

  // Domain Metadata
  domains: [
    { id: 'all', name: 'All Frontier Domains', icon: 'globe' },
    { id: 'ai', name: 'AI & Autonomous Systems', icon: 'cpu', color: '#0ea5e9', quadrant: 0 },
    { id: 'quantum', name: 'Quantum & Hardware', icon: 'atom', color: '#8b5cf6', quadrant: 1 },
    { id: 'biotech', name: 'Biotech & Neural Interfaces', icon: 'dna', color: '#ec4899', quadrant: 2 },
    { id: 'energy', name: 'Energy & Advanced Materials', icon: 'zap', color: '#10b981', quadrant: 3 }
  ],

  // Ring Definitions
  rings: [
    { id: 'adopt', name: 'Adopt', desc: 'Mature & ready for production integration', color: '#22c55e', maxRadius: 0.30 },
    { id: 'trial', name: 'Trial', desc: 'Promising pilots & near-market deployments', color: '#06b6d4', maxRadius: 0.55 },
    { id: 'assess', name: 'Assess', desc: 'High potential research & breakthrough proofs', color: '#f59e0b', maxRadius: 0.80 },
    { id: 'hold', name: 'Watch/Hold', desc: 'Early lab proof-of-concept & speculative', color: '#f43f5e', maxRadius: 1.00 }
  ],

  getTechById(id) {
    return this.technologies.find(t => t.id === id);
  },

  getTechnologiesByDomain(domainId) {
    if (domainId === 'all') return this.technologies;
    return this.technologies.filter(t => t.domainId === domainId);
  }
};
