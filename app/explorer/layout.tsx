import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./explorer.css";

export const metadata: Metadata = {
  title: "Explorer | SoMatch",
  description: "Découvrez les créateurs qui correspondent à votre campagne.",
};

export default function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
