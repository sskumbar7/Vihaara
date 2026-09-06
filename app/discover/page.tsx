import type { Metadata } from "next";
import { Stub } from "@/components/Stub";

export const metadata: Metadata = { title: "Where to tonight? — vihaara" };

export default function DiscoverPage() {
  return (
    <Stub
      title="Where to tonight?"
      note="Coming next: set where you're starting from, pick a vibe or answer three quick questions, and get three to five verified spots ranked by how far they are from you."
    />
  );
}
