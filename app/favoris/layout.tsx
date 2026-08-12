import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./favoris.css";

export const metadata: Metadata = {
  title: "Favoris | SoMatch",
  description: "Organisez vos créateurs favoris et analysez votre sélection SoMatch.",
};

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
