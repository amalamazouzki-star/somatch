"use client";

import { useState } from "react";
import { AppSidebar } from "../../components/AppShell";
import "./creer-campagne.css";

const steps = ["Informations", "Brief", "Casting", "Récapitulatif"] as const;
const overviewSteps = [
  { icon: "check", label: "Informations" },
  { icon: "brief", label: "Brief" },
  { icon: "users", label: "Casting" },
  { icon: "summary", label: "Récapitulatif" },
] as const;

type CampaignIconName = "calendar" | "check" | "brief" | "users" | "summary" | "document" | "sparkles" | "arrow" | "close";

function CampaignIcon({ name }: { name: CampaignIconName }) {
  const content = {
    calendar: <><rect x="3.5" y="5.5" width="17" height="15" rx="2" /><path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17" /></>,
    check: <><circle cx="12" cy="12" r="8.5" /><path d="m8.2 12.2 2.5 2.6 5.3-5.5" /></>,
    brief: <><circle cx="12" cy="12" r="8.5" /><path d="m8.2 12.2 2.5 2.6 5.3-5.5" /></>,
    users: <><circle cx="12" cy="8" r="3" /><path d="M6.2 19c.5-3.7 2.6-5.8 5.8-5.8s5.3 2.1 5.8 5.8" /></>,
    summary: <><circle cx="12" cy="12" r="8.5" /><path d="m8.2 12.2 2.5 2.6 5.3-5.5" /></>,
    document: <><path d="M7 3.5h7l3 3V20H7Z" /><path d="M14 3.5V7h3M9.5 11h5M9.5 14h5M9.5 17h3.4" /></>,
    sparkles: <><path d="M10.5 3.5c.6 3.9 2.4 5.7 6.3 6.3-3.9.6-5.7 2.4-6.3 6.3-.6-3.9-2.4-5.7-6.3-6.3 3.9-.6 5.7-2.4 6.3-6.3Z" /><path d="M18.7 3.2v4M20.7 5.2h-4M18.5 16.6v4.2M20.6 18.7h-4.2" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  }[name];

  return <svg className={`campaign-icon campaign-icon-${name}`} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{content}</svg>;
}

function SelectField({ label, name, required, children, defaultValue = "" }: { label: string; name: string; required?: boolean; children: React.ReactNode; defaultValue?: string }) {
  return <label className="create-field"><span>{label}{required ? <b aria-hidden="true"> *</b> : null}</span><select name={name} defaultValue={defaultValue} required={required}>{children}</select></label>;
}

export default function CreateCampaignPage() {
  const [draftSaved, setDraftSaved] = useState(false);
  const [objectives, setObjectives] = useState(0);
  const [assistantReady, setAssistantReady] = useState(false);

  return (
    <main className="dashboard-page create-campaign-page">
      <AppSidebar active="mes campagnes" context="create-campaign" />
      <section className="dashboard-main create-campaign-main">
        <header className="create-campaign-header">
          <div><h1>Créer une campagne</h1><p>Construisez votre campagne d’influence en quelques étapes simples.</p></div>
          <div>
            <button type="button" className={draftSaved ? "saved" : ""} onClick={() => setDraftSaved(true)}>{draftSaved ? "Brouillon enregistré ✓" : "Enregistrer comme brouillon"}</button>
            <a href="/campagnes" aria-label="Fermer la création de campagne"><CampaignIcon name="close" /></a>
          </div>
        </header>

        <nav className="campaign-stepper" aria-label="Progression de la campagne">
          {steps.map((step, index) => <div className={index === 0 ? "active" : ""} aria-current={index === 0 ? "step" : undefined} key={step}><i>{index + 1}</i><span>{step}</span>{index < steps.length - 1 ? <b /> : null}</div>)}
        </nav>

        <div className="create-campaign-grid">
          <form className="campaign-information-card" onSubmit={(event) => { event.preventDefault(); window.location.assign("/campagnes/creer/brief"); }}>
            <div className="form-card-title"><small>Étape 1 sur 4</small><h2>Informations générales</h2><p>Commençons par les informations clés de votre campagne.</p></div>
            <div className="campaign-form-grid">
              <label className="create-field"><span>Nom de la campagne <b aria-hidden="true">*</b></span><input name="campaignName" required autoComplete="off" placeholder="Ex. : Back to School 2026" /></label>
              <SelectField label="Marque / annonceur" name="brand" required><option value="">Sélectionnez une marque</option><option>Kinder</option><option>LC Waikiki</option><option>Filorga</option></SelectField>
              <SelectField label="Objectif principal" name="mainGoal" required><option value="">Sélectionnez un objectif</option><option>Notoriété et engagement</option><option>Lancement de produit</option><option>Conversion</option></SelectField>
              <SelectField label="Marché principal" name="market" required defaultValue="maroc"><option value="maroc">🇲🇦　Maroc</option><option value="france">🇫🇷　France</option><option value="mena">MENA</option></SelectField>
              <fieldset className="campaign-date-field"><legend>Dates de la campagne</legend><label><span>Date de début</span><div><CampaignIcon name="calendar" /><input name="startDate" aria-label="Date de début" inputMode="numeric" required defaultValue="01 / 09 / 2026" /></div></label><label><span>Date de fin</span><div><CampaignIcon name="calendar" /><input name="endDate" aria-label="Date de fin" inputMode="numeric" required defaultValue="30 / 09 / 2026" /></div></label></fieldset>
              <fieldset className="campaign-budget-field"><legend>Budget total estimé <b aria-hidden="true">*</b></legend><select name="budgetCurrency" aria-label="Devise du budget" defaultValue="MAD"><option>MAD</option><option>EUR</option><option>USD</option></select><input name="budget" aria-label="Budget total estimé" inputMode="numeric" pattern="[0-9 ]+" required defaultValue="150 000" /></fieldset>
              <SelectField label="Devise" name="currency" defaultValue="mad"><option value="mad">MAD – dirham marocain</option><option value="eur">EUR – euro</option><option value="usd">USD – dollar américain</option></SelectField>
              <SelectField label="Fuseau horaire" name="timezone" defaultValue="casa"><option value="casa">(GMT+1) Casablanca</option><option value="paris">(GMT+2) Paris</option><option value="utc">UTC</option></SelectField>
              <label className="campaign-objectives"><span>Objectifs détaillés <small>(facultatif)</small></span><textarea name="detailedGoals" maxLength={500} onChange={(event) => setObjectives(event.target.value.length)} placeholder="Décrivez vos objectifs en quelques lignes…" /><b aria-live="polite">{objectives} / 500</b></label>
            </div>
            <div className="campaign-form-actions"><button type="submit">Continuer<CampaignIcon name="arrow" /></button></div>
            <p className="campaign-save-status" role="status" aria-live="polite">{draftSaved ? "Votre brouillon a bien été enregistré localement." : ""}</p>
          </form>

          <aside className="create-campaign-aside">
            <section className="campaign-overview-card create-motion-card">
              <header><i><CampaignIcon name="document" /></i><span><h2>Aperçu de votre campagne</h2><p>Complétez les étapes pour voir le récapitulatif de votre campagne.</p></span></header>
              <div>{overviewSteps.map(({ icon, label }, index) => <article className={index === 0 ? "active" : ""} key={label}><i><CampaignIcon name={icon} /></i><strong>{label}</strong><span>À compléter</span></article>)}</div>
            </section>
            <section className="campaign-assistant-card create-motion-card">
              <header><i><CampaignIcon name="sparkles" /></i><span><h2>SoMatch AI</h2><p>Laissez notre IA vous accompagner.</p></span></header>
              <ul><li>Suggestions d’objectifs</li><li>Estimation du budget</li><li>Recommandations de créateurs</li><li>Référentiels de performance</li></ul>
              <button type="button" className={assistantReady ? "assistant-ready" : ""} onClick={() => setAssistantReady(true)}>{assistantReady ? "SoMatch AI est prêt ✓" : "Demander à SoMatch AI"}<CampaignIcon name="sparkles" /></button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
