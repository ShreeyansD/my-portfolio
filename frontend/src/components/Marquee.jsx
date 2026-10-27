const ITEMS = ["available for internships", "full-stack apps", "systems tools", "c++ / python / react", "ship → measure → refactor", "currently compiling"];

const Row = () => (
  <div className="flex shrink-0 items-center gap-10 pr-10">
    {ITEMS.map((t, i) => (
      <span key={t} className="flex items-center gap-10">
        <span className={i % 2 ? "text-outline" : "text-[#F0F6FC]"}>{t}</span>
        <span className="text-[#10B981]">✱</span>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="relative z-10 overflow-hidden border-y border-[#30363D] bg-[#0D1117] py-6" aria-hidden="true">
    <div className="marquee-track flex w-max text-3xl font-bold uppercase tracking-tight md:text-5xl">
      <Row /><Row />
    </div>
  </div>
);