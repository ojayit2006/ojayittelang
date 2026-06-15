export type Experience = {
  id: number;
  role: string;
  org: string;
  orgUrl?: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: string[];
  type: "work" | "internship" | "freelance";
};

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Intern",
    org: "Quantum Four Technologies & KD Logistics",
    startDate: "[START]",
    endDate: "Present",
    location: "Mumbai, India",
    type: "internship",
    bullets: [
      "Developing a computer vision pipeline for an Automated Number Plate Recognition (ANPR) system targeting logistics and access-control applications — covering the full engineering flow from image preprocessing and plate detection to character extraction and recognition.",
      "Collaborating directly with industry mentors from Quantum Four Technologies, KD Logistics, and SPTBI to understand real-world deployment constraints, edge cases, and operational requirements that go beyond what academic benchmarks typically surface.",
      "Contributing across the engineering lifecycle — system design, data collection, model evaluation, and performance optimization — rather than being confined to a single workstream.",
      "Gaining applied experience with machine learning and computer vision at the product level, where accuracy, inference speed, and reliability under variable real-world conditions are non-negotiable.",
    ],
  },
  {
    id: 2,
    role: "Research Intern",
    org: "Go Green Technologies Pvt. Ltd.",
    startDate: "[START]",
    endDate: "[END]",
    location: "Mumbai, India",
    type: "internship",
    bullets: [
      "Researched applications of Prompt Engineering and Generative AI in IoT development, exploring how large language models can assist with device configuration workflows, automated documentation, and real-time decision support in sensor-driven environments.",
      "Led a team of diploma students in a laboratory research setting — assigning tasks, tracking daily progress, and keeping the group aligned on milestones despite varying levels of technical background.",
      "Provided hands-on technical guidance on AI and IoT integration concepts, translating complex ideas into practical frameworks the team could apply directly in their experimental work.",
      "Documented research findings mapping Generative AI use cases to concrete IoT scenarios, contributing to the organization's understanding of where AI assistance adds real value in product development workflows.",
    ],
  },
];
