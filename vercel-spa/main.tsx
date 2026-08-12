import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "../app/page";
import Dashboard from "../app/dashboard/page";
import Explorer from "../app/explorer/page";
import InfluencerProfile from "../app/influenceur/maya-el-amrani/page";
import Trends from "../app/tendances/page";
import "../app/globals.css";
import "../app/dashboard/dashboard.css";
import "../app/explorer/explorer.css";
import "../app/influenceur/maya-el-amrani/profile.css";
import "../app/tendances/trends.css";

const routes: Record<string, { component: typeof Login; title: string }> = {
  "/": { component: Login, title: "Connexion | SoMatch" },
  "/dashboard": { component: Dashboard, title: "Dashboard | SoMatch" },
  "/explorer": { component: Explorer, title: "Explorer | SoMatch" },
  "/influenceur/maya-el-amrani": { component: InfluencerProfile, title: "Maya El Amrani | SoMatch" },
  "/tendances": { component: Trends, title: "Tendances | SoMatch" },
};

const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/";
const route = routes[normalizedPath] ?? routes["/"];
const Page = route.component;

document.documentElement.lang = "fr";
document.title = route.title;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
