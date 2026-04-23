import { clients } from "@/lib/data";

/**
 * Horizontally-scrolling client wall — CSS-only, no JS. The list is duplicated
 * so that the animation can wrap seamlessly (-50% == one full list width).
 */
export function ClientsMarquee() {
  const doubled = [...clients, ...clients];
  return (
    <section className="py-24 md:py-32 border-t border-line">
      <div className="mx-auto max-w-[1680px] px-6 md:px-10">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-red font-semibold mb-3">
              04 / Klanten
            </p>
            <h2 className="font-display italic text-4xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
              Gewerkt voor, onder anderen.
            </h2>
          </div>
          <div className="hidden md:block text-[12px] text-muted max-w-xs text-right">
            Een greep uit vijftien jaar samenwerking — corporate, cultureel,
            industrieel, muziek.
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden mask-fade">
        <div className="marquee-track flex gap-16 whitespace-nowrap w-max">
          {doubled.map((c, i) => (
            <span
              key={`${c.name}-${i}`}
              className="font-display italic text-3xl md:text-5xl text-ink/40 hover:text-ink transition-colors px-4"
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
          .mask-fade {
            -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
                    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          }
        `}
      </style>
    </section>
  );
}
