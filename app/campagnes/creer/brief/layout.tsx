import type { Metadata } from "next";
import "../../../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Brief de la campagne | SoMatch",
  description: "Définissez le brief de votre campagne SoMatch.",
};

export default function CampaignBriefLayout({ children }: { children: React.ReactNode }) {
  return children;
}
