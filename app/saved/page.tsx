import type { Metadata } from "next";
import { Stub } from "@/components/Stub";

export const metadata: Metadata = { title: "Saved — vihaara" };

export default function SavedPage() {
  return (
    <Stub
      title="Saved"
      note="Coming next: the spots you've hearted, kept on this device. No account needed."
    />
  );
}
