"use client";

import { useMemo, useState } from "react";
import { AppSidebar } from "../../../components/AppShell";
import { InfluencerProfileLink } from "../../../components/InfluencerProfileLink";
import { SocialLogo } from "../../../components/SocialLogo";
import "../creer-campagne.css";
import "./casting.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;

const creators = [
  { id: 1, name: "Hafsa Achraf", niche: "Lifestyle · Méga", city: "Casablanca", country: "Maroc", image: "/explorer/maya.png", instagram: "1,4 M", tiktok: "620 k", youtube: "–", engagement: 5.2, score: 92, budget: 22000, badge: "green" },
  { id: 2, name: "Amine HLS", niche: "Famille · Méga", city: "Marrakech", country: "Maroc", image: "/explorer/amine.png", instagram: "717 k", tiktok: "1,2 M", youtube: "210 k", engagement: 4.7, score: 89, budget: 21000, badge: "gold" },
  { id: 3, name: "Sofia HLS", niche: "Famille · Méga", city: "Marrakech", country: "Maroc", image: "/explorer/sarah.png", instagram: "667 k", tiktok: "980 k", youtube: "–", engagement: 4.5, score: 88, budget: 20000, badge: "purple" },
  { id: 4, name: "Souhaila Abbad", niche: "Lifestyle · Macro", city: "Kénitra", country: "Maroc", image: "/explorer/salma.png", instagram: "176 k", tiktok: "92 k", youtube: "–", engagement: 6.1, score: 85, budget: 15000, badge: "" },
  { id: 5, name: "Sara Moudden", niche: "Beauté · Macro", city: "Casablanca", country: "Maroc", image: "/explorer/nour.png", instagram: "103 k", tiktok: "68 k", youtube: "–", engagement: 5.8, score: 82, budget: 13000, badge: "green" },
] as const;

type CastingIconName = "arrow-left" | "arrow-right" | "check" | "check-circle" | "chevron" | "circle" | "close" | "document" | "eye" | "filter" | "heart" | "location" | "sparkles" | "trash" | "trend" | "users" | "verified" | "wallet";

function CastingIcon({ name }: { name: CastingIconName }) {
  if (name === "check") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4L19 7" /></svg>;
  if (name === "check-circle") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m8 12.2 2.6 2.5 5.4-5.4" /></svg>;
  if (name === "circle") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /></svg>;
  if (name === "close") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
  if (name === "arrow-left") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>;
  if (name === "arrow-right") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
  if (name === "chevron") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5" /></svg>;
  if (name === "document") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l3 3V20H7zM14 3.5v4h3M9.5 12h5M9.5 15.5h5" /></svg>;
  if (name === "sparkles") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7Z" /><path d="M19 15.5c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z" /></svg>;
  if (name === "location") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></svg>;
  if (name === "heart") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 9.2c0 5-8.5 10-8.5 10s-8.5-5-8.5-10A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.5 2.9Z" /></svg>;
  if (name === "eye") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.8 12s3.3-5 9.2-5 9.2 5 9.2 5-3.3 5-9.2 5-9.2-5-9.2-5Z" /><circle cx="12" cy="12" r="2.5" /></svg>;
  if (name === "wallet") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6.5h14.5V19H4zM4 8V5h12M15 11h5v4h-5z" /></svg>;
  if (name === "filter") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" /></svg>;
  if (name === "trend") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16 5-5 4 3 7-8M15 6h5v5" /></svg>;
  if (name === "verified") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2 2 3-.2.8 2.8 2.5 1.6-1.2 2.7 1.2 2.7-2.5 1.6-.8 2.8-3-.2-2 2-2-2-3 .2-.8-2.8-2.5-1.6 1.2-2.7-1.2-2.7 2.5-1.6.8-2.8 3 .2Z" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></svg>;
  if (name === "trash") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M9 7V4h6v3m2 0-1 13H8L7 7M10 11v5M14 11v5" /></svg>;
  return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.2" /><path d="M3.5 19c.5-3.5 2.4-5.3 5.5-5.3s5 1.8 5.5 5.3M14.5 14.5c2.9-.4 5 .9 5.7 3.8" /></svg>;
}

function SocialIcon({ platform }: { platform: "instagram" | "tiktok" | "youtube" }) {
  const label = platform === "instagram" ? "Instagram" : platform === "tiktok" ? "TikTok" : "YouTube";
  return <span className={`casting-social ${platform}`} aria-label={label}><SocialLogo network={platform} /></span>;
}

const formatBudget = (value: number) => `${value.toLocaleString("fr-FR")} MAD`;
const formatEngagement = (value: number) => `${value.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

export default function CampaignCastingPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [selected, setSelected] = useState<number[]>(creators.map((creator) => creator.id));
  const [manualMode, setManualMode] = useState(false);
  const [sortBy, setSortBy] = useState("pertinence");
  const [level, setLevel] = useState("all");
  const [country, setCountry] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [advancedFilters, setAdvancedFilters] = useState(false);
  const [interactionMessage, setInteractionMessage] = useState("");

  const selectedCreators = creators.filter((creator) => selected.includes(creator.id));
  const selectedBudget = selectedCreators.reduce((sum, creator) => sum + creator.budget, 0);
  const budgetPercent = Math.min(100, Math.round((selectedBudget / 150000) * 100));

  const filteredCreators = useMemo(() => {
    const matches = creators.filter((creator) => {
      const matchesLevel = level === "all" || creator.niche.includes(level);
      const matchesCountry = country === "all" || creator.country === country;
      const matchesPlatform = platform === "all" || (platform === "Instagram" && creator.instagram !== "–") || (platform === "TikTok" && creator.tiktok !== "–") || (platform === "YouTube" && creator.youtube !== "–");
      return matchesLevel && matchesCountry && matchesPlatform;
    });
    if (sortBy === "score") return [...matches].sort((a, b) => b.score - a.score);
    if (sortBy === "engagement") return [...matches].sort((a, b) => b.engagement - a.engagement);
    return matches;
  }, [country, level, platform, sortBy]);

  function toggleCreator(id: number) {
    const creator = creators.find((item) => item.id === id);
    setSelected((current) => {
      const removing = current.includes(id);
      setInteractionMessage(removing ? `${creator?.name} a été retiré du casting.` : `${creator?.name} a été ajouté au casting.`);
      return removing ? current.filter((creatorId) => creatorId !== id) : [...current, id];
    });
  }

  function clearSelection() {
    setSelected([]);
    setInteractionMessage("La sélection a été vidée. Sélectionnez au moins un créateur pour continuer.");
  }

  return (
    <main className="dashboard-page create-campaign-page campaign-casting-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main casting-main">
        <header className="create-campaign-header casting-header">
          <div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div>
          <div><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré" : "Enregistrer comme brouillon"}{draftSaved ? <CastingIcon name="check" /> : null}</button><a href="/campagnes" aria-label="Fermer la création de campagne"><CastingIcon name="close" /></a></div>
        </header>

        <nav className="campaign-stepper casting-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index < 2 ? "complete" : index === 2 ? "active" : ""} key={step}><i>{index < 2 ? <CastingIcon name="check" /> : index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="casting-page-grid">
          <section className="casting-workspace">
            <div className="casting-summary">
              <article><i><CastingIcon name="users" /></i><span><small>Créateurs sélectionnés</small><strong>{selectedCreators.length} / 8</strong><em>Recommandé : 6 à 8</em></span></article>
              <article className="budget-stat"><i><CastingIcon name="wallet" /></i><span><small>Budget utilisé</small><strong>{selectedBudget.toLocaleString("fr-FR")} / 150 000 MAD</strong><b><u style={{ width: `${budgetPercent}%` }} /></b><em>{budgetPercent} %</em></span></article>
              <article><i><CastingIcon name="eye" /></i><span><small>Couverture estimée</small><strong>2,4 M – 3,1 M</strong><em>Comptes uniques</em></span></article>
              <article><i><CastingIcon name="heart" /></i><span><small>Engagement moyen estimé</small><strong>4,8 %</strong><em>Moyenne pondérée</em></span></article>
            </div>

            <div className="casting-selector-card">
              <div className="casting-tabs">
                <button type="button" className={!manualMode ? "active" : ""} aria-pressed={!manualMode} onClick={() => { setManualMode(false); setInteractionMessage("Le casting recommandé par SoMatch AI est affiché."); }}><b><CastingIcon name="sparkles" /></b><span><strong>Casting recommandé par SoMatch AI</strong><small>Notre IA a analysé votre brief et sélectionné les profils les plus pertinents.</small></span></button>
                <button type="button" className={manualMode ? "active" : ""} aria-pressed={manualMode} onClick={() => { setManualMode(true); setInteractionMessage("Mode de sélection manuelle activé."); }}><b><CastingIcon name="circle" /></b><span><strong>Sélection manuelle</strong><small>Ajoutez des créateurs depuis Explorer ou vos favoris.</small></span></button>
              </div>

              <div className="casting-filters">
                <select aria-label="Trier par" value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="pertinence">Trier par pertinence</option><option value="score">SoMatch Score</option><option value="engagement">Engagement</option></select>
                <select aria-label="Niveau" value={level} onChange={(event) => setLevel(event.target.value)}><option value="all">Tous les niveaux</option><option value="Méga">Méga</option><option value="Macro">Macro</option></select>
                <select aria-label="Pays" value={country} onChange={(event) => setCountry(event.target.value)}><option value="all">Tous les pays</option><option value="Maroc">Maroc</option><option value="France">France</option></select>
                <select aria-label="Plateforme" value={platform} onChange={(event) => setPlatform(event.target.value)}><option value="all">Toutes les plateformes</option><option value="Instagram">Instagram</option><option value="TikTok">TikTok</option><option value="YouTube">YouTube</option></select>
                <button type="button" className={advancedFilters ? "active" : ""} aria-pressed={advancedFilters} onClick={() => { setAdvancedFilters((current) => !current); setInteractionMessage(advancedFilters ? "Les filtres avancés ont été fermés." : "Les filtres avancés sont prêts à être configurés."); }}><CastingIcon name="filter" /> Filtres avancés</button>
              </div>

              <div className="casting-list">
                {filteredCreators.map((creator, index) => {
                  const isSelected = selected.includes(creator.id);
                  return (
                    <article className={`${isSelected ? "selected " : ""}influencer-card-target`} key={creator.id}>
                      <InfluencerProfileLink name={creator.name} />
                      <b className="creator-rank">{index + 1}</b>
                      <div className="casting-avatar"><img src={creator.image} alt={creator.name} />{creator.badge ? <i className={creator.badge} aria-hidden="true" /> : null}</div>
                      <div className="casting-identity"><strong>{creator.name} <i title="Profil vérifié"><CastingIcon name="verified" /></i></strong><small>{creator.niche}</small><em><CastingIcon name="location" /> {creator.country} · {creator.city}</em></div>
                      <div className="casting-platform-numbers"><span><SocialIcon platform="instagram" />{creator.instagram}</span><span><SocialIcon platform="tiktok" />{creator.tiktok}</span><span><SocialIcon platform="youtube" />{creator.youtube}</span></div>
                      <div className="casting-engagement"><small>Engagement</small><strong>{formatEngagement(creator.engagement)} <CastingIcon name="trend" /></strong></div>
                      <div className="casting-score" style={{ "--score": `${creator.score * 3.6}deg` } as React.CSSProperties}><span><strong>{creator.score}</strong></span><small>SoMatch Score</small></div>
                      <div className="casting-budget"><small>Budget estimé</small><strong>{formatBudget(creator.budget)}</strong><em>Par collaboration</em></div>
                      <button type="button" className="casting-check" aria-label={`${isSelected ? "Retirer" : "Sélectionner"} ${creator.name}`} aria-pressed={isSelected} onClick={() => toggleCreator(creator.id)}>{isSelected ? <CastingIcon name="check" /> : null}</button>
                      <button type="button" className="casting-why" onClick={() => setInteractionMessage(`${creator.name} correspond à la cible, aux plateformes et aux objectifs de la campagne.`)}>Pourquoi ce profil ? <CastingIcon name="chevron" /></button>
                    </article>
                  );
                })}
                {filteredCreators.length === 0 ? <div className="casting-empty"><CastingIcon name="users" /><strong>Aucun créateur ne correspond à ces filtres.</strong><button type="button" onClick={() => { setLevel("all"); setCountry("all"); setPlatform("all"); }}>Réinitialiser les filtres</button></div> : null}
              </div>
              <button type="button" className="load-creators" onClick={() => setInteractionMessage("Tous les créateurs disponibles sont déjà affichés.")}>Charger plus de créateurs <CastingIcon name="chevron" /></button>
            </div>

            <footer className="casting-actions"><a href="/campagnes/creer/brief"><CastingIcon name="arrow-left" /> Retour</a><span role="status" aria-live="polite">{interactionMessage}</span><a className={`casting-recap-link${selectedCreators.length === 0 ? " disabled" : ""}`} aria-disabled={selectedCreators.length === 0} onClick={(event) => { if (selectedCreators.length === 0) { event.preventDefault(); setInteractionMessage("Sélectionnez au moins un créateur avant de continuer."); } }} href="/campagnes/creer/recapitulatif">Continuer vers le récapitulatif <CastingIcon name="arrow-right" /></a></footer>
          </section>

          <aside className="casting-aside">
            <section className="casting-overview create-motion-card"><header><i><CastingIcon name="document" /></i><span><h2>Aperçu de votre campagne</h2><p>Back to School 2026</p></span></header><div><article><i><CastingIcon name="check-circle" /></i><strong>Informations</strong><span>Terminé</span></article><article><i><CastingIcon name="check-circle" /></i><strong>Brief</strong><span>Terminé</span></article><article className="active"><i><CastingIcon name="check-circle" /></i><strong>Casting</strong><span>En cours</span></article><article><i><CastingIcon name="circle" /></i><strong>Récapitulatif</strong><span>À compléter</span></article></div></section>
            <section className="selected-casting create-motion-card">
              <header><h2>Créateurs sélectionnés ({selectedCreators.length})</h2><b>{formatBudget(selectedBudget)}</b></header>
              <div>{selectedCreators.map((creator) => <article className="influencer-card-target" key={creator.id}><InfluencerProfileLink name={creator.name} /><img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.niche.split(" · ")[0]}</small></span><span className="selected-platforms"><SocialIcon platform="instagram" /><SocialIcon platform="tiktok" /></span><b>{formatBudget(creator.budget)}</b><button type="button" onClick={() => toggleCreator(creator.id)} aria-label={`Retirer ${creator.name}`}><CastingIcon name="close" /></button></article>)}</div>
              {selectedCreators.length === 0 ? <p className="selected-empty">Aucun créateur sélectionné.</p> : null}
              <button type="button" className="clear-casting" disabled={selectedCreators.length === 0} onClick={clearSelection}><CastingIcon name="trash" /> Vider la sélection</button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
