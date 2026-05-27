import type { Metadata } from "next";
import { PropertyMap } from "@/components/map/PropertyMap";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Interactive Map — Walk the BASE property",
  description:
    "Top-down interactive map of the BASE campus in Wilmington, DE. Tap any zone for details, capacity, amenities, and booking.",
};

export default function MapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Interactive Map"
        title={
          <>
            One property. <span className="text-base-blue">Many doors.</span>
          </>
        }
        description="A top-down view of the BASE campus. Click any zone to see what it does best, what it fits, and how to book it."
      />
      <PropertyMap />
    </>
  );
}
