export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "C", "C++", "Java", "SQL"],
  },
  {
    category: "AI & Machine Learning",
    skills: [
      "NLP",
      "Computer Vision",
      "Predictive Modeling",
      "Classification",
      "Clustering",
      "Time-Series Forecasting",
      "XGBoost",
      "Scikit-learn",
      "Feature Engineering",
      "Recommendation Systems",
    ],
  },
  {
    category: "Generative AI & LLMs",
    skills: [
      "Prompt Engineering",
      "RAG",
      "Semantic Search",
      "Vector Databases",
      "Embeddings",
      "Knowledge Graphs",
      "LLM Applications",
      "Voice AI",
    ],
  },
  {
    category: "Web & Full-Stack",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
      "REST APIs",
      "Git",
      "GitHub",
    ],
  },
  {
    category: "Data Science",
    skills: [
      "Pandas",
      "Data Analysis",
      "Statistical Modeling",
      "Data Visualization",
      "Quantitative Research",
      "Operations Research",
      "Simulation Modeling",
      "Supply Chain Analytics",
    ],
  },
  {
    category: "Computer Vision",
    skills: [
      "ANPR",
      "Object Detection",
      "Image Classification",
      "Image Processing",
      "OCR Workflows",
    ],
  },
  {
    category: "Electronics & Embedded",
    skills: [
      "Embedded Systems",
      "Microcontrollers",
      "ESP32",
      "IoT Systems",
      "Sensors",
      "Analog Circuits",
      "Verilog",
      "VHDL",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      "VS Code",
      "Streamlit",
      "MATLAB",
      "Jupyter Notebook",
      "Postman",
      "Linux",
    ],
  },
];
