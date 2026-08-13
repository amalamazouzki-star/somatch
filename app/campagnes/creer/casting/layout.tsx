import type { Metadata } from "next";
import "../../../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Casting de la campagne | SoMatch",
  description: "Sélectionnez les créateurs de votre campagne SoMatch.",
};

export default function CampaignCastingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
