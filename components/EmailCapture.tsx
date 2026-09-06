"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { submitEmail } from "@/lib/track";

/** Email capture — localStorage + console via the shared submit()/track()
 *  helper. No backend, no third party (CLAUDE.md §2, §6). */
export function EmailCapture({
  source,
  tone = "dark",
  label = "Get launch updates",
  buttonLabel = "Get launch updates",
}: {
  source: string;
  tone?: "dark" | "light";
  label?: string;
  buttonLabel?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | "new" | "duplicate">(null);
  const onDark = tone === "dark";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = submitEmail(email, source);
    if (!result.ok) {
      setError(result.error);
      setDone(null);
      return;
    }
    setError(null);
    setDone(result.duplicate ? "duplicate" : "new");
    setEmail("");
  }

  if (done) {
    return (
      <p
        className="t-bodysm"
        role="status"
        style={{
          display: "inline-flex", alignItems: "center", gap: "var(--s2)",
          minHeight: "var(--tap)",
          color: onDark ? "var(--l-on-dark)" : "var(--teal)",
        }}
      >
        <Check size={16} aria-hidden />
        {done === "duplicate"
          ? "You're already on the list — we'll be in touch."
          : "You're on the list. We'll email you when Bangalore goes live."}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className="flex flex-wrap" style={{ gap: "var(--s2)" }}>
        <input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@work.com"
          className={`input${onDark ? " input--onDark" : ""}`}
          style={{ flex: "1 1 220px", minWidth: 0 }}
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="submit"
          className={`btn t-button ${onDark ? "btn--onDark" : "btn--secondary"}`}
        >
          {buttonLabel}
        </button>
      </div>
      <p
        id={`${id}-error`}
        role="alert"
        className="t-caption"
        style={{
          marginTop: "var(--s2)", minHeight: 16,
          color: onDark ? "#F0B6A0" : "var(--rust)",
        }}
      >
        {error ?? ""}
      </p>
    </form>
  );
}
