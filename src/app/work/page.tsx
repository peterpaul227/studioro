import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Werk",
  description:
    "Een doorsnede van vijftien jaar film, fotografie en videokunst. Van corporate tot commercial, van event tot kunstproject.",
};

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => b.year - a.year);

  return (
    <div className="pt-32 md:pt-44 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1680px] px-6 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-red font-semibold">
            Portfolio · {sorted.length} projecten
          </p>
          <h1 className="mt-6 font-display italic text-6xl md:text-[10rem] leading-[0.9] tracking-[-0.04em]">
            Werk.
          </h1>
          <p className="mt-10 max-w-2xl text-xl md:text-2xl text-muted leading-[1.4]">
            Van sfeerimpressie tot corporate, van live event tot
            reflecterende videokunst. Een selectie uit vijftien jaar werk —
            filterbaar op categorie.
          </p>
        </Reveal>

        <div className="mt-20">
          <WorkGrid projects={sorted} />
        </div>
      </div>
    </div>
  );
}
