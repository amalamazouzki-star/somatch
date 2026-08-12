import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./profil.css";

export const metadata: Metadata = {
  title: "Mon profil | SoMatch",
  description: "Gérez votre profil et votre organisation SoMatch.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
