import { Stub } from "@/components/Stub";

/** Exported as 404.html, so an unknown URL still lands on a branded page. */
export default function NotFound() {
  return (
    <Stub
      title="That page isn't here"
      note="The link may be out of date, or the spot may have been removed from the list. Head back and pick a vibe instead."
    />
  );
}
