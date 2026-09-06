import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  return (
    <footer className="l-dark" style={{ background: "var(--l-deep)" }}>
      <div
        className="l-inner flex flex-wrap items-center justify-between"
        style={{ gap: "var(--s4)", padding: "var(--s8) 20px" }}
      >
        <Wordmark tone="onDark" size={18} />
        <p className="t-caption l-soft-dark">
          Hand-verified hangouts in Bangalore. Working name, working product.
        </p>
        <p className="t-caption l-soft-dark">
          © {new Date().getFullYear()} vihaara ·{" "}
          <Link href="/discover" className="l-footer-link">Open the app</Link>
        </p>
      </div>
    </footer>
  );
}
