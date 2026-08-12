import type { Metadata } from "next";
import "../dashboard/dashboard.css";
import "./categories.css";

export const metadata: Metadata = {
  title: "Catégories | SoMatch",
  description: "Explorez les créateurs SoMatch par univers et trouvez votre audience idéale.",
};

export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
