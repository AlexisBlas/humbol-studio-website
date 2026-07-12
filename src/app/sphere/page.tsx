import type { Metadata } from "next";
import { SphereStage } from "./SphereStage";

export const metadata: Metadata = {
  title: "humbol — sphere",
  description: "Brand sphere stage for social capture.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SpherePage() {
  return <SphereStage />;
}
