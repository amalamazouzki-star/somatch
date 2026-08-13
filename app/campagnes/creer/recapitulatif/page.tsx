"use client";

import { useState } from "react";
import { AppSidebar } from "../../../components/AppShell";
import "../creer-campagne.css";
import "./recapitulatif.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;
const creators = [
  { rank: 1, name: "Hafsa Achraf", niche: "Lifestyle", image: "/explorer/maya.png", score: 92, budget: "22 000 MAD" },
  { rank: 2, name: "Amine HLS", niche: "Family", image: "/explorer/amine.png", score: 89, budget: "21 000 MAD" },
  { rank: 3, name: "Sofia HLS", niche: "Family", image: "/explorer/sarah.png", score: 88, budget: "20 000 MAD" },
  { rank: 4, name: "Souhaila Abbad", niche: "Lifestyle", image: "/explorer/salma.png", score: 85, budget: "15 000 MAD" },
  { rank: 5, name: "Sara Moudden", niche: "Beauty", image: "/explorer/nour.png", score: 82, budget: "13 000 MAD" },
] as const;

const campaignDetails = [
  ["Nom de la campagne", "Back to School 2026"], ["Marque / Annonceur", "Kinder Joy"], ["Marché", "🇲🇦 Maroc"],
  ["Dates", "01/09/2026 → 30/09/2026"], ["Budget total", "150 000 MAD"], ["Devise", "MAD (Dirham marocain)"], ["Fuseau horaire", "(GMT+1) Casablanca"],
] as const;

function SocialIcon({ platform }: { platform: "instagram" | "tiktok" | "youtube" }) {
  return <span className={`summary-social ${platform}`} aria-label={platform}>{platform === "instagram" ? "◎" : platform === "tiktok" ? "♪" : "▶"}</span>;
}

export default function CampaignSummaryPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [created, setCreated] = useState(false);

  return (
    <main className="dashboard-page create-campaign-page campaign-summary-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main summary-main">
        <header className="create-campaign-header summary-header">
          <div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div>
          <div><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré ✓" : "Enregistrer comme brouillon"}</button><a href="/campagnes" aria-label="Fermer">×</a></div>
        </header>

        <nav className="campaign-stepper summary-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index < 3 ? "complete" : "active"} key={step}><i>{index < 3 ? "✓" : index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="summary-page-grid">
          <section className="summary-workspace">
            <div className="summary-content-card">
              <header><h2>Récapitulatif de votre campagne</h2><p>Vérifiez l’ensemble des éléments avant de créer votre campagne.</p></header>
              <div className="summary-details-grid">
                <article className="summary-detail-card"><h3><i>▤</i> Informations de la campagne</h3><dl>{campaignDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></article>
                <article className="summary-detail-card"><h3><i className="purple">♫</i> Résumé du brief</h3><dl><div><dt>Cible principale</dt><dd>18 – 35 ans, Tous genres<small>Maroc (Casablanca, Rabat, Marrakech...)</small></dd></div><div><dt>Objectif principal</dt><dd>Notoriété & Engagement</dd></div><div><dt>Plateformes</dt><dd className="summary-platforms"><SocialIcon platform="instagram" /><SocialIcon platform="tiktok" /><SocialIcon platform="youtube" /></dd></div><div><dt>Catégories</dt><dd>Lifestyle, Family, Beauty, Education</dd></div><div><dt>Formats</dt><dd>Reels, Stories, TikTok, YouTube Shorts,<small>UGC (contenu utilisateur)</small></dd></div><div><dt>KPIs prioritaires</dt><dd>Reach, Engagement, Trafic, Vues</dd></div></dl></article>
                <article className="summary-detail-card"><h3><i className="green">▣</i> Formats & contenu</h3><dl><div><dt>Types de contenu</dt><dd>Éducatif, Divertissant,<small>Inspirant, Authentique</small></dd></div><div><dt>Messages clés</dt><dd>Chaque premier pas<small>mérite d’être célébré.</small></dd></div><div><dt>Contraintes</dt><dd>Brand safety obligatoire<small>Mention du produit visible</small></dd></div><div><dt>CTA attendu</dt><dd>Participation au concours<small>visite du site kinderjoy.ma</small></dd></div></dl></article>
              </div>

              <section className="summary-creators"><h3>Créateurs sélectionnés (5/8)</h3><div>{creators.map((creator) => <article key={creator.name}><b>{creator.rank}</b><img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.niche}</small><em><SocialIcon platform="instagram" /><SocialIcon platform="tiktok" /></em></span><i><strong>{creator.score}</strong><small>somatch Score</small></i><strong>{creator.budget}<small>estimation</small></strong></article>)}</div><button type="button">♧&nbsp;&nbsp; Ajouter d’autres créateurs (3 places restantes)</button></section>
              <section className="summary-budget"><h3>Répartition du budget</h3><div><span>Créateurs<strong>108 000 MAD (72%)</strong></span><span>Production<strong>24 000 MAD (16%)</strong></span><span>Gestion & coordination<strong>18 000 MAD (12%)</strong></span></div><p>ⓘ&nbsp; Budget total : 150 000 MAD</p></section>
            </div>

            <footer className="summary-actions"><a href="/campagnes/creer/casting">←&nbsp;&nbsp; Retour au casting</a><button type="button" onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré ✓" : "Enregistrer comme brouillon"}</button><button type="button" className={created ? "created" : ""} onClick={() => setCreated(true)}>{created ? "Campagne créée ✓" : "Créer la campagne　◎"}</button></footer>
          </section>

          <aside className="summary-aside">
            <section className="summary-analysis create-motion-card"><h2><i>✣</i> somatch AI – Analyse du casting</h2><h3>Points forts de cette sélection</h3><ul className="strength-list"><li>Excellente adéquation avec votre cible (18–35 ans)</li><li>Couverture estimée large et diversifiée</li><li>Mix équilibré de profils et de catégories</li><li>Présence sur les plateformes clés</li><li>Taux d’engagement supérieur à la moyenne</li></ul><hr /><h3><i>♧</i> Recommandations de somatch AI</h3><ul className="recommend-list"><li>Vous pouvez ajouter 1 à 2 créateurs nano pour renforcer l’authenticité.</li><li>Envisagez un créateur spécialisé Education pour toucher les parents.</li><li>Optimisez le budget en ajustant 1 ou 2 profils selon les performances attendues.</li></ul><button type="button">Voir l’analyse détaillée　→</button></section>
            <section className="summary-performance create-motion-card"><h2>Performances estimées　ⓘ</h2><div><article><i>◉</i><span><small>Couverture estimée</small><strong>2.4M – 3.1M</strong><em>comptes uniques</em></span></article><article><i>♡</i><span><small>Engagement moyen</small><strong>4.8%</strong><em>moyenne pondérée</em></span></article><article><i>▷</i><span><small>Vues vidéo estimées</small><strong>3.5M – 4.7M</strong><em>toutes plateformes</em></span></article><article><i>♧</i><span><small>Participants concours estimés</small><strong>8K – 12K</strong></span></article></div><p>Les estimations sont indicatives et peuvent varier.</p></section>
          </aside>
        </div>
      </section>
    </main>
  );
}
