import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./empty-states.css";

export const metadata: Metadata = {
  title: "États vides | SoMatch",
  description: "Bibliothèque des états vides et sans résultat de SoMatch.",
};

export default function EmptyStatesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
