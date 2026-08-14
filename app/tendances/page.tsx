"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";
import { SocialLogo } from "../components/SocialLogo";

type TrendPlatform = "instagram" | "tiktok" | "youtube";

const filters = [
  ["▣", "30 derniers jours"],
  ["◉", "Plateforme"],
  ["⊞", "Catégorie"],
  ["⌾", "Localisation"],
] as const;

const growingCategories = [
  { icon: "♨", name: "Family", value: 68, tone: "peach" },
  { icon: "♙", name: "Food", value: 54, tone: "orange" },
  { icon: "♙", name: "Beauty", value: 41, tone: "pink" },
  { icon: "⌁", name: "Sport & Fitness", value: 33, tone: "rose" },
  { icon: "✈", name: "Travel", value: 27, tone: "blue" },
] as const;

const trendingCreators = [
  { name: "Souhaila Abbad", handle: "@souhailaabbad", growth: "+28,4 K", image: "/explorer/salma.png", platform: "tiktok" },
  { name: "Amine HLS", handle: "@amine.hls", growth: "+19,7 K", image: "/explorer/amine.png", platform: "instagram" },
  { name: "Lina Yahyaoui", handle: "@linayahyaoui", growth: "+17,2 K", image: "/explorer/lina.png", platform: "instagram" },
  { name: "Fatiyass", handle: "@fatiyass.off", growth: "+15,6 K", image: "/explorer/sarah.png", platform: "tiktok" },
  { name: "Lamiae Skalli", handle: "@lamiae.skalli", growth: "+14,1 K", image: "/explorer/nour.png", platform: "instagram" },
] as const;

const platforms = [
  { name: "instagram", label: "Instagram", value: "+18,6 %", variant: 0 },
  { name: "tiktok", label: "TikTok", value: "+24,3 %", variant: 1 },
  { name: "youtube", label: "YouTube", value: "+12,7 %", variant: 2 },
] as const;

const trendContent = [
  { image: "/influencer-collage.png", handle: "@souhailaabbad", category: "Family", views: "2,1 M", likes: "142 K", platform: "instagram", position: "left" },
  { image: "/influencer-collage.png", handle: "@chefamina", category: "Food", views: "1,8 M", likes: "98 K", platform: "instagram", position: "right" },
  { image: "/explorer/salma.png", handle: "@linaeats", category: "Lifestyle", views: "1,6 M", likes: "87 K", platform: "instagram", position: "center" },
  { image: "/explorer/youssef.png", handle: "@youssef.fit", category: "Sport", views: "1,5 M", likes: "74 K", platform: "tiktok", position: "center" },
  { image: "/explorer/amine.png", handle: "@travel.with.anas", category: "Travel", views: "1,2 M", likes: "66 K", platform: "tiktok", position: "center" },
] as const;

const hashtags = [
  ["#maroc", "12,3 M", 100], ["#familytime", "8,7 M", 72], ["#ramadan2026", "7,1 M", 58], ["#foodmorocco", "6,5 M", 53], ["#OOTD", "5,2 M", 42],
] as const;

const popularTopics = [
  ["Retour à l’école", "+145 %"], ["Recettes faciles", "+98 %"], ["Routine sportive", "+76 %"], ["Look du jour", "+61 %"], ["Voyage au Maroc", "+44 %"],
] as const;

const cities = [
  ["Casablanca", 35, 83], ["Rabat", 28, 64], ["Marrakech", 24, 55], ["Tanger", 19, 44], ["Agadir", 16, 35],
] as const;

const topCreators = [
  { name: "Youssef Fit", handle: "@youssef.fit", score: "6,8 %", image: "/explorer/youssef.png", platform: "instagram" },
  { name: "Salma Zahra", handle: "@salmazahra", score: "6,2 %", image: "/explorer/salma.png", platform: "tiktok" },
  { name: "Nour Beauty", handle: "@nour.beauty", score: "5,9 %", image: "/explorer/nour.png", platform: "instagram" },
] as const;

const sparkLines = [
  [
    [1, 36, 10, -34], [11, 44, 12, 24], [23, 39, 13, 20], [36, 34, 12, -4], [48, 35, 11, -45], [59, 45, 12, 35], [71, 37, 11, -56], [82, 51, 10, 31], [92, 46, 9, -7],
  ],
  [
    [1, 28, 10, -45], [11, 39, 12, 32], [23, 31, 12, 27], [35, 24, 11, -20], [46, 28, 11, 42], [57, 18, 12, -47], [69, 29, 11, 47], [80, 18, 11, -45], [91, 29, 9, -33],
  ],
  [
    [1, 24, 11, -6], [12, 25, 11, -19], [23, 29, 12, -18], [35, 33, 12, -26], [47, 39, 12, 31], [59, 32, 11, 19], [70, 28, 12, -29], [82, 35, 11, -20], [93, 40, 8, 7],
  ],
] as const;

function PlatformBadge({ name }: { name: TrendPlatform }) {
  const label = name === "tiktok" ? "TikTok" : name === "youtube" ? "YouTube" : "Instagram";
  return <span className={`trend-platform ${name}`} role="img" aria-label={label}><SocialLogo network={name} /></span>;
}

function SectionHeading({ title, info = false }: { title: string; info?: boolean }) {
  return <div className="trend-section-heading"><h2>{title} {info ? <i>ⓘ</i> : null}</h2><button type="button" aria-label={`Voir tout : ${title}`}>Voir tout&nbsp; →</button></div>;
}

function Sparkline({ variant }: { variant: number }) {
  return <div className="trend-sparkline" aria-hidden="true">{sparkLines[variant].map(([left,bottom,width,angle], index) => <i key={`${left}-${index}`} style={{ left: `${left}%`, bottom: `${bottom}%`, width: `${width}%`, transform: `rotate(${angle}deg)` }} />)}</div>;
}

export default function Trends() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [advanced, setAdvanced] = useState(false);
  const [showInsight, setShowInsight] = useState(true);
  const [activeCountry, setActiveCountry] = useState("Maroc");

  function toggleFilter(label: string) {
    setActiveFilters((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  }

  return (
    <main className="dashboard-page trends-page">
      <AppSidebar active="tendances" />
      <section className="dashboard-main trends-main">
        <header className="trends-header">
          <div><h1>Tendances</h1><p>Analysez ce qui performe en ce moment dans l’influence.</p></div>
          <div className="trends-header-actions">
            <label><i>⌕</i><input aria-label="Rechercher" placeholder="Rechercher un créateur, une catégorie…" /></label>
            <NotificationTrigger className="trends-notification" />
            <button type="button" className="trends-profile" aria-label="Menu utilisateur"><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><span>⌄</span></button>
          </div>
        </header>

        <section className="trends-filterbar">
          <div>{filters.map(([icon,label]) => <button type="button" aria-pressed={activeFilters.includes(label)} className={activeFilters.includes(label) ? "selected" : ""} onClick={() => toggleFilter(label)} key={label}><i>{icon}</i><span>{label}</span><b>⌄</b></button>)}</div>
          <button type="button" aria-expanded={advanced} className={`trends-advanced ${advanced ? "selected" : ""}`} onClick={() => setAdvanced((value) => !value)}>☷ &nbsp; Filtres avancés</button>
        </section>
        {advanced ? <div className="trends-advanced-panel"><span>Croissance rapide</span><span>Audience certifiée</span><span>Contenu récent</span><button type="button" onClick={() => setAdvanced(false)}>Appliquer</button></div> : null}

        {showInsight ? (
          <section className="trends-ai-insight trend-hover-card">
            <i className="insight-mark">✦</i>
            <div><h2>Insight SoMatch AI <span>Nouveau</span></h2><p>Les contenus Family et Food connaissent une forte progression ce mois-ci au Maroc.<br />Les créateurs micro sur TikTok génèrent deux fois plus d’engagement en moyenne.</p></div>
            <button type="button" className="trends-gradient-cta">Voir l’analyse complète&nbsp; →</button>
            <button type="button" className="dismiss-insight" onClick={() => setShowInsight(false)} aria-label="Fermer l’insight">×</button>
          </section>
        ) : <button type="button" className="restore-insight" onClick={() => setShowInsight(true)}>✦ Afficher l’insight SoMatch AI</button>}

        <section className="trends-top-grid">
          <article className="trend-card growing-card trend-hover-card">
            <SectionHeading title="Catégories en croissance" info />
            <div className="growing-list">{growingCategories.map((item,index) => <div key={item.name}><b>{index + 1}</b><i className={item.tone}>{item.icon}</i><span>{item.name}</span><strong>↗ {item.value} %</strong><em><i style={{ width: `${item.value}%` }} /></em></div>)}</div>
            <small>Par rapport aux 30 jours précédents</small>
          </article>

          <article className="trend-card creators-trending-card trend-hover-card">
            <SectionHeading title="Créateurs en tendance" />
            <div className="trending-creators-list">{trendingCreators.map((creator) => <a href="/influenceur/maya-el-amrani" key={creator.name}><img src={creator.image} alt={creator.name} /><PlatformBadge name={creator.platform} /><span className="trending-creator-copy"><strong>{creator.name}</strong><small>{creator.handle}</small></span><b>{creator.growth} <i>↑</i><small>Nouveaux abonnés</small></b></a>)}</div>
          </article>

          <article className="trend-card platform-performance-card trend-hover-card">
            <SectionHeading title="Performances par plateforme" info />
            <div className="platform-performance-list">{platforms.map((platform) => <div key={platform.name}><PlatformBadge name={platform.name} /><span><strong>{platform.label}</strong><b>{platform.value}</b><small>Engagement moyen</small></span><Sparkline variant={platform.variant} /></div>)}</div>
          </article>
        </section>

        <section className="trends-middle-grid">
          <article className="trend-card trending-content-card trend-hover-card">
            <SectionHeading title="Contenus en tendance" />
            <div className="trending-content-list">{trendContent.map((content) => <article key={content.handle}><div className="trend-content-visual"><img src={content.image} alt={content.category} style={{ objectPosition: content.position }} /><PlatformBadge name={content.platform} /><span>▶ {content.views}</span><span>♡ {content.likes}</span></div><a href="/influenceur/maya-el-amrani">{content.handle}</a><p>{content.category}</p></article>)}</div>
          </article>

          <article className="trend-card hashtag-card trend-hover-card">
            <SectionHeading title="Top hashtags" info />
            <div className="hashtag-list">{hashtags.map(([tag,value,width]) => <div key={tag}><strong>{tag}</strong><i><b style={{ width: `${width}%` }} /></i><span>{value}</span></div>)}</div>
          </article>

          <article className="trend-card topics-card trend-hover-card">
            <SectionHeading title="Sujets populaires" info />
            <div className="topics-list">{popularTopics.map(([topic,growth]) => <div key={topic}><strong>{topic}</strong><span>↑ {growth} ✣</span></div>)}</div>
          </article>
        </section>

        <section className="trends-bottom-grid">
          <article className="trend-card location-card trend-hover-card">
            <div className="trend-section-heading"><h2>Tendances par localisation&nbsp; ⓘ</h2></div>
            <nav role="tablist" aria-label="Pays">{["Maroc","France","Algérie","Égypte","Autres"].map((country) => <button type="button" role="tab" aria-selected={activeCountry === country} className={activeCountry === country ? "active" : ""} onClick={() => setActiveCountry(country)} key={country}>{country}</button>)}</nav>
            <div className="city-list">{cities.map(([city,growth,width]) => <div key={city}><strong>{city}</strong><i><b style={{ width: `${width}%` }} /></i><span>↑ {growth} %</span></div>)}</div>
          </article>

          <article className="trend-card heatmap-card trend-hover-card">
            <div className="trend-section-heading"><h2>Carte de chaleur – Maroc&nbsp; ⓘ</h2></div>
            <div className="morocco-map" aria-label="Carte de chaleur du Maroc"><i className="heat heat-tanger" /><i className="heat heat-rabat" /><i className="heat heat-casa" /><i className="heat heat-marrakech" /><i className="heat heat-agadir" /><span className="label-tanger">Tanger</span><span className="label-rabat">Rabat</span><span className="label-casa">Casablanca</span><span className="label-marrakech">Marrakech</span><span className="label-agadir">Agadir</span></div>
            <div className="heat-legend"><span>Faible</span><i /><span>Élevé</span></div>
          </article>

          <article className="trend-card top-engagement-card trend-hover-card">
            <SectionHeading title="Meilleurs créateurs par engagement" info />
            <div className="top-engagement-list">{topCreators.map((creator,index) => <a href="/influenceur/maya-el-amrani" key={creator.name}><b>{index + 1}</b><img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.handle}</small></span><em>{creator.score}<small>engagement</small></em><PlatformBadge name={creator.platform} /></a>)}</div>
          </article>
        </section>
      </section>
    </main>
  );
}
