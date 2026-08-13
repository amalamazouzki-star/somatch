import type { Metadata } from "next";
import "./recommandation.css";

export const metadata: Metadata = {
  title: "Recommandation SoMatch AI | SoMatch",
  description: "Découvrez la stratégie et le casting recommandés par SoMatch AI.",
};

export default function RecommendationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
