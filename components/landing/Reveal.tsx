"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll interpolation via IntersectionObserver — never a scroll listener
 *  (high-end-visual-design §5C/§6). Animates transform + opacity + filter only.
 *  prefers-reduced-motion is handled in CSS, which resolves the end state. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  /** Stagger in ms. */
  delay?: number;
  as?: "div" | "li" | "article" | "section";
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`l-reveal${shown ? " is-in" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
