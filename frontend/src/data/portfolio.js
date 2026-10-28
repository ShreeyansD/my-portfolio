export const owner = {
  name: "Shreeyans Dodda",
  handle: "shreeyans",
  host: "dev",
  role: "CS Student & Software Developer",
  university: "Purdue University",
  major: "B.S. Computer Science",
  year: "Junior standing",
  location: "West Lafayette, IN",
  focus: "Building AI-powered apps",
  availability: "Open to internships",
  bio: "I'm a Purdue computer science student who builds AI-powered apps end to end — from Flask web tools and computer-vision pipelines to RAG chatbots and cross-platform mobile apps. I like turning APIs and models into products that are simple and genuinely useful.",
  focusAreas: ["AI-powered applications", "RAG & LLM tooling", "Computer vision", "Mobile & full-stack development"],
  resumeUrl: "/resume.pdf",
};

export const contacts = [
  { id: "github", label: "GitHub", value: "github.com/ShreeyansD", href: "https://github.com/ShreeyansD" },
  { id: "linkedin", label: "LinkedIn", value: "linkedin.com/in/shreeyansd", href: "https://www.linkedin.com/in/shreeyansd" },
  { id: "email", label: "Email", value: "shreeyans21@gmail.com", href: "mailto:shreeyans21@gmail.com" },
];

export const projects = [
  {
    slug: "image-generator",
    name: "Image Generator",
    tags: ["Python", "Flask", "OpenAI", "HTML/CSS"],
    problem: "Wanted a simple way to turn text prompts into high-quality AI images straight from the browser.",
    solution: "A Flask web app that sends prompts to OpenAI's DALL-E 3, downloads and stores the results for instant display, and lets you choose how many images to generate.",
    github: "https://github.com/ShreeyansD",
    demo: "",
  },
  {
    slug: "recycling-app",
    name: "Recycling Application",
    tags: ["Python", "OpenCV", "OpenAI", "GPT-4o"],
    problem: "Sorting waste into compost, recycling, or trash is easy to get wrong in the moment.",
    solution: "A real-time webcam classifier: OpenCV captures frames, GPT-4o labels them with a strict rule-based prompt, and a live overlay shows color-coded bounding boxes and status.",
    github: "https://github.com/ShreeyansD",
    demo: "",
  },
  {
    slug: "rag-chatbot",
    name: "RAG Chatbot",
    tags: ["Python", "LangChain", "OpenAI", "Pinecone"],
    problem: "Finding a specific answer inside long PDFs means manually digging through pages.",
    solution: "A LangChain pipeline that chunks PDFs into embeddings stored in Pinecone for fast semantic search, then uses GPT-4o to answer questions and cite its document sources.",
    github: "https://github.com/ShreeyansD",
    demo: "",
  },
  {
    slug: "reminder-app",
    name: "Reminder App",
    tags: ["React Native", "Expo", "TypeScript", "Twilio", "Python"],
    problem: "Push notifications are easy to ignore before an important event.",
    solution: "A cross-platform mobile app with a Python backend that uses Twilio to place text-to-speech phone calls — schedule 1–3 reminder calls with a custom message.",
    github: "https://github.com/ShreeyansD",
    demo: "",
  },
];

export const skills = {
  languages: ["Python", "TypeScript", "JavaScript", "Java", "HTML/CSS"],
  frameworks: ["React Native", "Expo", "LangChain", "Node.js", "Flask"],
  developer_tools: ["Expo Go", "Twilio API", "Google Cloud Platform", "VS Code", "PyCharm"],
  libraries: ["OpenAI", "Pinecone SDK", "OpenCV", "pandas", "NumPy"],
};

export const resume = {
  education: `${owner.major} — ${owner.university} (junior standing, Aug 2026 – Dec 2028)`,
  highlights: [
    "Math Instructor — Mathnasium, Chattanooga TN (Aug – Oct 2025)",
    "UPenn Python Certification — Coursera (Apr 2025)",
    "East Hamilton High School — ranked 10/297, 4.0 unweighted GPA (2026)",
    "Built 4 AI-powered projects with OpenAI, LangChain, Pinecone & Twilio (2026)",
  ],
};

export const profileForAI = JSON.stringify({ owner, contacts, projects, skills, resume });