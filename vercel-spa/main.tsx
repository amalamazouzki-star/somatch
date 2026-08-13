import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "../app/page";
import Dashboard from "../app/dashboard/page";
import Explorer from "../app/explorer/page";
import InfluencerProfile from "../app/influenceur/maya-el-amrani/page";
import Trends from "../app/tendances/page";
import Categories from "../app/categories/page";
import SomatchAi from "../app/somatch-ai/page";
import Favorites from "../app/favoris/page";
import Campaigns from "../app/campagnes/page";
import ProfilePage from "../app/profil/page";
import SettingsPage from "../app/parametres/page";
import SupportPage from "../app/support/page";
import "../app/globals.css";
import "../app/dashboard/dashboard.css";
import "../app/explorer/explorer.css";
import "../app/influenceur/maya-el-amrani/profile.css";
import "../app/tendances/trends.css";
import "../app/categories/categories.css";
import "../app/somatch-ai/somatch-ai.css";
import "../app/favoris/favoris.css";
import "../app/campagnes/campagnes.css";
import "../app/profil/profil.css";
import "../app/parametres/parametres.css";
import "../app/support/support.css";

const routes: Record<string, { component: typeof Login; title: string }> = {
  "/": { component: Login, title: "Connexion | SoMatch" },
  "/dashboard": { component: Dashboard, title: "Dashboard | SoMatch" },
  "/explorer": { component: Explorer, title: "Explorer | SoMatch" },
  "/influenceur/maya-el-amrani": { component: InfluencerProfile, title: "Maya El Amrani | SoMatch" },
  "/tendances": { component: Trends, title: "Tendances | SoMatch" },
  "/categories": { component: Categories, title: "Catégories | SoMatch" },
  "/somatch-ai": { component: SomatchAi, title: "SoMatch AI | SoMatch" },
  "/favoris": { component: Favorites, title: "Favoris | SoMatch" },
  "/campagnes": { component: Campaigns, title: "Mes campagnes | SoMatch" },
  "/profil": { component: ProfilePage, title: "Mon profil | SoMatch" },
  "/parametres": { component: SettingsPage, title: "Paramètres | SoMatch" },
  "/support": { component: SupportPage, title: "Support | SoMatch" },
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
