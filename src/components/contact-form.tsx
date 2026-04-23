"use client";

import { useState } from "react";
import { clsx } from "clsx";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

/**
 * Contact form — POSTs to /api/contact. Server either sends via Resend or
 * logs+no-ops (preview environment). Success/failure states are shown inline
 * so the user always knows what happened.
 */
export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    type: "",
    budget: "",
    message: "",
  });
  const [state, setState] = useState<State>({ kind: "idle" });

  const onChange = <K extends keyof typeof form>(key: K, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setState({
          kind: "error",
          message: data.error ?? "Er ging iets mis. Probeer opnieuw.",
        });
        return;
      }
      setState({ kind: "sent" });
      setForm({
        name: "",
        email: "",
        company: "",
        type: "",
        budget: "",
        message: "",
      });
    } catch {
      setState({
        kind: "error",
        message:
          "Geen verbinding. Probeer opnieuw, of stuur direct naar info@studioro.com.",
      });
    }
  };

  if (state.kind === "sent") {
    return (
      <div className="border-2 border-red p-8 md:p-10 bg-paper-warm">
        <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-red mb-4">
          ✓ Verzonden
        </div>
        <h3 className="font-display italic text-3xl md:text-5xl leading-[1.1] tracking-[-0.02em] mb-4">
          Dank je. Ik reageer binnen 24 uur.
        </h3>
        <p className="text-ink/70 text-[15px] max-w-md">
          Je bericht is goed aangekomen. Tot snel.
        </p>
        <button
          onClick={() => setState({ kind: "idle" })}
          className="mt-8 text-[12px] uppercase tracking-[0.2em] underline underline-offset-4 hover:text-red"
        >
          Nog een bericht sturen →
        </button>
      </div>
    );
  }

  const disabled = state.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label="Naam"
          required
          value={form.name}
          onChange={(v) => onChange("name", v)}
          disabled={disabled}
        />
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => onChange("email", v)}
          disabled={disabled}
        />
      </div>

      <Field
        label="Bedrijf"
        optional
        value={form.company}
        onChange={(v) => onChange("company", v)}
        disabled={disabled}
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Select
          label="Type project"
          value={form.type}
          onChange={(v) => onChange("type", v)}
          disabled={disabled}
          options={[
            "Film / video",
            "Fotografie",
            "Event registratie",
            "Montage / kleurcorrectie",
            "Drone / aerial",
            "Fine-art print",
            "Anders / weet ik nog niet",
          ]}
        />
        <Select
          label="Budget indicatie"
          value={form.budget}
          onChange={(v) => onChange("budget", v)}
          disabled={disabled}
          options={[
            "< € 1.000",
            "€ 1.000 – € 5.000",
            "€ 5.000 – € 15.000",
            "€ 15.000+",
            "Nog niet bekend",
          ]}
        />
      </div>

      <Field
        label="Bericht"
        textarea
        required
        value={form.message}
        onChange={(v) => onChange("message", v)}
        disabled={disabled}
      />

      {state.kind === "error" && (
        <div className="border border-red bg-red/5 text-red px-4 py-3 text-[14px]">
          {state.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pt-4">
        <button
          type="submit"
          disabled={disabled}
          className={clsx(
            "inline-flex items-center gap-3 px-8 py-4 text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors",
            disabled
              ? "bg-muted text-paper cursor-not-allowed"
              : "bg-ink text-paper hover:bg-red",
          )}
        >
          {disabled ? (
            <>Bezig met verzenden...</>
          ) : (
            <>
              Verstuur bericht <span>→</span>
            </>
          )}
        </button>
        <span className="text-[12px] text-muted">
          Reactie binnen 24 uur (ma–vr)
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
  optional,
  textarea,
  disabled,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  optional?: boolean;
  textarea?: boolean;
  disabled?: boolean;
}) {
  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    required,
    disabled,
    className:
      "w-full border-b-2 border-line bg-transparent py-3 text-[16px] text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none transition-colors disabled:opacity-60",
  };
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">
        {label} {required && <span className="text-red">*</span>}
        {optional && <span className="text-muted-soft"> (optioneel)</span>}
      </span>
      {textarea ? (
        <textarea rows={5} {...common} />
      ) : (
        <input type={type} {...common} />
      )}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border-b-2 border-line bg-transparent py-3 text-[16px] text-ink focus:border-ink focus:outline-none disabled:opacity-60"
      >
        <option value="">— Kies —</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
