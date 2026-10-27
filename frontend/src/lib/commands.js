export const COMMANDS = [
  { cmd: "help", desc: "list every available command" },
  { cmd: "cat about.txt", desc: "bio, university, major & focus areas" },
  { cmd: "ls projects/", desc: "browse project directories" },
  { cmd: "cat skills.json", desc: "technical skills as a JSON tree" },
  { cmd: "cat resume.pdf", desc: "resume preview + download" },
  { cmd: "contact", desc: "handles with copy-to-clipboard" },
  { cmd: "sendmsg", desc: "write me a message (saved to my inbox)" },
  { cmd: "ask <question>", desc: "ask the AI anything about me" },
  { cmd: "crt", desc: "toggle CRT scanlines" },
  { cmd: "banner", desc: "print the welcome banner" },
  { cmd: "clear", desc: "clear the terminal" },
];

export const COMPLETIONS = [
  "help", "cat about.txt", "cat skills.json", "cat resume.pdf", "cat projects",
  "ls projects/", "ls", "contact", "contact --form", "sendmsg", "ask ", "crt", "banner",
  "clear", "whoami", "date",
];

const ALIASES = {
  help: "help", "?": "help", man: "help",
  about: "about", "cat about.txt": "about", whoami: "about",
  projects: "projects", "ls projects": "projects", "ls projects/": "projects", "cat projects": "projects",
  skills: "skills", "cat skills.json": "skills",
  resume: "resume", "cat resume.pdf": "resume", cv: "resume",
  contact: "contact", "contact --form": "form", sendmsg: "form",
  clear: "clear", cls: "clear", crt: "crt", banner: "banner", ls: "ls", date: "date",
};

export function parse(raw) {
  const input = raw.trim().replace(/\s+/g, " ");
  if (!input) return { type: "empty" };
  const lower = input.toLowerCase();
  if (lower === "ask" ) return { type: "text", text: "usage: ask <question>   e.g. ask what are you building right now?" };
  if (lower.startsWith("ask ")) return { type: "ask", arg: input.slice(4) };
  if (lower.startsWith("echo ")) return { type: "text", text: input.slice(5) };
  if (lower.startsWith("sudo")) return { type: "text", text: "nice try. this incident will be reported. ;)", tone: "warn" };
  const type = ALIASES[lower];
  return type ? { type } : { type: "notfound", arg: input.split(" ")[0] };
}

export function complete(partial) {
  const p = partial.toLowerCase();
  if (!p) return null;
  const hits = COMPLETIONS.filter((c) => c.startsWith(p));
  return hits.length ? hits[0] : null;
}
