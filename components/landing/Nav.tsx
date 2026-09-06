"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

/** Fixed-height header. Transparent while it sits on the hero's own ground,
 *  solid once the page scrolls under it, so it never floats translucently over
 *  hero text or cards. The stuck state comes from a sentinel + IntersectionObserver,
 *  never a scroll listener. */
export function Nav() {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} className="l-nav-sentinel" aria-hidden />
      <header className={`l-nav${stuck ? " is-stuck" : ""}`}>
        <nav className="l-nav-bar" aria-label="Primary">
          <Link href="/" className="l-nav-brand" aria-label="vihaara — home">
            <Wordmark tone="onDark" size={19} />
          </Link>
          <Link href="/discover" className="btn btn--nav t-button">
            Open the app
          </Link>
        </nav>
      </header>
    </>
  );
}
