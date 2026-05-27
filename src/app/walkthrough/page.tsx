import type { Metadata } from "next";
import { Walkthrough } from "@/components/walkthrough/Walkthrough";

export const metadata: Metadata = {
  title: "Walkthrough — Move through BASE scene by scene",
  description:
    "Scroll through a cinematic walkthrough of the BASE campus in Wilmington, DE — from the parking lot to the back studios.",
};

export default function WalkthroughPage() {
  return <Walkthrough />;
}
