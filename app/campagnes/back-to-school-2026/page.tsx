"use client";

import { useState } from "react";
import { AppSidebar } from "../../components/AppShell";

const tabs = [
  ["▱", "Aperçu"], ["♧", "Casting"], ["⬡", "Brief & stratégie"],
  ["▣", "Budget"], ["▦", "Planning"], ["▤", "Notes"],
] as const;

const performances = [
  { icon: "◉", label: "Couverture estimée", value: "2.4M – 3.1M", detail: "comptes uniques", tone: "violet" },
  { icon: "▷", label: "Vues estimées", value: "3.5M – 4.7M", detail: "toutes plateformes", tone: "pink" },
  { icon: "♡", label: "Engagement moyen", value: "4.8% – 6.2%", detail: "taux d’engagement", tone: "orange" },
  { icon: "♧", label: "Participants concours", value: "8K – 12K", detail: "participations estimées", tone: "green" },
  { icon: "▥", label: "EMV estimée", value: "220K – 280K", detail: "valeur médiatique", tone: "purple" },
] as const;

const creators = [
  { name: "Hafsa Achraf", niche: "Lifestyle · Méga", image: "/explorer/maya.png", role: "Émouvoir", roleTone: "pink", followers: "1.4M", score: 92, match: "Excellent match", budget: "22 000 MAD" },
  { name: "Amine HLS", niche: "Family · Méga", image: "/explorer/amine.png", role: "Inspirer", roleTone: "purple", followers: "717K", score: 89, match: "Très bon match", budget: "21 000 MAD" },
  { name: "Sofia HLS", niche: "Family · Méga", image: "/explorer/sarah.png", role: "Inspirer", roleTone: "purple", followers: "667K", score: 88, match: "Très bon match", budget: "20 000 MAD" },
  { name: "Souhaila Abbad", niche: "Lifestyle · Macro", image: "/explorer/salma.png", role: "Rassembler", roleTone: "orange", followers: "176K", score: 85, match: "Bon match", budget: "15 000 MAD" },
  { name: "Sara Moudden", niche: "Beauty · Macro", image: "/explorer/nour.png", role: "Rassembler", roleTone: "orange", followers: "103K", score: 82, match: "Bon match", budget: "13 000 MAD" },
] as const;

const formats = [
  ["▤", "Reels", "1 reel par créateur", "5"],
  ["▯", "Stories", "3 à 5 stories par créateur", "15 – 25"],
  ["◩", "UGC", "Contenus communautaires", "5+"],
  ["♙", "Unboxing", "Focus produit & box", "5"],
] as const;

const objectives = [
  "Créer de l’émotion autour de la rentrée scolaire",
  "Inspirer les parents avec des idées pratiques et joyeuses",
  "Renforcer la proximité de Kinder Joy avec les familles",
  "Générer de l’engagement et des participations au concours",
  "Booster la visibilité et la notoriété de la marque",
] as const;

function CampaignVisual() {
  return <div className="campaign-detail-visual" aria-label="Visuel de la campagne Kinder Joy Back to School"><div className="campaign-kinder"><strong>Kinder</strong><b>JOY</b></div><div className="campaign-bag"><i /><b /><span /></div><div className="campaign-books"><i /><i /><i /></div><div className="campaign-pencils"><i /><i /><i /><i /></div></div>;
}

function Socials() {
  return <span className="campaign-socials" aria-label="Instagram, TikTok et YouTube"><i>◎</i><i>♪</i><i>▶</i></span>;
}

export default function CampaignDetailPage() {
  const [activeTab, setActiveTab] = useState("Aperçu");
  const [duplicated, setDuplicated] = useState(false);
  const [noteAdded, setNoteAdded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return <main className="dashboard-page campaign-detail-page">
    <AppSidebar active="mes campagnes" />
    <section className="campaign-detail-main">
      <header className="campaign-detail-toolbar">
        <a href="/campagnes">←　Retour à mes campagnes</a>
        <div><a href="/campagnes/creer">⌕　Modifier la campagne</a><button type="button" onClick={() => setDuplicated(true)}>{duplicated ? "Dupliquée ✓" : "▣　Dupliquer"}</button><button className="more" type="button" aria-label="Plus d’actions" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>•••</button>{menuOpen && <nav className="campaign-more-menu"><button type="button">Archiver</button><button type="button">Exporter</button></nav>}</div>
      </header>

      <section className="campaign-overview-card campaign-hover-card">
        <CampaignVisual />
        <div className="campaign-overview-copy">
          <div className="campaign-title-row"><h1>Back to School 2026</h1><span>●　En préparation</span></div>
          <p className="campaign-detail-brand"><i>Kinder<br />Joy</i><strong>Kinder Joy</strong></p>
          <div className="campaign-main-meta"><span><i>▦</i><small>Période</small><strong>01/09/2026 → 30/09/2026</strong></span><span><i>▱</i><small>Budget</small><strong>150 000 MAD HT</strong><em>180 000 MAD TTC</em></span><span><i>▦</i><small>Créée le</small><strong>13 mai 2026 à 14:30</strong><em>par sara benali</em></span></div>
        </div>
      </section>

      <nav className="campaign-detail-tabs" aria-label="Sections de la campagne">{tabs.map(([icon, label]) => <button className={activeTab === label ? "active" : ""} type="button" onClick={() => setActiveTab(label)} key={label}><i>{icon}</i>{label}</button>)}</nav>

      {activeTab !== "Aperçu" && <section className="campaign-tab-placeholder campaign-hover-card"><i>{tabs.find(([, label]) => label === activeTab)?.[0]}</i><div><h2>{activeTab}</h2><p>Cette vue statique est prête à recevoir les prochains écrans de pilotage.</p></div><button type="button" onClick={() => setActiveTab("Aperçu")}>Revenir à l’aperçu</button></section>}

      {activeTab === "Aperçu" && <div className="campaign-detail-grid">
        <div className="campaign-detail-primary">
          <section className="campaign-panel campaign-performance-panel"><h2>Performance attendue (estimations)　ⓘ</h2><div>{performances.map(item => <article className="campaign-hover-card" key={item.label}><i className={item.tone}>{item.icon}</i><small>{item.label}</small><strong>{item.value}</strong><em>{item.detail}</em></article>)}</div></section>

          <section className="campaign-panel campaign-casting-panel"><header><h2>Casting sélectionné (5 influenceurs)　ⓘ</h2><a href="/comparer">⌖　Voir tout le casting</a></header><div className="campaign-casting-head"><span>Influenceur</span><span>Rôle</span><span>Plateformes</span><span>Followers</span><span>Somatch Score</span><span>Budget estimé</span><span>Statut</span><span /></div>{creators.map(creator => <article className="campaign-creator-row" key={creator.name}><span className="campaign-creator"><img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.niche}</small></span></span><em className={`campaign-role ${creator.roleTone}`}>{creator.role === "Émouvoir" ? "♥" : creator.role === "Inspirer" ? "♙" : "♧"}　{creator.role}</em><Socials /><strong>{creator.followers}</strong><span className="campaign-score"><i>{creator.score}</i><small>{creator.match}</small></span><strong>{creator.budget}</strong><em className="campaign-status">Sélectionné</em><button type="button" aria-label={`Actions pour ${creator.name}`}>⋮</button></article>)}</section>

          <div className="campaign-lower-grid">
            <section className="campaign-panel campaign-calendar-panel campaign-hover-card"><h2>Calendrier de la campagne</h2><div className="campaign-timeline"><span><strong>S1</strong><small>1–7 sept.</small><i /></span><span><strong>S2 – S3</strong><small>8–21 sept.</small><i /></span><span><strong>S4</strong><small>22–30 sept.</small><i /></span></div><div className="campaign-timeline-labels"><span>Unboxing &<br />Teasing</span><span>Concours &<br />Engagement</span><span>Amplification &<br />Clôture</span></div><a href="#planning" onClick={() => setActiveTab("Planning")}>Voir le planning détaillé　›</a></section>
            <section className="campaign-panel campaign-objectives campaign-hover-card"><h2>Objectifs de la campagne</h2><ul>{objectives.map(item => <li key={item}>{item}</li>)}</ul></section>
          </div>
        </div>

        <aside className="campaign-detail-aside">
          <section className="campaign-panel campaign-budget-card campaign-hover-card"><h2>Répartition du budget</h2><div className="campaign-budget-content"><div className="campaign-budget-donut" /><ul><li><i />Créateurs<strong>108 000 MAD (72%)</strong></li><li><i />Production<strong>24 000 MAD (16%)</strong></li><li><i />Gestion & coordination<strong>18 000 MAD (12%)</strong></li></ul></div><footer><span>Budget total</span><strong>150 000 MAD HT</strong></footer></section>
          <section className="campaign-panel campaign-formats campaign-hover-card"><h2>Formats prévus</h2>{formats.map(([icon, title, copy, value]) => <article key={title}><i>{icon}</i><span><strong>{title}</strong><small>{copy}</small></span><b>{value}</b></article>)}</section>
          <section className="campaign-panel campaign-insight campaign-hover-card"><h2><i>✣</i> Insight somatch AI　✨</h2><p>Votre casting est très cohérent avec vos objectifs. Pour renforcer la couverture auprès des parents 30–40 ans, nous vous recommandons d’ajouter <strong>1 profil Micro</strong> spécialisé Lifestyle/Parenting.</p><a href="/somatch-ai/recommandation">Voir les recommandations　→</a></section>
          <section className="campaign-panel campaign-notes campaign-hover-card"><header><h2>Notes internes</h2><button type="button" onClick={() => setNoteAdded(true)}>{noteAdded ? "Note ajoutée ✓" : "＋ Ajouter une note"}</button></header><article><i>▣</i><span><strong>{noteAdded ? "Préparer le point de suivi" : "Brief validé par l’équipe marketing"}</strong><small>{noteAdded ? "13/05/2026 · sara benali" : "12/05/2026 · sara benali"}</small></span><b>⋮</b></article><article><i>▣</i><span><strong>Guidelines créateurs reçues</strong><small>14/05/2026 · sara benali</small></span><b>⋮</b></article></section>
        </aside>
      </div>}
    </section>
  </main>;
}
