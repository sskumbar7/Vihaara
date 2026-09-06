import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "vihaara — decide where to go out in 2 minutes",
  description:
    "Three to five hand-verified Bangalore hangouts, ranked by how far they are from you. No endless scrolling, no account.",
};

export const viewport: Viewport = {
  themeColor: "#0F5C4E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="wrap">{children}</body>
    </html>
  );
}
