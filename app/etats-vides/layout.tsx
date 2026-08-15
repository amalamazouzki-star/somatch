import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./empty-states.css";

export const metadata: Metadata = {
  title: "États vides et résultats introuvables | SoMatch",
  description: "Bibliothèque des états vides et des résultats introuvables de SoMatch.",
};

export default function EmptyStatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
