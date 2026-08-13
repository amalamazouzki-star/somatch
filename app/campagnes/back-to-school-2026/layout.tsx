import type { Metadata } from "next";
import "../../dashboard/dashboard.css";
import "./detail.css";

export const metadata: Metadata = {
  title: "Back to School 2026 | SoMatch",
  description: "Pilotez la campagne Back to School 2026 dans SoMatch.",
};

export default function CampaignDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
