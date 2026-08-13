import type { Metadata } from "next";
import "../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Comparer les influenceurs | SoMatch",
  description: "Comparez les créateurs sélectionnés avec SoMatch.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) { return children; }
