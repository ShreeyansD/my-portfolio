export const owner = {
  name: "Shreeyans",
  handle: "shreeyans",
  host: "dev",
  role: "CS Student & Full-Stack Developer",
  university: "Purdue University",
  major: "B.S. Computer Science",
  year: "1st year",
  location: "West Lafayette, IN",
  focus: "Building full-stack apps & system tools",
  availability: "Open to internships",
  bio: "I'm a computer science student who likes building things end to end — from low-level system tools in C++ to full-stack web apps in React and Python. I care about fast, clean software and interfaces that feel good to use.",
  focusAreas: ["Full-stack web development", "Systems programming", "Developer tooling", "Applied ML"],
  resumeUrl: "/resume.pdf",
};

export const contacts = [
  { id: "github", label: "GitHub", value: "github.com/[your-username]", href: "https://github.com/" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/[your-username]", href: "https://linkedin.com/" },
  { id: "email", label: "Email", value: "[you@example.com]", href: "mailto:you@example.com" },
];

export const projects = [
  {
    slug: "packet-scope",
    name: "PacketScope",
    tags: ["C++", "libpcap", "CMake"],
    problem: "Debugging network issues on campus Wi-Fi meant juggling heavy GUI tools.",
    solution: "A lightweight CLI packet sniffer with live protocol breakdowns and filter expressions.",
    github: "https://github.com/",
    demo: "",
  },
  {
    slug: "study-sync",
    name: "StudySync",
    tags: ["React", "Firebase", "Tailwind"],
    problem: "Study groups lost track of shared notes and deadlines across chats.",
    solution: "Real-time collaborative boards with deadline reminders and per-course spaces.",
    github: "https://github.com/",
    demo: "https://example.com/",
  },
  {
    slug: "mini-kv",
    name: "mini-kv",
    tags: ["Go", "Raft", "gRPC"],
    problem: "Wanted to really understand how distributed databases stay consistent.",
    solution: "A replicated key-value store implementing Raft leader election and log replication.",
    github: "https://github.com/",
    demo: "",
  },
  {
    slug: "lecture-lens",
    name: "LectureLens",
    tags: ["Python", "FastAPI", "PyTorch"],
    problem: "Hour-long recorded lectures are hard to search and revise from.",
    solution: "Transcribes lectures and builds a searchable, timestamped topic index.",
    github: "https://github.com/",
    demo: "https://example.com/",
  },
];

export const skills = {
  languages: ["Python", "C++", "JavaScript", "TypeScript", "Go", "SQL"],
  developer_tools: ["Git", "Docker", "Linux", "Vim", "VS Code", "Postman"],
  systems_platforms: ["Unix/Linux", "AWS", "Firebase", "MongoDB", "PostgreSQL"],
  frameworks: ["React", "FastAPI", "Node.js", "Express", "Tailwind CSS", "PyTorch"],
};

export const resume = {
  education: `${owner.major} — ${owner.university}`,
  highlights: [
    "[Internship / role — Company, dates]",
    "[Teaching assistant / research — dates]",
    "[Hackathon win or notable achievement]",
  ],
};

export const profileForAI = JSON.stringify({ owner, contacts, projects, skills, resume });
