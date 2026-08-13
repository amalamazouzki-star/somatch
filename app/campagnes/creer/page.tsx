"use client";

import { useState } from "react";
import { AppSidebar } from "../../components/AppShell";
import "./creer-campagne.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;
const overviewSteps = [["✓", "Informations"], ["✓", "Brief"], ["♙", "Casting"], ["✓", "Récapitulatif"]] as const;

function SelectField({ label, required, children, defaultValue = "" }: { label: string; required?: boolean; children: React.ReactNode; defaultValue?: string }) {
  return <label className="create-field"><span>{label}{required ? <b> *</b> : null}</span><select defaultValue={defaultValue} required={required}>{children}</select></label>;
}

export default function CreateCampaignPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [objectives, setObjectives] = useState(0);

  return (
    <main className="dashboard-page create-campaign-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main">
        <header className="create-campaign-header">
          <div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div>
          <div><button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré ✓" : "Enregistrer comme brouillon"}</button><a href="/campagnes" aria-label="Fermer">×</a></div>
        </header>

        <nav className="campaign-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index === 0 ? "active" : ""} key={step}><i>{index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="create-campaign-grid">
          <form className="campaign-information-card" onSubmit={(event) => { event.preventDefault(); window.location.href = "/campagnes/creer/brief"; }}>
            <div className="form-card-title"><small>Étape 1 sur 4</small><h2>Informations générales</h2><p>Commençons par les informations clés de votre campagne.</p></div>
            <div className="campaign-form-grid">
              <label className="create-field"><span>Nom de la campagne <b>*</b></span><input required placeholder="Ex : Back to School 2026" /></label>
              <SelectField label="Marque / Annonceur" required><option value="">Sélectionnez une marque</option><option>Kinder</option><option>LC Waikiki</option><option>Filorga</option></SelectField>
              <SelectField label="Objectif principal" required><option value="">Sélectionnez un objectif</option><option>Notoriété & Engagement</option><option>Lancement produit</option><option>Conversion</option></SelectField>
              <SelectField label="Marché principal" required defaultValue="maroc"><option value="maroc">🇲🇦　Maroc</option><option value="france">🇫🇷　France</option><option value="mena">MENA</option></SelectField>
              <fieldset className="campaign-date-field"><legend>Dates de la campagne</legend><label><span>Date de début</span><div><i>▣</i><input aria-label="Date de début" defaultValue="01 / 09 / 2026" /></div></label><label><span>Date de fin</span><div><i>▣</i><input aria-label="Date de fin" defaultValue="30 / 09 / 2026" /></div></label></fieldset>
              <fieldset className="campaign-budget-field"><legend>Budget total estimé <b>*</b></legend><select aria-label="Devise du budget" defaultValue="MAD"><option>MAD</option><option>EUR</option><option>USD</option></select><input aria-label="Budget total estimé" defaultValue="150 000" /></fieldset>
              <SelectField label="Devise" defaultValue="mad"><option value="mad">MAD - Dirham marocain</option><option value="eur">EUR - Euro</option><option value="usd">USD - Dollar américain</option></SelectField>
              <SelectField label="Fuseau horaire" defaultValue="casa"><option value="casa">(GMT+1) Casablanca</option><option value="paris">(GMT+2) Paris</option><option value="utc">UTC</option></SelectField>
              <label className="campaign-objectives"><span>Objectifs détaillés <small>(optionnel)</small></span><textarea maxLength={500} onChange={(event) => setObjectives(event.target.value.length)} placeholder="Décrivez vos objectifs en quelques lignes..." /><b>{objectives} / 500</b></label>
            </div>
            <div className="campaign-form-actions"><button type="submit">Continuer<span>→</span></button></div>
          </form>

          <aside className="create-campaign-aside">
            <section className="campaign-overview-card create-motion-card"><header><i>▤</i><span><h2>Aperçu de votre campagne</h2><p>Complétez les étapes pour voir le récapitulatif de votre campagne.</p></span></header><div>{overviewSteps.map(([icon, label], index) => <article className={index === 0 ? "active" : ""} key={label}><i>{icon}</i><strong>{label}</strong><span>À compléter</span></article>)}</div></section>
            <section className="campaign-assistant-card create-motion-card"><header><i>✣</i><span><h2>somatch AI</h2><p>Laissez notre IA vous accompagner</p></span></header><ul><li>Suggestions d’objectifs</li><li>Estimation du budget</li><li>Recommandations de créateurs</li><li>Benchmarks de performance</li></ul><button type="button">demander à somatch AI&nbsp; ✣</button></section>
          </aside>
        </div>
      </section>
    </main>
  );
}
