"use client";

import { useState } from "react";
import { AppSidebar } from "../../../components/AppShell";
import { InfluencerProfileLink } from "../../../components/InfluencerProfileLink";
import { SocialLogo } from "../../../components/SocialLogo";
import "../creer-campagne.css";
import "./recapitulatif.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;
const creators = [
  { rank: 1, name: "Hafsa Achraf", niche: "Lifestyle", image: "/explorer/maya.png", score: 92, budget: 22000 },
  { rank: 2, name: "Amine HLS", niche: "Famille", image: "/explorer/amine.png", score: 89, budget: 21000 },
  { rank: 3, name: "Sofia HLS", niche: "Famille", image: "/explorer/sarah.png", score: 88, budget: 20000 },
  { rank: 4, name: "Souhaila Abbad", niche: "Lifestyle", image: "/explorer/salma.png", score: 85, budget: 15000 },
  { rank: 5, name: "Sara Moudden", niche: "Beauté", image: "/explorer/nour.png", score: 82, budget: 13000 },
] as const;

const campaignDetails = [
  ["Nom de la campagne", "Back to School 2026"], ["Marque / Annonceur", "Kinder Joy"], ["Marché", "🇲🇦 Maroc"],
  ["Dates", "01/09/2026 → 30/09/2026"], ["Budget total", "150 000 MAD"], ["Devise", "MAD (dirham marocain)"], ["Fuseau horaire", "(GMT+1) Casablanca"],
] as const;

const strengths = [
  "Excellente adéquation avec votre cible (18–35 ans)",
  "Couverture estimée large et diversifiée",
  "Mix équilibré de profils et de catégories",
  "Présence sur les plateformes clés",
  "Taux d’engagement supérieur à la moyenne",
] as const;

const recommendations = [
  "Vous pouvez ajouter un ou deux créateurs Nano pour renforcer l’authenticité.",
  "Envisagez un créateur spécialisé en Éducation pour toucher les parents.",
  "Optimisez le budget en ajustant un ou deux profils selon les performances attendues.",
] as const;

type SummaryIconName = "arrow-left" | "arrow-right" | "brief" | "check" | "close" | "content" | "document" | "eye" | "heart" | "info" | "lightbulb" | "play" | "plus" | "sparkles" | "users";

function SummaryIcon({ name }: { name: SummaryIconName }) {
  if (name === "check") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4L19 7" /></svg>;
  if (name === "close") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
  if (name === "arrow-left") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>;
  if (name === "arrow-right") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
  if (name === "document") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l3 3V20H7zM14 3.5v4h3M9.5 12h5M9.5 15.5h5" /></svg>;
  if (name === "brief") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h10v16H6V6h2zM8 4v4H4M10 12h4M10 15.5h4" /></svg>;
  if (name === "content") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="m10 9 5 3-5 3z" /></svg>;
  if (name === "sparkles") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7Z" /><path d="M19 15.5c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z" /></svg>;
  if (name === "heart") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 9.2c0 5-8.5 10-8.5 10s-8.5-5-8.5-10A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.5 2.9Z" /></svg>;
  if (name === "eye") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.8 12s3.3-5 9.2-5 9.2 5 9.2 5-3.3 5-9.2 5-9.2-5-9.2-5Z" /><circle cx="12" cy="12" r="2.5" /></svg>;
  if (name === "play") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7z" /></svg>;
  if (name === "users") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.2" /><path d="M3.5 19c.5-3.5 2.4-5.3 5.5-5.3s5 1.8 5.5 5.3M14.5 14.5c2.9-.4 5 .9 5.7 3.8" /></svg>;
  if (name === "plus") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>;
  if (name === "info") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>;
  if (name === "lightbulb") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.4 15.2a6 6 0 1 1 7.2 0c-.8.6-1.1 1.3-1.1 2.3h-5c0-1-.3-1.7-1.1-2.3Z" /><path d="M9.5 20h5M12 2V.8M4.9 4.9 4 4M19.1 4.9 20 4" /></svg>;
  return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3.5h6M8 20h8M9 3.5l-2 6h4l-1 5 7-8h-4l2-3" /></svg>;
}

function SocialIcon({ platform }: { platform: "instagram" | "tiktok" | "youtube" }) {
  const label = platform === "instagram" ? "Instagram" : platform === "tiktok" ? "TikTok" : "YouTube";
  return <span className={`summary-social ${platform}`} aria-label={label}><SocialLogo network={platform} /></span>;
}

const formatBudget = (value: number) => `${value.toLocaleString("fr-FR")} MAD`;

export default function CampaignSummaryPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [analysisExpanded, setAnalysisExpanded] = useState(false);

  return (
    <main className="dashboard-page create-campaign-page campaign-summary-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main summary-main">
        <header className="create-campaign-header summary-header">
          <div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div>
          <div><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré" : "Enregistrer comme brouillon"}{draftSaved ? <SummaryIcon name="check" /> : null}</button><a href="/campagnes" aria-label="Fermer la création de campagne"><SummaryIcon name="close" /></a></div>
        </header>

        <nav className="campaign-stepper summary-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index < 3 ? "complete" : "active"} key={step}><i>{index < 3 ? <SummaryIcon name="check" /> : index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="summary-page-grid">
          <section className="summary-workspace">
            <div className="summary-content-card">
              <header><h2>Récapitulatif de votre campagne</h2><p>Vérifiez l’ensemble des éléments avant de créer votre campagne.</p></header>
              <div className="summary-details-grid">
                <article className="summary-detail-card"><h3><i><SummaryIcon name="document" /></i> Informations de la campagne</h3><dl>{campaignDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>
                <article className="summary-detail-card"><h3><i className="purple"><SummaryIcon name="brief" /></i> Résumé du brief</h3><dl><div><dt>Cible principale</dt><dd>18–35 ans, tous genres<small>Maroc (Casablanca, Rabat, Marrakech…)</small></dd></div><div><dt>Objectif principal</dt><dd>Notoriété et engagement</dd></div><div><dt>Plateformes</dt><dd className="summary-platforms"><SocialIcon platform="instagram" /><SocialIcon platform="tiktok" /><SocialIcon platform="youtube" /></dd></div><div><dt>Catégories</dt><dd>Lifestyle, Famille, Beauté, Éducation</dd></div><div><dt>Formats</dt><dd>Reels, Stories, TikTok, YouTube Shorts<small>UGC (contenu utilisateur)</small></dd></div><div><dt>Indicateurs prioritaires</dt><dd>Portée, engagement, trafic, vues</dd></div></dl></article>
                <article className="summary-detail-card"><h3><i className="green"><SummaryIcon name="content" /></i> Formats et contenu</h3><dl><div><dt>Types de contenu</dt><dd>Éducatif et divertissant<small>Inspirant et authentique</small></dd></div><div><dt>Messages clés</dt><dd>Chaque premier pas<small>mérite d’être célébré.</small></dd></div><div><dt>Contraintes</dt><dd>Sécurité de marque obligatoire<small>Visibilité obligatoire du produit</small></dd></div><div><dt>Action attendue</dt><dd>Participation au concours<small>Visite du site kinderjoy.ma</small></dd></div></dl></article>
              </div>

              <section className="summary-creators"><h3>Créateurs sélectionnés (5/8)</h3><div>{creators.map((creator) => <article className="influencer-card-target" key={creator.name}><InfluencerProfileLink name={creator.name} /><b>{creator.rank}</b><img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.niche}</small><em><SocialIcon platform="instagram" /><SocialIcon platform="tiktok" /></em></span><i><strong>{creator.score}</strong><small>SoMatch Score</small></i><strong>{formatBudget(creator.budget)}<small>Estimation</small></strong></article>)}</div><a href="/campagnes/creer/casting"><SummaryIcon name="plus" /> Ajouter d’autres créateurs (3 places restantes)</a></section>
              <section className="summary-budget"><h3>Répartition du budget</h3><div><span>Créateurs<strong>91 000 MAD (61 %)</strong></span><span>Production<strong>32 000 MAD (21 %)</strong></span><span>Gestion et coordination<strong>27 000 MAD (18 %)</strong></span></div><p><SummaryIcon name="info" /> Budget total : 150 000 MAD</p></section>
            </div>

            <footer className="summary-actions"><a href="/campagnes/creer/casting"><SummaryIcon name="arrow-left" /> Retour au casting</a><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré" : "Enregistrer comme brouillon"}{draftSaved ? <SummaryIcon name="check" /> : null}</button><a className="summary-create-link" href="/campagnes/creer/succes">Créer la campagne <SummaryIcon name="check" /></a></footer>
          </section>

          <aside className="summary-aside">
            <section className={`summary-analysis create-motion-card${analysisExpanded ? " expanded" : ""}`}><h2><i><SummaryIcon name="sparkles" /></i> SoMatch AI – Analyse du casting</h2><h3>Points forts de cette sélection</h3><ul className="strength-list">{strengths.map((item) => <li key={item}><SummaryIcon name="check" /><span>{item}</span></li>)}</ul><hr /><h3><i><SummaryIcon name="lightbulb" /></i> Recommandations de SoMatch AI</h3><ul className="recommend-list">{recommendations.map((item) => <li key={item}><span aria-hidden="true" />{item}</li>)}</ul>{analysisExpanded ? <p className="analysis-detail" role="status">Analyse détaillée affichée : le casting offre un bon équilibre entre portée, engagement et complémentarité des profils.</p> : null}<button type="button" aria-expanded={analysisExpanded} onClick={() => setAnalysisExpanded((current) => !current)}>{analysisExpanded ? "Masquer l’analyse détaillée" : "Voir l’analyse détaillée"}<SummaryIcon name="arrow-right" /></button></section>
            <section className="summary-performance create-motion-card"><h2>Performances estimées <SummaryIcon name="info" /></h2><div><article><i><SummaryIcon name="eye" /></i><span><small>Couverture estimée</small><strong>2,4 M – 3,1 M</strong><em>Comptes uniques</em></span></article><article><i><SummaryIcon name="heart" /></i><span><small>Engagement moyen</small><strong>4,8 %</strong><em>Moyenne pondérée</em></span></article><article><i><SummaryIcon name="play" /></i><span><small>Vues vidéo estimées</small><strong>3,5 M – 4,7 M</strong><em>Toutes plateformes</em></span></article><article><i><SummaryIcon name="users" /></i><span><small>Participants au concours estimés</small><strong>8 k – 12 k</strong></span></article></div><p>Les estimations sont indicatives et peuvent varier.</p></section>
          </aside>
        </div>
      </section>
    </main>
  );
}
