"use client";

import { useState } from "react";
import { AppSidebar } from "../../../components/AppShell";
import { SocialLogo, type SocialNetwork } from "../../../components/SocialLogo";
import "../creer-campagne.css";
import "./brief.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;
const platforms: readonly { network: SocialNetwork; label: string }[] = [
  { network: "instagram", label: "Instagram" },
  { network: "tiktok", label: "TikTok" },
  { network: "youtube", label: "YouTube" },
];
const categories = ["Lifestyle", "Famille", "Éducation", "Beauté", "Gastronomie", "Mode", "Sport et fitness", "Technologie"] as const;
const formats = ["Reels", "Stories", "TikTok", "YouTube Shorts", "UGC (contenu utilisateur)", "Live"] as const;
const kpis = [
  { label: "Notoriété et portée", icon: "megaphone" },
  { label: "Engagement", icon: "heart" },
  { label: "Vues", icon: "eye" },
  { label: "Trafic", icon: "cursor" },
  { label: "Conversions", icon: "conversion" },
  { label: "Ventes", icon: "sales" },
] as const;

type BriefIconName = "arrow-left" | "arrow-right" | "check" | "check-circle" | "circle" | "close" | "cursor" | "document" | "eye" | "heart" | "location" | "megaphone" | "sparkles" | "sales" | "conversion" | "users";

function BriefIcon({ name }: { name: BriefIconName }) {
  if (name === "check") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4L19 7" /></svg>;
  if (name === "check-circle") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="m8 12.2 2.6 2.5 5.4-5.4" /></svg>;
  if (name === "circle") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /></svg>;
  if (name === "close") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
  if (name === "arrow-left") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg>;
  if (name === "arrow-right") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
  if (name === "document") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l3 3V20H7zM14 3.5v4h3M9.5 12h5M9.5 15.5h5" /></svg>;
  if (name === "sparkles") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7Z" /><path d="M19 15.5c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z" /></svg>;
  if (name === "location") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></svg>;
  if (name === "heart") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 9.2c0 5-8.5 10-8.5 10s-8.5-5-8.5-10A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.5 2.9Z" /></svg>;
  if (name === "eye") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.8 12s3.3-5 9.2-5 9.2 5 9.2 5-3.3 5-9.2 5-9.2-5-9.2-5Z" /><circle cx="12" cy="12" r="2.5" /></svg>;
  if (name === "cursor") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 3 13 8-6 1.5-3 5.5Z" /></svg>;
  if (name === "megaphone") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h4l8 4V6l-8 4H4Zm4 4 1 5h3" /></svg>;
  if (name === "conversion") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10H7zM4 10V4h6M20 14v6h-6" /></svg>;
  if (name === "sales") return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Zm3 0a4 4 0 0 1 8 0" /></svg>;
  return <svg className="campaign-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.2" /><path d="M3.5 19c.5-3.5 2.4-5.3 5.5-5.3s5 1.8 5.5 5.3M14.5 14.5c2.9-.4 5 .9 5.7 3.8" /></svg>;
}

function ToggleGroup({ values, selected, onToggle, className = "", iconFor }: { values: readonly string[]; selected: Set<string>; onToggle: (value: string) => void; className?: string; iconFor?: (value: string) => BriefIconName | undefined }) {
  return <div className={className}>{values.map((value) => { const active = selected.has(value); const icon = iconFor?.(value); return <button type="button" className={active ? "selected" : ""} aria-pressed={active} onClick={() => onToggle(value)} key={value}>{icon ? <i><BriefIcon name={icon} /></i> : null}<span>{value}</span><b aria-hidden="true">{active ? <BriefIcon name="check" /> : <span />}</b></button>; })}</div>;
}

function toggleSet(value: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) {
  setter((current) => { const next = new Set(current); if (next.has(value)) next.delete(value); else next.add(value); return next; });
}

export default function CampaignBriefPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(new Set<string>(["Instagram", "TikTok"]));
  const [selectedCategories, setSelectedCategories] = useState(new Set<string>(["Lifestyle", "Famille", "Beauté"]));
  const [selectedFormats, setSelectedFormats] = useState(new Set<string>(["Reels", "Stories", "TikTok"]));
  const [selectedKpis, setSelectedKpis] = useState(new Set<string>(["Notoriété et portée", "Engagement", "Trafic"]));
  const [briefLength, setBriefLength] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [assistantReady, setAssistantReady] = useState(false);
  const [selectionMessage, setSelectionMessage] = useState("");

  const toggleKpi = (value: string) => {
    if (selectedKpis.has(value) || selectedKpis.size < 3) {
      toggleSet(value, setSelectedKpis);
      setSelectionMessage("");
      return;
    }
    setSelectionMessage("Vous pouvez sélectionner trois indicateurs au maximum.");
  };

  const addCategory = () => {
    if (!selectedCategories.has("Éducation")) {
      toggleSet("Éducation", setSelectedCategories);
      setSelectionMessage("La catégorie Éducation a été ajoutée.");
    } else {
      setSelectionMessage("La catégorie Éducation est déjà sélectionnée.");
    }
  };

  return (
    <main className="dashboard-page create-campaign-page campaign-brief-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main">
        <header className="create-campaign-header"><div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div><div><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré" : "Enregistrer comme brouillon"}{draftSaved ? <BriefIcon name="check" /> : null}</button><a href="/campagnes" aria-label="Fermer la création de campagne"><BriefIcon name="close" /></a></div></header>

        <nav className="campaign-stepper brief-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index === 0 ? "complete" : index === 1 ? "active" : ""} key={step}><i>{index === 0 ? <BriefIcon name="check" /> : index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="create-campaign-grid brief-campaign-grid">
          <form className="campaign-information-card brief-information-card" onSubmit={(event) => event.preventDefault()}>
            <div className="form-card-title brief-card-title"><small>Étape 2 sur 4</small><h2>Brief de la campagne</h2><p>Définissez votre cible, vos objectifs et le type de contenu attendu.</p></div>

            <div className="brief-sections-grid">
              <section className="brief-block target-block"><h3>Cible principale</h3><div className="target-selects"><label><span>Âge</span><select aria-label="Âge de la cible" defaultValue="18-35"><option value="18-35">18 – 35 ans</option><option>25 – 40 ans</option><option>35 – 50 ans</option></select></label><label><span>Genre</span><select aria-label="Genre de la cible" defaultValue="all"><option value="all">Tous</option><option>Femmes</option><option>Hommes</option></select></label><label><span>Localisation</span><select aria-label="Localisation de la cible" defaultValue="maroc"><option value="maroc">Maroc</option><option>France</option><option>Région MENA</option></select></label></div><p className="popular-cities"><BriefIcon name="location" /> <span>Principales villes : Casablanca, Rabat, Marrakech, Tanger, Fès</span></p></section>
              <section className="brief-block platforms-block"><h3>Plateformes</h3><p>Sélectionnez les plateformes principales.</p><div className="platform-toggle-grid">{platforms.map(({ network, label }) => { const active = selectedPlatforms.has(label); return <button type="button" className={active ? "selected" : ""} aria-pressed={active} onClick={() => toggleSet(label, setSelectedPlatforms)} key={network}><i><SocialLogo network={network} /></i><span>{label}</span><b aria-hidden="true">{active ? <BriefIcon name="check" /> : <span />}</b></button>; })}</div></section>

              <section className="brief-block"><h3>Catégories de créateurs</h3><p>Choisissez les catégories les plus pertinentes.</p><ToggleGroup values={categories} selected={selectedCategories} onToggle={(value) => toggleSet(value, setSelectedCategories)} className="chip-toggle-grid category-toggles" /><button type="button" className="add-category" onClick={addCategory}>＋&nbsp; Ajouter une catégorie</button></section>
              <section className="brief-block"><h3>Formats de contenu souhaités</h3><p>Sélectionnez les formats à inclure.</p><ToggleGroup values={formats} selected={selectedFormats} onToggle={(value) => toggleSet(value, setSelectedFormats)} className="chip-toggle-grid format-toggles" /></section>

              <section className="brief-block kpi-block"><h3>Objectifs et indicateurs prioritaires</h3><p>Sélectionnez jusqu’à trois objectifs principaux.</p><ToggleGroup values={kpis.map((item) => item.label)} selected={selectedKpis} onToggle={toggleKpi} iconFor={(value) => kpis.find((item) => item.label === value)?.icon} className="kpi-toggle-grid" /><span className="brief-selection-status" role="status" aria-live="polite">{selectionMessage}</span></section>

              <section className="brief-block brief-copy-block"><div className="brief-copy"><h3>Décrivez votre brief</h3><p>Plus vous êtes précis, plus SoMatch AI pourra vous proposer le casting idéal.</p><textarea aria-label="Description du brief de campagne" maxLength={2000} onChange={(event) => setBriefLength(event.target.value.length)} placeholder="Décrivez votre campagne, le message clé, le ton, l’univers visuel, les contraintes et les bonnes pratiques attendues…" /><b aria-live="polite">{briefLength} / 2 000</b></div><aside><h3>Analyser mon brief avec SoMatch AI <BriefIcon name="sparkles" /></h3><p>Notre IA analysera votre brief et vous aidera à définir les critères et le casting idéal.</p><button type="button" className={analyzed ? "analysis-ready" : ""} onClick={() => setAnalyzed(true)}>{analyzed ? "Brief analysé" : "Analyser mon brief"}{analyzed ? <BriefIcon name="check" /> : null}</button></aside></section>
            </div>

            <footer className="brief-form-actions"><a href="/campagnes/creer"><BriefIcon name="arrow-left" /> Retour</a><a className="brief-continue-link" href="/campagnes/creer/casting">Continuer<BriefIcon name="arrow-right" /></a></footer>
          </form>

          <aside className="create-campaign-aside brief-aside">
            <section className="campaign-overview-card brief-overview-card create-motion-card"><header><i><BriefIcon name="document" /></i><span><h2>Aperçu de votre campagne</h2><p>Complétez les étapes pour voir le récapitulatif de votre campagne.</p></span></header><div><article><i><BriefIcon name="check-circle" /></i><strong>Informations</strong><span className="done">Terminé</span></article><article className="active"><i><BriefIcon name="check-circle" /></i><strong>Brief</strong><span>En cours</span></article><article><i><BriefIcon name="circle" /></i><strong>Casting</strong><span>À compléter</span></article><article><i><BriefIcon name="circle" /></i><strong>Récapitulatif</strong><span>À compléter</span></article></div></section>
            <section className="campaign-assistant-card brief-assistant-card create-motion-card"><header><i><BriefIcon name="sparkles" /></i><span><h2>SoMatch AI</h2><p>Notre IA vous accompagne à chaque étape.</p></span></header><ul><li>Analyse intelligente de votre brief</li><li>Suggestions d’objectifs et d’indicateurs</li><li>Recommandations de profils</li><li>Estimation des performances</li></ul><button type="button" className={assistantReady ? "assistant-ready" : ""} onClick={() => setAssistantReady(true)}>{assistantReady ? "Question prête" : "Poser une question à SoMatch AI"}<BriefIcon name={assistantReady ? "check" : "sparkles"} /></button></section>
          </aside>
        </div>
      </section>
    </main>
  );
}
