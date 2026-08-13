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
import CreateCampaignPage from "../app/campagnes/creer/page";
import CampaignBriefPage from "../app/campagnes/creer/brief/page";
import CampaignCastingPage from "../app/campagnes/creer/casting/page";
import CampaignSummaryPage from "../app/campagnes/creer/recapitulatif/page";
import CompareInfluencersPage from "../app/comparer/page";
import SomatchRecommendationPage from "../app/somatch-ai/recommandation/page";
import CampaignSuccessPage from "../app/campagnes/creer/succes/page";
import CampaignDetailPage from "../app/campagnes/back-to-school-2026/page";
import EmptyStatesPage from "../app/etats-vides/page";
import ModalsConfirmationsPage from "../app/modales-confirmations/page";
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
import "../app/campagnes/creer/creer-campagne.css";
import "../app/campagnes/creer/brief/brief.css";
import "../app/campagnes/creer/casting/casting.css";
import "../app/campagnes/creer/recapitulatif/recapitulatif.css";
import "../app/comparer/comparer.css";
import "../app/somatch-ai/recommandation/recommandation.css";
import "../app/campagnes/creer/succes/succes.css";
import "../app/campagnes/back-to-school-2026/detail.css";
import "../app/components/notifications.css";
import "../app/etats-vides/empty-states.css";
import "../app/modales-confirmations/modales-confirmations.css";

const routes: Record<string, { component: typeof Login; title: string }> = {
  "/": { component: Login, title: "Connexion | SoMatch" },
  "/dashboard": { component: Dashboard, title: "Dashboard | SoMatch" },
  "/explorer": { component: Explorer, title: "Explorer | SoMatch" },
  "/influenceur/maya-el-amrani": { component: InfluencerProfile, title: "Maya El Amrani | SoMatch" },
  "/tendances": { component: Trends, title: "Tendances | SoMatch" },
  "/categories": { component: Categories, title: "Catégories | SoMatch" },
  "/somatch-ai": { component: SomatchAi, title: "SoMatch AI | SoMatch" },
  "/somatch-ai/recommandation": { component: SomatchRecommendationPage, title: "Recommandation SoMatch AI | SoMatch" },
  "/favoris": { component: Favorites, title: "Favoris | SoMatch" },
  "/campagnes": { component: Campaigns, title: "Mes campagnes | SoMatch" },
  "/campagnes/creer": { component: CreateCampaignPage, title: "Créer une campagne | SoMatch" },
  "/campagnes/creer/brief": { component: CampaignBriefPage, title: "Brief de la campagne | SoMatch" },
  "/campagnes/creer/casting": { component: CampaignCastingPage, title: "Casting de la campagne | SoMatch" },
  "/campagnes/creer/recapitulatif": { component: CampaignSummaryPage, title: "Récapitulatif de la campagne | SoMatch" },
  "/campagnes/creer/succes": { component: CampaignSuccessPage, title: "Campagne créée | SoMatch" },
  "/campagnes/back-to-school-2026": { component: CampaignDetailPage, title: "Back to School 2026 | SoMatch" },
  "/comparer": { component: CompareInfluencersPage, title: "Comparer les influenceurs | SoMatch" },
  "/profil": { component: ProfilePage, title: "Mon profil | SoMatch" },
  "/parametres": { component: SettingsPage, title: "Paramètres | SoMatch" },
  "/support": { component: SupportPage, title: "Support | SoMatch" },
  "/etats-vides": { component: EmptyStatesPage, title: "États vides | SoMatch" },
  "/modales-confirmations": { component: ModalsConfirmationsPage, title: "Modales & Confirmations | SoMatch" },
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
