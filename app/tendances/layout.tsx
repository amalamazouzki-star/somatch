import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./trends.css";

export const metadata: Metadata = {
  title: "Tendances | SoMatch",
  description: "Analysez les catégories, créateurs et contenus qui performent avec SoMatch.",
};

export default function TrendsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
