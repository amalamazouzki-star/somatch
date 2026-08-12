import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./somatch-ai.css";

export const metadata: Metadata = {
  title: "SoMatch AI | SoMatch",
  description: "Décrivez votre campagne et composez un casting d’influenceurs avec SoMatch AI.",
};

export default function SomatchAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
