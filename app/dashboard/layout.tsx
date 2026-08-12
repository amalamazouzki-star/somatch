import type { Metadata } from "next";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Dashboard | SoMatch",
  description: "Tableau de bord SoMatch pour piloter vos campagnes d’influence.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
