"use client";

import { AppSidebar } from "../../../components/AppShell";

type SuccessIconName =
  | "arrow-right"
  | "calendar"
  | "campaign"
  | "check"
  | "download"
  | "folder"
  | "lock"
  | "play"
  | "roles"
  | "shield"
  | "sparkles"
  | "target"
  | "team"
  | "users"
  | "wallet";

function SuccessIcon({ name }: { name: SuccessIconName }) {
  if (name === "check") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4L19 7" /></svg>;
  if (name === "arrow-right") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
  if (name === "calendar") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14" rx="2" /><path d="M8 3v5M16 3v5M4 10h16" /></svg>;
  if (name === "wallet") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7.5h14a2 2 0 0 1 2 2v9H6a2 2 0 0 1-2-2zM6 7.5 15 4v3.5M16 12h4" /></svg>;
  if (name === "campaign") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>;
  if (name === "team") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.2" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7s5 1.9 5.5 5.7M14.5 14.2c2.9-.4 5 .9 5.7 3.8" /></svg>;
  if (name === "users") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.2" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7s5 1.9 5.5 5.7M14.5 14.2c2.9-.4 5 .9 5.7 3.8" /></svg>;
  if (name === "roles") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7 1.4 0 2.6.4 3.5 1.1M17 13v7M13.5 16.5h7" /></svg>;
  if (name === "play") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></svg>;
  if (name === "target") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></svg>;
  if (name === "download") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M5 19h14" /></svg>;
  if (name === "folder") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 7h6l2-2H20v14H3.5z" /></svg>;
  if (name === "shield") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.4 7.8 7 10 4.6-2.2 7-5.4 7-10V6z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (name === "lock") return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
  return <svg className="success-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c.7 4.2 2.8 6.3 7 7-4.2.7-6.3 2.8-7 7-.7-4.2-2.8-6.3-7-7 4.2-.7 6.3-2.8 7-7Z" /><path d="M19 15.5c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z" /></svg>;
}

const nextSteps: ReadonlyArray<{ icon: SuccessIconName; title: string; copy: string; href: string }> = [
  { icon: "campaign", title: "Découvrir votre campagne", copy: "Accédez au détail de votre campagne pour consulter les influenceurs, le calendrier et les recommandations.", href: "/campagnes/back-to-school-2026" },
  { icon: "team", title: "Inviter votre équipe", copy: "Collaborez avec votre équipe sur cette campagne en temps réel.", href: "/profil" },
  { icon: "users", title: "Ajuster votre casting", copy: "Modifiez, remplacez ou ajoutez des créateurs selon vos besoins.", href: "/campagnes/creer/casting" },
  { icon: "download", title: "Exporter votre recommandation", copy: "Consultez la recommandation complète avant son export en PDF.", href: "/somatch-ai/recommandation" },
] as const;

const summaryStats: ReadonlyArray<{ icon: SuccessIconName; value: string; label: string }> = [
  { icon: "users", value: "5", label: "Influenceurs sélectionnés" },
  { icon: "roles", value: "3", label: "Rôles d’influence définis" },
  { icon: "play", value: "3", label: "Formats de contenu recommandés" },
  { icon: "target", value: "20", label: "Indicateurs clés définis" },
] as const;

function CampaignVisual() {
  return (
    <div className="success-campaign-visual" role="img" aria-label="Visuel de la campagne Kinder Joy Back to School">
      <div className="kinder-copy"><strong>Kinder</strong><b>JOY</b></div>
      <div className="success-backpack"><i /><b /><span /></div>
      <div className="success-books"><i /><i /><i /></div>
      <div className="success-pencils"><i /><i /><i /><i /></div>
    </div>
  );
}

export default function CampaignSuccessPage() {
  return (
    <main className="dashboard-page campaign-success-page">
      <AppSidebar active="mes campagnes" />
      <section className="campaign-success-main">
        <header className="success-hero">
          <div className="success-confetti" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
          <div className="success-check" aria-hidden="true"><SuccessIcon name="check" /></div>
          <h1>Campagne créée avec <span>succès&nbsp;!</span></h1>
          <p>Votre campagne a été créée et est prête à être pilotée.</p>
        </header>

        <div className="success-content-grid">
          <section className="success-campaign-card success-motion-card">
            <div className="success-campaign-overview">
              <CampaignVisual />
              <div className="success-campaign-copy">
                <div className="success-title-line"><h2>Back to School 2026</h2><span><i aria-hidden="true" />En préparation</span></div>
                <p><i aria-hidden="true">Kinder<br />Joy</i><strong>Kinder Joy</strong></p>
                <div className="success-meta">
                  <span><SuccessIcon name="calendar" /><small>Créée le</small><strong>13 mai 2026 à 14 h 30</strong></span>
                  <span><SuccessIcon name="calendar" /><small>Période</small><strong>01/09/2026 → 30/09/2026</strong></span>
                  <span><SuccessIcon name="wallet" /><small>Budget</small><strong>150 000 MAD HT</strong></span>
                </div>
              </div>
            </div>
            <div className="success-stat-grid">
              {summaryStats.map((stat) => <article key={stat.label}><i><SuccessIcon name={stat.icon} /></i><strong>{stat.value}</strong><small>{stat.label}</small></article>)}
            </div>
          </section>

          <aside className="success-next-card success-motion-card">
            <h2>Et maintenant&nbsp;?</h2>
            <nav aria-label="Prochaines étapes">
              {nextSteps.map((step) => <a href={step.href} key={step.title}><i><SuccessIcon name={step.icon} /></i><span><strong>{step.title}</strong><small>{step.copy}</small></span><SuccessIcon name="arrow-right" /></a>)}
            </nav>
          </aside>
        </div>

        <section className="success-ai-banner success-motion-card">
          <i><SuccessIcon name="sparkles" /></i>
          <span><strong>SoMatch AI continue de vous accompagner</strong><small>Besoin d’affiner votre stratégie ou de trouver d’autres talents&nbsp;? Relancez SoMatch AI à tout moment.</small></span>
          <a href="/somatch-ai">Relancer SoMatch AI <SuccessIcon name="sparkles" /></a>
        </section>

        <nav className="success-actions" aria-label="Actions de confirmation">
          <a href="/campagnes"><SuccessIcon name="folder" />Retour à mes campagnes</a>
          <a className="primary" href="/campagnes/back-to-school-2026">Voir ma campagne<SuccessIcon name="arrow-right" /></a>
        </nav>

        <footer className="success-security"><span><SuccessIcon name="lock" />Vos données sont sécurisées et confidentielles.</span><i aria-hidden="true" /><a href="/support">Besoin d’aide&nbsp;? Contactez notre support</a></footer>
      </section>
    </main>
  );
}
