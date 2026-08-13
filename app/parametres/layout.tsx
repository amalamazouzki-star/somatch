import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./parametres.css";

export const metadata: Metadata = {
  title: "Paramètres | SoMatch",
  description: "Personnalisez votre expérience SoMatch.",
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
