"use client";

import { useState } from "react";

/**
 * Static contact form — submits to mailto: for now. In a later sprint we
 * can wire this up to a Next route handler + Resend/Postmark. Today's goal is
 * a working UX that *looks* complete and sends Robert a real message.
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

  const onChange = <K extends keyof typeof form>(key: K, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Projectaanvraag via studioro.com — ${form.name || "contact"}`;
    const lines = [
      `Naam: ${form.name}`,
      `Email: ${form.email}`,
      form.company && `Bedrijf: ${form.company}`,
      form.type && `Type project: ${form.type}`,
      form.budget && `Budget: ${form.budget}`,
      "",
      "Bericht:",
      form.message,
    ].filter(Boolean);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@studioro.com?subject=${encodeURIComponent(
      subject,
    )}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label="Naam"
          required
          value={form.name}
          onChange={(v) => onChange("name", v)}
        />
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => onChange("email", v)}
        />
      </div>

      <Field
        label="Bedrijf"
        optional
        value={form.company}
        onChange={(v) => onChange("company", v)}
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Select
          label="Type project"
          value={form.type}
          onChange={(v) => onChange("type", v)}
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
      />

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-[12px] uppercase tracking-[0.2em] font-semibold hover:bg-red transition-colors"
        >
          Verstuur bericht →
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
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  optional?: boolean;
  textarea?: boolean;
}) {
  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    required,
    className:
      "w-full border-b-2 border-line bg-transparent py-3 text-[16px] text-ink placeholder:text-muted-soft focus:border-ink focus:outline-none transition-colors",
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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b-2 border-line bg-transparent py-3 text-[16px] text-ink focus:border-ink focus:outline-none"
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
