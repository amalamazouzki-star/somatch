import type { Metadata } from "next";
import "../../../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Récapitulatif de la campagne | SoMatch",
  description: "Vérifiez et créez votre campagne SoMatch.",
};

export default function CampaignSummaryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
