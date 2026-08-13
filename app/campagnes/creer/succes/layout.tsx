import type { Metadata } from "next";
import "./succes.css";

export const metadata: Metadata = {
  title: "Campagne créée | SoMatch",
  description: "Votre campagne SoMatch a été créée avec succès.",
};

export default function CampaignSuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
