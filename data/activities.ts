export type Activity = {
  id: number;
  title: string;
  org: string;
  role: string;
  period: string;
  description: string;
  category: "hackathon" | "club" | "competition" | "volunteer" | "other";
  tags: string[];
};

export const activities: Activity[] = [
  {
    id: 1,
    title: "Events Head",
    org: "CSI — SPIT",
    role: "Events Head",
    period: "[START] – [END]",
    category: "club",
    tags: ["Event Management", "Leadership", "Logistics", "CSI"],
    description:
      "As Events Head for CSI's student chapter at SPIT, I planned and ran technical events end-to-end — from logistics and speaker coordination to managing teams and keeping stakeholders in the loop. The role meant a lot of simultaneous moving parts: confirming venue arrangements, chasing sponsor commitments, briefing volunteers, and adapting on the fly when things didn't go as planned. What made it interesting was figuring out how to keep a team motivated toward a shared deadline while handling a constant stream of last-minute changes. Every event we pulled off cleanly taught me something about what good coordination actually looks like in practice.",
  },
  {
    id: 2,
    title: "Head of Subcommittee",
    org: "IEEE SPIT",
    role: "Head of Subcommittee",
    period: "[START] – [END]",
    category: "club",
    tags: ["Leadership", "Team Management", "IEEE", "Outreach"],
    description:
      "Leading a subcommittee within the IEEE SPIT student chapter meant being accountable for a team's output, not just my own. I managed task distribution, tracked progress across multiple workstreams, and kept communication flowing between members and chapter leadership. The challenge wasn't just getting things done — it was building a group that could move independently without constant check-ins. I worked closely with the broader chapter on events and outreach, which gave me a clear view of how decisions made at one level shape the work at another. The experience sharpened my sense of how to delegate effectively and hold things together without micromanaging.",
  },
  {
    id: 3,
    title: "Subcommittee Member",
    org: "IETE SPIT",
    role: "Subcommittee Member",
    period: "[START] – [END]",
    category: "club",
    tags: ["Content Creation", "Outreach", "Social Media", "IETE"],
    description:
      "At the IETE SPIT student chapter, I contributed to outreach and engagement as a subcommittee member — helping organize events and campaigns, and creating promotional content for social media and campus platforms. The work taught me early on that execution matters as much as intention: good ideas still need clear messaging, coordinated timing, and follow-through across teams. I worked with both internal committees and external stakeholders, which meant learning to adapt my communication depending on the audience. It was my first real experience contributing to something larger than a solo project, and it gave me solid grounding in how collaborative initiatives actually get done.",
  },
  {
    id: 4,
    title: "Data Acquisition Team",
    org: "Alumni Relations — SPIT",
    role: "Team Member",
    period: "[START] – [END]",
    category: "volunteer",
    tags: ["Alumni Outreach", "Networking", "Stakeholder Relations"],
    description:
      "Working with SPIT's Alumni Relations team, I focused on outreach to alumni for speaker panels and networking initiatives during major college events. The work involved more nuance than a standard communication task — identifying the right alumni, crafting messages that felt personal rather than templated, and coordinating follow-ups without coming across as pushy. I worked alongside both alumni and event stakeholders to make sure the right people were in the right place at the right time. It gave me a genuine appreciation for relationship-driven work and the quieter logistics that make high-visibility events actually come together.",
  },
];
