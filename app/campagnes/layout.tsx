import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./campagnes.css";

export const metadata: Metadata = {
  title: "Mes campagnes | SoMatch",
  description: "Gérez vos campagnes d’influence avec SoMatch.",
};

export default function CampaignsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
