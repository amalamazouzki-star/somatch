import type { Metadata } from "next";
import "../dashboard/dashboard.css";

export const metadata: Metadata = {
  title: "Support | SoMatch",
  description: "Centre d’aide et support SoMatch.",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
