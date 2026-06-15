export type Achievement = {
  id: number;
  title: string;
  event: string;
  year?: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Winner",
    event: "Fortune '26 Case Competition — Delhi Technological University",
    year: "2026",
    description:
      "Built a winning strategic framework and business case that outperformed competing teams across analysis depth, financial reasoning, and presentation clarity.",
  },
  {
    id: 2,
    title: "Winner — Best UI/UX",
    event: "SPIT Software Engineering Hackathon",
    year: "",
    description:
      "Designed and implemented an interface recognized for exceptional user experience, intuitive navigation, and polished frontend execution under hackathon time constraints.",
  },
  {
    id: 3,
    title: "Top 4 Teams",
    event: "Synergy Hardware Hackathon — FRCRCE",
    year: "",
    description:
      "Reached the top 4 through rapid hardware prototyping and embedded systems problem-solving, delivering a functional solution within the competition window.",
  },
  {
    id: 4,
    title: "2nd Runner-Up",
    event: "Merge Mania Case Study Competition",
    year: "",
    description:
      "Delivered a structured business case with clear strategic recommendations, placing third overall in a competitive case study and business analysis format.",
  },
  {
    id: 5,
    title: "Finalist",
    event: "SCOE Hackathon",
    year: "",
    description:
      "Qualified as a finalist by engineering a functional technical solution under time pressure, demonstrating rapid execution, problem-solving, and effective teamwork.",
  },
];
