"use client";

import { AppSidebar } from "../../../components/AppShell";

const nextSteps = [
  { icon:"▣", title:"Découvrir votre campagne", copy:"Accédez au détail de votre campagne pour voir les influenceurs, le planning et toutes les recommandations.", href:"/campagnes/back-to-school-2026" },
  { icon:"♧", title:"Inviter votre équipe", copy:"Collaborez avec votre équipe sur cette campagne en temps réel.", href:"/profil" },
  { icon:"♙", title:"Ajuster votre casting", copy:"Modifiez, remplacez ou ajoutez des créateurs selon vos besoins.", href:"/campagnes/creer/casting" },
  { icon:"⇩", title:"Exporter votre recommandation", copy:"Téléchargez votre recommandation complète en PDF.", href:"/somatch-ai/recommandation" },
] as const;

const summaryStats = [
  ["♧","5","Influenceurs|sélectionnés"],
  ["♧","3","Rôles d’influence|définis"],
  ["▷","3","Formats de contenu|recommandés"],
  ["◎","20","KPIs clés|définis"],
] as const;

function CampaignVisual() {
  return <div className="success-campaign-visual" aria-label="Visuel de la campagne Kinder Joy Back to School"><div className="kinder-copy"><strong>Kinder</strong><b>JOY</b></div><div className="success-backpack"><i/><b/><span/></div><div className="success-books"><i/><i/><i/></div><div className="success-pencils"><i/><i/><i/><i/></div></div>;
}

export default function CampaignSuccessPage() {
  return <main className="dashboard-page campaign-success-page">
    <AppSidebar active="mes campagnes" />
    <section className="campaign-success-main">
      <header className="success-hero"><div className="success-confetti" aria-hidden="true">{["◆","⌁","▰","⌁","◆","▰","⌁","◆","▰"].map((piece,index)=><i key={index}>{piece}</i>)}</div><div className="success-check">✓</div><h1>Campagne créée avec <span>succès !</span></h1><p>Votre campagne a été créée et est prête à être pilotée.</p></header>
      <div className="success-content-grid">
        <section className="success-campaign-card success-motion-card"><div className="success-campaign-overview"><CampaignVisual/><div className="success-campaign-copy"><div className="success-title-line"><h2>Back to School 2026</h2><span>●　En préparation</span></div><p><i>Kinder<br/>Joy</i><strong>Kinder Joy</strong></p><div className="success-meta"><span><i>▣</i><small>Créée le</small><strong>13 mai 2026 à 14:30</strong></span><span><i>▣</i><small>Période</small><strong>01/09/2026 → 30/09/2026</strong></span><span><i>▱</i><small>Budget</small><strong>150 000 MAD HT</strong></span></div></div></div><div className="success-stat-grid">{summaryStats.map(([icon,value,label])=><article key={label}><i>{icon}</i><strong>{value}</strong><span>{label.split("|").map(line=><small key={line}>{line}</small>)}</span></article>)}</div></section>
        <aside className="success-next-card success-motion-card"><h2>Et maintenant ?</h2><nav>{nextSteps.map(step=><a href={step.href} key={step.title}><i>{step.icon}</i><span><strong>{step.title}</strong><small>{step.copy}</small></span><b>›</b></a>)}</nav></aside>
      </div>
      <section className="success-ai-banner success-motion-card"><i>✣</i><span><strong>somatch AI continue de vous accompagner</strong><small>Besoin d’affiner votre stratégie ou de trouver d’autres talents ? Relancez somatch AI à tout moment.</small></span><a href="/somatch-ai">Relancer somatch AI　✣</a></section>
      <nav className="success-actions"><a href="/campagnes">▱　Retour à mes campagnes</a><a className="primary" href="/campagnes/back-to-school-2026">Voir ma campagne　→</a></nav>
      <footer className="success-security">♙　Vos données sont sécurisées et confidentielles.　　│　　Besoin d’aide ? Contactez notre support</footer>
    </section>
  </main>;
}
