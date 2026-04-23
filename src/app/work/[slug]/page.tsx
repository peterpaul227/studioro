import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { VideoEmbed } from "@/components/video-embed";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Niet gevonden" };
  return {
    title: project.title,
    description: project.teaser,
    openGraph: {
      title: project.title,
      description: project.teaser,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const bg = project.palette
    ? `linear-gradient(135deg, ${project.palette[0]} 0%, ${project.palette[1]} 100%)`
    : "#0a0a0a";

  return (
    <article className="pt-32 md:pt-36 pb-24 bg-paper">
      {/* Hero frame — Vimeo/YouTube player if available, otherwise a still */}
      <div className="mx-auto max-w-[1680px] px-6 md:px-10">
        {project.videoId && project.videoProvider ? (
          <VideoEmbed
            provider={project.videoProvider}
            id={project.videoId}
            title={project.title}
            poster={project.thumbnail}
          />
        ) : (
          <div className="relative aspect-[16/9] overflow-hidden bg-ink">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: bg }} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 text-paper/60 text-[11px] font-mono tracking-[0.25em] uppercase">
              {project.categoryLabel ?? project.category} · {project.year}
            </div>
          </div>
        )}
      </div>

      {/* Title block */}
      <div className="mx-auto max-w-[1680px] px-6 md:px-10 grid md:grid-cols-[2fr_1fr] gap-10 md:gap-20 mt-16 md:mt-24">
        <div>
          <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-red mb-6">
            {project.client}
          </p>
          <h1 className="font-display italic text-5xl md:text-8xl leading-[0.95] tracking-[-0.03em]">
            {project.title}
          </h1>
        </div>
        <div className="md:pt-6">
          <dl className="space-y-5 text-[14px]">
            <div className="grid grid-cols-[80px_1fr] gap-3 pb-4 border-b border-line">
              <dt className="text-muted uppercase tracking-[0.15em] text-[11px]">
                Opdrachtgever
              </dt>
              <dd className="text-ink">{project.client}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3 pb-4 border-b border-line">
              <dt className="text-muted uppercase tracking-[0.15em] text-[11px]">
                Jaar
              </dt>
              <dd className="text-ink font-mono">{project.year}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3 pb-4 border-b border-line">
              <dt className="text-muted uppercase tracking-[0.15em] text-[11px]">
                Categorie
              </dt>
              <dd className="text-ink capitalize">
                {project.categoryLabel ?? project.category}
              </dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-3 pb-4 border-b border-line">
              <dt className="text-muted uppercase tracking-[0.15em] text-[11px]">
                Rol
              </dt>
              <dd className="text-ink">Regie, camera, montage</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Body — teaser pull + description */}
      <div className="mx-auto max-w-[1680px] px-6 md:px-10 mt-24 md:mt-32 grid md:grid-cols-[1fr_2fr] gap-10 md:gap-20">
        <SectionLabel number="01">De opdracht</SectionLabel>
        <div>
          <p className="font-display italic text-3xl md:text-5xl leading-[1.15] tracking-[-0.02em] text-ink">
            {project.teaser}
          </p>
          {project.description && (
            <p className="mt-10 text-ink/75 text-[16px] leading-[1.75] max-w-2xl">
              {project.description}
            </p>
          )}
        </div>
      </div>

      {/* Gallery — populated via CMS. For now a tasteful colored-field grid
          with the thumbnail repeated so the page doesn't feel empty. */}
      <div className="mx-auto max-w-[1680px] px-6 md:px-10 mt-24 md:mt-40">
        <Reveal>
          <SectionLabel number="02">Gallery</SectionLabel>
          <p className="mt-4 text-muted text-[14px] max-w-xl">
            Stills en achter-de-schermen beelden komen hier — via Sanity CMS
            vul je ze zelf aan per project.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`relative aspect-[4/3] ${i === 0 ? "md:col-span-2 md:aspect-[16/9]" : ""} overflow-hidden`}
              style={{ background: bg, filter: `hue-rotate(${i * 18}deg)` }}
            >
              {project.thumbnail && i === 0 && (
                <Image
                  src={project.thumbnail}
                  alt={`${project.title} — still`}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover opacity-80 mix-blend-luminosity"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono tracking-[0.25em] uppercase text-paper/50">
                Still {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next project */}
      <div className="mx-auto max-w-[1680px] px-6 md:px-10 mt-32 md:mt-52 pt-16 border-t border-line">
        <div className="flex items-baseline justify-between mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted">
            Volgend project
          </span>
          <Link
            href="/work"
            className="text-[12px] uppercase tracking-[0.2em] text-muted hover:text-ink"
          >
            ← Alle projecten
          </Link>
        </div>
        <Link
          href={`/work/${next.slug}`}
          className="group grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-center"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-ink">
            {next.thumbnail ? (
              <Image
                src={next.thumbnail}
                alt={next.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background: next.palette
                    ? `linear-gradient(135deg, ${next.palette[0]}, ${next.palette[1]})`
                    : "#0a0a0a",
                }}
              />
            )}
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-red mb-4">
              {next.client} · {next.year}
            </p>
            <h3 className="font-display italic text-4xl md:text-7xl leading-[0.95] tracking-[-0.03em] group-hover:text-red transition-colors">
              {next.title} →
            </h3>
          </div>
        </Link>
      </div>
    </article>
  );
}
