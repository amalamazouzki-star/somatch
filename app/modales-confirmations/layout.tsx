import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./modales-confirmations.css";

export const metadata: Metadata = {
  title: "Modales & Confirmations | SoMatch",
  description: "Bibliothèque frontend des modales, toasts et confirmations SoMatch.",
};

export default function ModalsConfirmationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
