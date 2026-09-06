import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/** Primary CTA with the nested icon island — the arrow never sits naked
 *  beside the label (high-end-visual-design §4B). */
export function Cta({
  href,
  children,
  variant = "amber",
  size = "md",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "amber" | "primary" | "onDark";
  size?: "md" | "sm" | "lg";
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`btn btn--${variant} btn--pill${size === "sm" ? " btn--sm" : ""}${size === "lg" ? " btn--lg" : ""} t-button`}
      onClick={onClick}
    >
      <span>{children}</span>
      <span className="l-btn-orb" aria-hidden>
        <ArrowUpRight size={size === "sm" ? 14 : size === "lg" ? 18 : 16} strokeWidth={1.5} />
      </span>
    </Link>
  );
}
