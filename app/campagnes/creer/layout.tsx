import type { Metadata } from "next";
import "../../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Créer une campagne | SoMatch",
  description: "Créez une campagne d’influence avec SoMatch.",
};

export default function CreateCampaignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
