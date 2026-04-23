import { clsx } from "clsx";

type Props = {
  number?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "red" | "ink" | "paper";
};

export function SectionLabel({ number, children, className, tone = "red" }: Props) {
  const color = {
    red: "text-red",
    ink: "text-ink",
    paper: "text-paper",
  }[tone];
  const rule = {
    red: "bg-red",
    ink: "bg-ink",
    paper: "bg-paper/60",
  }[tone];
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <span className={clsx("h-px w-10", rule)} aria-hidden />
      <span
        className={clsx(
          "text-[11px] uppercase tracking-[0.25em] font-semibold",
          color,
        )}
      >
        {number && <span className="mr-1.5 font-mono">{number}</span>}
        {children}
      </span>
    </div>
  );
}
