"use client";

import { useState } from "react";
import { AppSidebar } from "../../../components/AppShell";
import "../creer-campagne.css";
import "./casting.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;

const creators = [
  { id: 1, name: "Hafsa Achraf", niche: "Lifestyle · Méga", city: "Casablanca", image: "/explorer/maya.png", instagram: "1.4M", tiktok: "620K", youtube: "–", engagement: "5.2%", score: 92, budget: 22000, badge: "green" },
  { id: 2, name: "Amine HLS", niche: "Family · Méga", city: "Marrakech", image: "/explorer/amine.png", instagram: "717K", tiktok: "1.2M", youtube: "210K", engagement: "4.7%", score: 89, budget: 21000, badge: "gold" },
  { id: 3, name: "Sofia HLS", niche: "Family · Méga", city: "Marrakech", image: "/explorer/sarah.png", instagram: "667K", tiktok: "980K", youtube: "–", engagement: "4.5%", score: 88, budget: 20000, badge: "purple" },
  { id: 4, name: "Souhaila Abbad", niche: "Lifestyle · Macro", city: "Kénitra", image: "/explorer/salma.png", instagram: "176K", tiktok: "92K", youtube: "–", engagement: "6.1%", score: 85, budget: 15000, badge: "" },
  { id: 5, name: "Sara Moudden", niche: "Beauty · Macro", city: "Casablanca", image: "/explorer/nour.png", instagram: "103K", tiktok: "68K", youtube: "–", engagement: "5.8%", score: 82, budget: 13000, badge: "green" },
] as const;

function SocialIcon({ platform }: { platform: "instagram" | "tiktok" | "youtube" }) {
  const label = platform === "instagram" ? "Instagram" : platform === "tiktok" ? "TikTok" : "YouTube";
  return <span className={`casting-social ${platform}`} aria-label={label}>{platform === "instagram" ? "◎" : platform === "tiktok" ? "♪" : "▶"}</span>;
}

export default function CampaignCastingPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [selected, setSelected] = useState<number[]>(creators.map((creator) => creator.id));
  const [manualMode, setManualMode] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const selectedCreators = creators.filter((creator) => selected.includes(creator.id));
  const selectedBudget = selectedCreators.length ? selectedCreators.reduce((sum, creator) => sum + creator.budget, 17000) : 0;
  const budgetPercent = Math.min(100, Math.round((selectedBudget / 150000) * 100));

  function toggleCreator(id: number) {
    setSelected((current) => current.includes(id) ? current.filter((creatorId) => creatorId !== id) : [...current, id]);
  }

  return (
    <main className="dashboard-page create-campaign-page campaign-casting-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main casting-main">
        <header className="create-campaign-header casting-header">
          <div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div>
          <div><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré ✓" : "Enregistrer comme brouillon"}</button><a href="/campagnes" aria-label="Fermer">×</a></div>
        </header>

        <nav className="campaign-stepper casting-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index < 2 ? "complete" : index === 2 ? "active" : ""} key={step}><i>{index < 2 ? "✓" : index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="casting-page-grid">
          <section className="casting-workspace">
            <div className="casting-summary">
              <article><i>♧</i><span><small>Créateurs sélectionnés</small><strong>{selectedCreators.length} / 8</strong><em>Recommandé : 6 à 8</em></span></article>
              <article className="budget-stat"><i>▣</i><span><small>Budget utilisé</small><strong>{selectedBudget.toLocaleString("fr-FR")} / 150 000 MAD</strong><b><u style={{ width: `${budgetPercent}%` }} /></b><em>{budgetPercent}%</em></span></article>
              <article><i>◉</i><span><small>Couverture estimée</small><strong>2.4M – 3.1M</strong><em>comptes uniques</em></span></article>
              <article><i>♡</i><span><small>Engagement moyen estimé</small><strong>4.8%</strong><em>moyenne pondérée</em></span></article>
            </div>

            <div className="casting-selector-card">
              <div className="casting-tabs">
                <button type="button" className={!manualMode ? "active" : ""} onClick={() => setManualMode(false)}><b>✣</b><span><strong>Casting recommandé par somatch AI</strong><small>Notre IA a analysé votre brief et sélectionné les profils les plus pertinents.</small></span></button>
                <button type="button" className={manualMode ? "active" : ""} onClick={() => setManualMode(true)}><b>○</b><span><strong>Sélection manuelle</strong><small>Ajoutez des créateurs depuis Explorer ou vos Favoris.</small></span></button>
              </div>

              <div className="casting-filters">
                <select aria-label="Trier par"><option>Trier par pertinence</option><option>Somatch Score</option><option>Engagement</option></select>
                <select aria-label="Niveau"><option>Tous les niveaux</option><option>Méga</option><option>Macro</option></select>
                <select aria-label="Pays"><option>Tous les pays</option><option>Maroc</option><option>France</option></select>
                <select aria-label="Plateforme"><option>Toutes les plateformes</option><option>Instagram</option><option>TikTok</option><option>YouTube</option></select>
                <button type="button">☷&nbsp;&nbsp; Filtres avancés</button>
              </div>

              <div className="casting-list">
                {creators.slice(0, visibleCount).map((creator, index) => {
                  const isSelected = selected.includes(creator.id);
                  return (
                    <article className={isSelected ? "selected" : ""} key={creator.id}>
                      <b className="creator-rank">{index + 1}</b>
                      <div className="casting-avatar"><img src={creator.image} alt={creator.name} />{creator.badge ? <i className={creator.badge}>●</i> : null}</div>
                      <div className="casting-identity"><strong>{creator.name} <i>◆</i></strong><small>{creator.niche}</small><em>⌾ Maroc&nbsp; · &nbsp;{creator.city}</em></div>
                      <div className="casting-platform-numbers"><span><SocialIcon platform="instagram" />{creator.instagram}</span><span><SocialIcon platform="tiktok" />{creator.tiktok}</span><span><SocialIcon platform="youtube" />{creator.youtube}</span></div>
                      <div className="casting-engagement"><small>Engagement</small><strong>{creator.engagement}&nbsp;&nbsp; ↗</strong></div>
                      <div className="casting-score" style={{ "--score": `${creator.score * 3.6}deg` } as React.CSSProperties}><span><strong>{creator.score}</strong></span><small>somatch Score ⓘ</small></div>
                      <div className="casting-budget"><small>Budget estimé</small><strong>{creator.budget.toLocaleString("fr-FR")} MAD</strong><em>par collaboration</em></div>
                      <button type="button" className="casting-check" aria-label={`${isSelected ? "Retirer" : "Sélectionner"} ${creator.name}`} aria-pressed={isSelected} onClick={() => toggleCreator(creator.id)}>{isSelected ? "✓" : ""}</button>
                      <button type="button" className="casting-why">Pourquoi ce profil ?⌄</button>
                    </article>
                  );
                })}
              </div>
              <button type="button" className="load-creators" onClick={() => setVisibleCount(5)}>Charger plus de créateurs&nbsp;&nbsp;&nbsp;⌄</button>
            </div>

            <footer className="casting-actions"><a href="/campagnes/creer/brief">←&nbsp;&nbsp; Retour</a><a className="casting-recap-link" href="/campagnes/creer/recapitulatif">Continuer vers le récapitulatif&nbsp;&nbsp;&nbsp; →</a></footer>
          </section>

          <aside className="casting-aside">
            <section className="casting-overview create-motion-card"><header><i>▤</i><span><h2>Aperçu de votre campagne</h2><p>Back to School 2026</p></span></header><div><article><i>✓</i><strong>Informations</strong><span>Terminé</span></article><article><i>✓</i><strong>Brief</strong><span>Terminé</span></article><article className="active"><i>✓</i><strong>Casting</strong><span>En cours</span></article><article><i>○</i><strong>Récapitulatif</strong><span>À compléter</span></article></div></section>
            <section className="selected-casting create-motion-card">
              <header><h2>Créateurs sélectionnés ({selectedCreators.length})</h2><b>{selectedBudget.toLocaleString("fr-FR")} MAD</b></header>
              <div>{selectedCreators.map((creator) => <article key={creator.id}><img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.niche.split(" · ")[0]}</small></span><span className="selected-platforms"><SocialIcon platform="instagram" /><SocialIcon platform="tiktok" /></span><b>{creator.budget.toLocaleString("fr-FR")} MAD</b><button type="button" onClick={() => toggleCreator(creator.id)} aria-label={`Retirer ${creator.name}`}>×</button></article>)}</div>
              <button type="button" className="clear-casting" onClick={() => setSelected([])}>♙&nbsp;&nbsp; Vider la sélection</button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
