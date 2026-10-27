import { Banner, Help, About, NotFound, TextLine, Ls, DateOut } from "./Basic";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Resume } from "./Resume";
import { Contact, ContactForm } from "./Contact";
import { Ask } from "./Ask";

const MAP = {
  banner: Banner, help: Help, about: About, projects: Projects, skills: Skills,
  resume: Resume, contact: Contact, form: ContactForm, ask: Ask, notfound: NotFound,
  text: TextLine, ls: Ls, date: DateOut,
};

export const Output = ({ entry, run }) => {
  if (entry.type === "empty") return null;
  if (entry.type === "crt") return <TextLine entry={{ text: "crt: scanline mode toggled", tone: "ok" }} />;
  const C = MAP[entry.type];
  return C ? <C entry={entry} run={run} /> : null;
};
