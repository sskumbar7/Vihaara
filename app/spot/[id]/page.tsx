import type { Metadata } from "next";
import { Stub } from "@/components/Stub";
import { ACTIVITIES, getActivity } from "@/lib/activities";

type Params = Promise<{ id: string }>;

/** Every seed venue gets a real, shareable, statically-built URL (DESIGN.md §5). */
export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const venue = getActivity(id);
  return { title: venue ? `${venue.name} — vihaara` : "Spot — vihaara" };
}

export default async function SpotPage({ params }: { params: Params }) {
  const { id } = await params;
  const venue = getActivity(id);

  return (
    <Stub
      title={venue ? venue.name : "Spot not found"}
      note={
        venue
          ? `${venue.description} The full detail card — timings, cost for two, directions and the verified date — arrives in the next slice.`
          : "We don't have a spot with that id. The detail screen arrives in the next slice."
      }
    />
  );
}
