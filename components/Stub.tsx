import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "./Wordmark";

/** Placeholder for the app screens that arrive in the next slice. Keeps the
 *  routes real so every landing link resolves. */
export function Stub({ title, note }: { title: string; note: string }) {
  return (
    <main className="app-shell screen" style={{ padding: "var(--s6) var(--s5) var(--s10)" }}>
      <Link href="/" style={{ textDecoration: "none" }}>
        <Wordmark />
      </Link>
      <h1 className="t-h1 c-ink" style={{ marginTop: "var(--s8)" }}>{title}</h1>
      <p className="t-body c-soft" style={{ marginTop: "var(--s3)" }}>{note}</p>
      <Link
        href="/"
        className="btn btn--secondary t-button"
        style={{ marginTop: "var(--s6)" }}
      >
        <ArrowLeft size={16} aria-hidden /> Back to the landing page
      </Link>
    </main>
  );
}
