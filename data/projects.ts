export type Project = {
  id: number;
  title: string;
  description: string;
  longDesc: string;
  stack: string[];
  highlights?: string[];
  github?: string;
  live?: string;
  year: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "SmartSlot",
    description: "Forecast-aware warehouse slotting optimization using machine learning, affinity mining, and simulation.",
    longDesc:
      "Warehouse slotting — deciding where products live on shelves — has a measurable impact on picker travel distance, and most facilities are leaving significant efficiency on the table with static or intuition-based layouts. SmartSlot approaches this as an optimization problem with three coordinated components: demand forecasting, product segmentation, and layout optimization. I generated realistic synthetic order histories with long-tail demand distributions, seasonality, and affinity-driven purchasing behavior to simulate a real warehouse environment. XGBoost forecasts next-7-day SKU demand; K-Means clusters products into fast, medium, and slow movers; and Apriori association-rule mining combined with graph-based affinity analysis surfaces co-purchased product pairs that should be stored adjacently. The optimized layout is then evaluated through a picker-distance simulation against a random baseline. Across tests, the system achieved a 25.1% reduction in average picker travel distance — a material operational improvement. An interactive Streamlit dashboard surfaces all analytics for operational review.",
    stack: ["Python", "XGBoost", "Scikit-learn", "Pandas", "NetworkX", "Streamlit"],
    highlights: [
      "25.1% reduction in average picker travel distance vs. random baseline",
      "Realistic synthetic warehouse simulation with seasonality and demand spikes",
      "XGBoost demand forecasting + K-Means velocity segmentation pipeline",
      "Apriori + graph-based affinity analysis for co-location optimization",
      "Interactive Streamlit dashboard for operational analytics and visualization",
    ],
    year: "2025",
  },
  {
    id: 2,
    title: "Nexus",
    description: "Workflow automation platform for streamlining multi-stage administrative approval processes.",
    longDesc:
      "Administrative approval workflows — the kind that require sign-offs from multiple stakeholders at different levels — tend to be fragile, opaque, and slow by default. Paper trails get lost, status is unclear, and no one has a single source of truth. Nexus was built to fix that. It's a full-stack workflow automation platform that lets administrators define multi-stage approval pipelines, assign roles and permissions through RBAC, and track requests in real time from submission to resolution. The MERN stack gave me flexibility in modeling the approval graph, with each stage maintaining its own state and triggering notifications as requests move through the pipeline. I focused heavily on the interface — approval workflows are only useful if everyone involved understands their queue and what's expected of them, so clarity in the UI was a design constraint, not an afterthought. The result is a system that reduces process friction and gives stakeholders clear visibility at every stage.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    highlights: [
      "Multi-stage approval pipelines with configurable stage transitions",
      "Role-based access control (RBAC) with fine-grained permission management",
      "Real-time request status tracking across the full approval lifecycle",
      "Full-stack MERN implementation with responsive, role-aware interfaces",
    ],
    year: "2024",
  },
  {
    id: 3,
    title: "BIS-RAG",
    description: "Retrieval-Augmented Generation system for querying technical standards and regulatory documents.",
    longDesc:
      "LLMs are impressive at generating text but unreliable when it comes to highly specific technical or regulatory content — they hallucinate, miss nuance, and lack access to documents that postdate their training. BIS-RAG addresses this directly for Bureau of Indian Standards documentation. The system ingests BIS documents through a preprocessing pipeline that handles PDF extraction, chunking, and metadata tagging, then embeds the chunks using a semantic embedding model and stores them in a vector database. At query time, the retriever pulls the most relevant chunks based on semantic similarity, and the LLM generates a response grounded strictly in the retrieved context. I explored several chunking strategies and retrieval parameters to balance recall and precision, and experimented with prompt engineering to keep the model focused on source material rather than training priors. The project gave me hands-on understanding of where RAG pipelines succeed, where they break, and what it takes to build reliable AI on top of domain-specific corpora.",
    stack: ["Python", "RAG", "LLMs", "Vector Databases", "NLP", "Embeddings"],
    highlights: [
      "End-to-end document ingestion, chunking, and semantic embedding pipeline",
      "Vector retrieval from Bureau of Indian Standards technical documents",
      "Grounded LLM responses anchored strictly to retrieved source context",
      "Chunking strategy and prompt engineering experiments to reduce hallucinations",
    ],
    year: "2025",
  },
  {
    id: 4,
    title: "LearnifAI",
    description: "AI-powered adaptive learning platform that identifies conceptual gaps and generates personalized learning pathways.",
    longDesc:
      "Most learning tools treat wrong answers as something to move past. LearnifAI treats them as diagnostic signals. The system ingests a learner's responses, runs NLP analysis to extract the underlying concept being tested, then maps it against a prerequisite knowledge graph to identify exactly where understanding breaks down — not just what was wrong, but why it was wrong. From there, it generates a personalized remediation roadmap that addresses gaps in dependency order, so learners aren't patching surface-level errors while missing foundational concepts. Voice AI integration adds a conversational tutoring layer on top, allowing learners to engage with material through dialogue rather than passive reading. The result is a system that doesn't just assess knowledge — it actively rebuilds it. Building LearnifAI pushed me to think about learning as a graph problem, where the path from confusion to clarity is traceable and optimizable if you model it correctly.",
    stack: ["Python", "NLP", "Knowledge Graphs", "Voice AI", "React"],
    highlights: [
      "NLP-driven concept gap detection from incorrect learner responses",
      "Prerequisite knowledge graph modeling to trace root causes of misunderstanding",
      "Personalized remediation roadmaps generated in dependency order",
      "Voice AI integration for conversational tutoring and reinforcement",
    ],
    year: "2025",
  },
  {
    id: 5,
    title: "Quantifying Instability",
    description: "Quantitative research on detecting speculative bubbles in the Indian stock market through statistical and mathematical modeling.",
    longDesc:
      "Speculative bubbles in financial markets are easier to identify in retrospect than in real time — which is precisely what makes detecting them while they're forming a genuinely hard research problem. This project took a quantitative approach to that challenge, focusing on the Indian equity market. I applied the Hurst Exponent to measure long-range dependence and distinguish trending behavior from random noise — an early signal of non-random persistence that can precede bubble formation. Log-Periodic Power Law (LPPL) models were used to detect the oscillatory patterns that appear as markets approach a critical point. Kalman Filters helped extract underlying state from noisy price series, and the Phillips–Shi–Yu (PSY) test provided a formal econometric framework for detecting exuberance in time series data. Combining these techniques into a coherent analytical framework required working across disciplines — finance theory, signal processing, and statistical inference — and reinforced my appreciation for how rigorous methodology separates useful market analysis from noise.",
    stack: ["Python", "LPPL Models", "Kalman Filters", "Hurst Exponent", "PSY Test"],
    highlights: [
      "Hurst Exponent analysis for long-range dependence detection in price series",
      "Log-Periodic Power Law (LPPL) modeling for critical point identification",
      "Kalman Filter-based state extraction from noisy financial time series",
      "Phillips–Shi–Yu (PSY) test for formal market exuberance detection",
      "Cross-technique validation applied to Indian equity market data",
    ],
    year: "2025",
  },
  {
    id: 6,
    title: "EcoSphere",
    description: "Digital platform promoting waste management awareness and environmental sustainability.",
    longDesc:
      "EcoSphere was built for SPIT's Green Society as a central digital presence for their sustainability and waste management initiatives. The brief was straightforward: take campaigns running on physical flyers and fragmented social posts, and give them a permanent, accessible home online. I designed and built the site from scratch — structuring content around waste segregation practices, recycling guidance, and environmental awareness resources in a way that felt genuinely readable rather than preachy. Responsive design was a baseline requirement given the mixed device usage on campus, and accessibility considerations shaped decisions around contrast, font sizing, and navigation flow. Beyond the technical execution, the project was a useful exercise in translating a real-world organizational objective into a digital product — understanding what the Green Society was actually trying to achieve with their outreach, and designing something that served those goals rather than just looking good. It was a grounding early project in the discipline of building for a specific user, not just for the sake of building.",
    stack: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Built from scratch for SPIT's Green Society with real organizational objectives",
      "Responsive and accessible across device types for campus-wide reach",
      "Structured content hub for waste segregation, recycling, and sustainability resources",
      "Translated campaign material from physical and social formats into a coherent digital presence",
    ],
    year: "2024",
  },
  {
    id: 7,
    title: "Hairfall Detection",
    description: "Machine learning-assisted diagnostic system for identifying potential causes of hair loss from symptom profiles.",
    longDesc:
      "Clinical diagnosis for something like hair loss typically involves symptom assessment, patient history, and specialist evaluation — none of which is accessible on demand. This project explored whether a structured machine learning approach could assist in identifying the most likely causes from a given symptom profile, not as a replacement for clinical judgment, but as a first-pass decision support tool. I worked with structured symptom datasets to build a classification pipeline that combined rule-based inference — encoding known medical relationships between symptoms and causes — with predictive models trained on the data. The rule-based layer improved interpretability: rather than a black-box probability, the system could trace a recommendation back to specific input features. The prediction pipeline was designed with scalability in mind, and the recommendation generation layer handles multiple possible causes with confidence weighting. The project pushed me to think seriously about interpretability and reliability in applied ML, particularly in contexts where errors carry real consequences.",
    stack: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    highlights: [
      "Hybrid rule-based and ML classification pipeline for interpretable diagnosis",
      "Confidence-weighted multi-cause recommendation output",
      "Feature engineering from structured medical symptom datasets",
      "Prioritized interpretability to ensure recommendations are traceable, not opaque",
    ],
    year: "2024",
  },
  {
    id: 8,
    title: "Power Theft Detection",
    description: "Embedded monitoring system for detecting power theft through real-time electrical anomaly analysis.",
    longDesc:
      "Power theft is a significant problem in utility infrastructure, and detecting it reliably at the hardware level — rather than through billing anomalies discovered weeks later — requires monitoring electrical parameters in real time. This project involved designing a circuit-level detection system capable of identifying the voltage-current anomalies that typically characterize unauthorized tapping. The detection logic was implemented using a microcontroller that continuously monitored sensor readings, applied threshold-based comparison logic to distinguish normal operational variation from anomalous patterns, and triggered alerts when deviations exceeded defined bounds. The analog front-end required attention to measurement accuracy and signal conditioning to ensure the system wasn't generating false positives from normal load fluctuations. Hardware debugging at this level — tracing signals through a physical circuit, isolating noise sources, verifying sensor calibration — is a different kind of problem-solving than software work. The project gave me grounded experience in embedded systems design, signal acquisition, and the gap between a working prototype and a reliable deployed system.",
    stack: ["Embedded Systems", "Microcontrollers", "Sensors", "Analog Circuits"],
    highlights: [
      "Hardware-level voltage-current anomaly detection using sensor arrays",
      "Real-time microcontroller monitoring with threshold-based alert logic",
      "Analog signal conditioning to minimize false positives from normal load variation",
      "Full circuit design and hardware debugging from prototype to functional system",
    ],
    year: "2023",
  },
];
