"use client";

import { useState } from "react";
import { AppSidebar } from "../../../components/AppShell";
import "../creer-campagne.css";
import "./brief.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;
const platforms = [["instagram", "Instagram"], ["tiktok", "TikTok"], ["youtube", "YouTube"]] as const;
const categories = ["Lifestyle", "Family", "Education", "Beauty", "Food", "Fashion", "Sport & Fitness", "Tech"] as const;
const formats = ["Reels", "Stories", "TikTok", "YouTube Shorts", "UGC (contenu utilisateur)", "Live"] as const;
const kpis = [["♨", "Notoriété / Reach"], ["♡", "Engagement"], ["◉", "Vues"], ["✣", "Trafic"], ["♧", "Conversions"], ["□", "Ventes"]] as const;

function ToggleGroup({ values, selected, onToggle, className = "" }: { values: readonly (string | readonly [string, string])[]; selected: Set<string>; onToggle: (value: string) => void; className?: string }) {
  return <div className={className}>{values.map((entry) => { const value = typeof entry === "string" ? entry : entry[1]; const icon = typeof entry === "string" ? "" : entry[0]; const active = selected.has(value); return <button type="button" className={active ? "selected" : ""} aria-pressed={active} onClick={() => onToggle(value)} key={value}>{icon ? <i>{icon}</i> : null}<span>{value}</span><b>{active ? "✓" : "□"}</b></button>; })}</div>;
}

function toggleSet(value: string, setter: React.Dispatch<React.SetStateAction<Set<string>>>) {
  setter((current) => { const next = new Set(current); if (next.has(value)) next.delete(value); else next.add(value); return next; });
}

export default function CampaignBriefPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(new Set<string>(["Instagram", "TikTok"]));
  const [selectedCategories, setSelectedCategories] = useState(new Set<string>(["Lifestyle", "Family", "Beauty"]));
  const [selectedFormats, setSelectedFormats] = useState(new Set<string>(["Reels", "Stories", "TikTok"]));
  const [selectedKpis, setSelectedKpis] = useState(new Set<string>(["Notoriété / Reach", "Engagement", "Trafic"]));
  const [briefLength, setBriefLength] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [continued, setContinued] = useState(false);

  return (
    <main className="dashboard-page create-campaign-page campaign-brief-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main">
        <header className="create-campaign-header"><div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div><div><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré ✓" : "Enregistrer comme brouillon"}</button><a href="/campagnes" aria-label="Fermer">×</a></div></header>

        <nav className="campaign-stepper brief-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index === 0 ? "complete" : index === 1 ? "active" : ""} key={step}><i>{index === 0 ? "✓" : index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="create-campaign-grid brief-campaign-grid">
          <form className="campaign-information-card brief-information-card" onSubmit={(event) => { event.preventDefault(); setContinued(true); }}>
            <div className="form-card-title brief-card-title"><small>Étape 2 sur 4</small><h2>Brief de la campagne</h2><p>Définissez votre cible, vos objectifs et le type de contenu attendu.</p></div>

            <div className="brief-sections-grid">
              <section className="brief-block target-block"><h3>Cible principale</h3><div className="target-selects"><label><span>Âge</span><select defaultValue="18-35"><option value="18-35">18 – 35 ans</option><option>25 – 40 ans</option><option>35 – 50 ans</option></select></label><label><span>Genre</span><select defaultValue="all"><option value="all">Tous</option><option>Femmes</option><option>Hommes</option></select></label><label><span>Localisation</span><select defaultValue="maroc"><option value="maroc">Maroc</option><option>France</option><option>MENA</option></select></label></div><p className="popular-cities">●&nbsp; Principales villes : Casablanca, Rabat, Marrakech, Tanger, Fès</p></section>
              <section className="brief-block platforms-block"><h3>Plateformes</h3><p>Sélectionnez les plateformes principales</p><ToggleGroup values={platforms} selected={selectedPlatforms} onToggle={(value) => toggleSet(value, setSelectedPlatforms)} className="platform-toggle-grid" /></section>

              <section className="brief-block"><h3>Catégories de créateurs</h3><p>Choisissez les catégories les plus pertinentes</p><ToggleGroup values={categories} selected={selectedCategories} onToggle={(value) => toggleSet(value, setSelectedCategories)} className="chip-toggle-grid category-toggles" /><button type="button" className="add-category" onClick={() => toggleSet("Education", setSelectedCategories)}>＋&nbsp; Ajouter une catégorie</button></section>
              <section className="brief-block"><h3>Formats de contenu souhaités</h3><p>Sélectionnez les formats à inclure</p><ToggleGroup values={formats} selected={selectedFormats} onToggle={(value) => toggleSet(value, setSelectedFormats)} className="chip-toggle-grid format-toggles" /></section>

              <section className="brief-block kpi-block"><h3>Objectifs / KPIs prioritaires</h3><p>Sélectionnez vos objectifs principaux (3 max.)</p><ToggleGroup values={kpis} selected={selectedKpis} onToggle={(value) => { if (selectedKpis.has(value) || selectedKpis.size < 3) toggleSet(value, setSelectedKpis); }} className="kpi-toggle-grid" /></section>

              <section className="brief-block brief-copy-block"><div className="brief-copy"><h3>Décrivez votre brief</h3><p>Plus vous êtes précis, plus somatch AI pourra vous proposer le casting idéal.</p><textarea maxLength={2000} onChange={(event) => setBriefLength(event.target.value.length)} placeholder="Décrivez votre campagne, le message clé, vos attentes en termes de ton, d’univers visuel, de contraintes, de do’s & don’ts..." /><b>{briefLength} / 2000</b></div><aside><h3>Analyser mon brief avec somatch AI&nbsp; ✣</h3><p>Notre IA analysera votre brief et vous aidera à définir les critères et le casting idéal.</p><button type="button" onClick={() => setAnalyzed(true)}>{analyzed ? "Brief analysé ✓" : "Analyser mon brief"}</button></aside></section>
            </div>

            <footer className="brief-form-actions"><a href="/campagnes/creer">←&nbsp;&nbsp; Retour</a><button type="submit">{continued ? "Étape enregistrée ✓" : "Continuer"}<span>→</span></button></footer>
          </form>

          <aside className="create-campaign-aside brief-aside">
            <section className="campaign-overview-card brief-overview-card create-motion-card"><header><i>▤</i><span><h2>Aperçu de votre campagne</h2><p>Complétez les étapes pour voir le récapitulatif de votre campagne.</p></span></header><div><article><i>✓</i><strong>Informations</strong><span className="done">Terminé</span></article><article className="active"><i>✓</i><strong>Brief</strong><span>En cours</span></article><article><i>○</i><strong>Casting</strong><span>À compléter</span></article><article><i>○</i><strong>Récapitulatif</strong><span>À compléter</span></article></div></section>
            <section className="campaign-assistant-card brief-assistant-card create-motion-card"><header><i>✣</i><span><h2>somatch AI</h2><p>Notre IA vous accompagne à chaque étape.</p></span></header><ul><li>Analyse intelligente de votre brief</li><li>Suggestions d’objectifs & KPIs</li><li>Recommandations de profils</li><li>Estimation des performances</li></ul><button type="button">poser une question à l’IA&nbsp; ✣</button></section>
          </aside>
        </div>
      </section>
    </main>
  );
}
