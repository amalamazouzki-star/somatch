import type { Metadata } from "next";
import "../../dashboard/dashboard.css";
import "./profile.css";

export const metadata: Metadata = {
  title: "Maya El Amrani | SoMatch",
  description: "Découvrez le profil et les performances de Maya El Amrani sur SoMatch.",
};

export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
