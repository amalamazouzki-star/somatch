"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";

const filters = [
  ["▣", "30 derniers jours"],
  ["◉", "plateforme"],
  ["⊞", "catégorie"],
  ["⌾", "localisation"],
] as const;

const growingCategories = [
  { icon: "♨", name: "Family", value: 68, tone: "peach" },
  { icon: "♙", name: "Food", value: 54, tone: "orange" },
  { icon: "♙", name: "Beauty", value: 41, tone: "pink" },
  { icon: "⌁", name: "Sport & Fitness", value: 33, tone: "rose" },
  { icon: "✈", name: "Travel", value: 27, tone: "blue" },
] as const;

const trendingCreators = [
  { name: "souhaila abbad", handle: "@souhailaabbad", growth: "+28.4K", image: "/explorer/salma.png", platform: "tiktok" },
  { name: "amine hls", handle: "@amine.hls", growth: "+19.7K", image: "/explorer/amine.png", platform: "instagram" },
  { name: "lina yahyaoui", handle: "@linayahyaoui", growth: "+17.2K", image: "/explorer/lina.png", platform: "instagram" },
  { name: "fatiyass", handle: "@fatiyass.off", growth: "+15.6K", image: "/explorer/sarah.png", platform: "tiktok" },
  { name: "lamiae skalli", handle: "@lamiae.skalli", growth: "+14.1K", image: "/explorer/nour.png", platform: "instagram" },
] as const;

const platforms = [
  { name: "instagram", value: "+18,6%", variant: 0 },
  { name: "tiktok", value: "+24,3%", variant: 1 },
  { name: "youtube", value: "+12,7%", variant: 2 },
] as const;

const trendContent = [
  { image: "/influencer-collage.png", handle: "@souhailaabbad", category: "Family", views: "2,1M", likes: "142K", platform: "instagram", position: "left" },
  { image: "/influencer-collage.png", handle: "@chefamina", category: "Food", views: "1,8M", likes: "98K", platform: "instagram", position: "right" },
  { image: "/explorer/salma.png", handle: "@linaeats", category: "Lifestyle", views: "1,6M", likes: "87K", platform: "instagram", position: "center" },
  { image: "/explorer/youssef.png", handle: "@youssef.fit", category: "Sport", views: "1,5M", likes: "74K", platform: "tiktok", position: "center" },
  { image: "/explorer/amine.png", handle: "@travel.with.anas", category: "Travel", views: "1,2M", likes: "66K", platform: "tiktok", position: "center" },
] as const;

const hashtags = [
  ["#maroc", "12.3M", 100], ["#familytime", "8.7M", 72], ["#ramadan2026", "7.1M", 58], ["#foodmorocco", "6.5M", 53], ["#OOTD", "5.2M", 42],
] as const;

const popularTopics = [
  ["retour à l’école", "+145%"], ["recettes faciles", "+98%"], ["routine sportive", "+76%"], ["look du jour", "+61%"], ["voyage au maroc", "+44%"],
] as const;

const cities = [
  ["casablanca", 35, 83], ["rabat", 28, 64], ["marrakech", 24, 55], ["tanger", 19, 44], ["agadir", 16, 35],
] as const;

const topCreators = [
  { name: "youssef fit", handle: "@youssef.fit", score: "6,8%", image: "/explorer/youssef.png", platform: "instagram" },
  { name: "salma zahra", handle: "@salmazahra", score: "6,2%", image: "/explorer/salma.png", platform: "tiktok" },
  { name: "nour beauty", handle: "@nour.beauty", score: "5,9%", image: "/explorer/nour.png", platform: "instagram" },
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

function PlatformBadge({ name }: { name: string }) {
  return <span className={`trend-platform ${name}`} aria-label={name}>{name === "tiktok" ? "♪" : name === "youtube" ? "▶" : ""}</span>;
}

function SectionHeading({ title, info = false }: { title: string; info?: boolean }) {
  return <div className="trend-section-heading"><h2>{title} {info ? <i>ⓘ</i> : null}</h2><button type="button">voir tout&nbsp; →</button></div>;
}

function Sparkline({ variant }: { variant: number }) {
  return <div className="trend-sparkline" aria-hidden="true">{sparkLines[variant].map(([left,bottom,width,angle], index) => <i key={`${left}-${index}`} style={{ left: `${left}%`, bottom: `${bottom}%`, width: `${width}%`, transform: `rotate(${angle}deg)` }} />)}</div>;
}

export default function Trends() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [advanced, setAdvanced] = useState(false);
  const [showInsight, setShowInsight] = useState(true);

  function toggleFilter(label: string) {
    setActiveFilters((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  }

  return (
    <main className="dashboard-page trends-page">
      <AppSidebar active="tendances" />
      <section className="dashboard-main trends-main">
        <header className="trends-header">
          <div><h1>tendances</h1><p>analysez ce qui performe en ce moment dans l’influence.</p></div>
          <div className="trends-header-actions">
            <label><i>⌕</i><input aria-label="Rechercher" placeholder="rechercher un créateur, une catégorie..." /></label>
            <NotificationTrigger className="trends-notification" />
            <button type="button" className="trends-profile" aria-label="Menu utilisateur"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button>
          </div>
        </header>

        <section className="trends-filterbar">
          <div>{filters.map(([icon,label]) => <button type="button" className={activeFilters.includes(label) ? "selected" : ""} onClick={() => toggleFilter(label)} key={label}><i>{icon}</i><span>{label}</span><b>⌄</b></button>)}</div>
          <button type="button" className={`trends-advanced ${advanced ? "selected" : ""}`} onClick={() => setAdvanced((value) => !value)}>☷ &nbsp; filtres avancés</button>
        </section>
        {advanced ? <div className="trends-advanced-panel"><span>croissance rapide</span><span>audience certifiée</span><span>contenu récent</span><button type="button" onClick={() => setAdvanced(false)}>appliquer</button></div> : null}

        {showInsight ? (
          <section className="trends-ai-insight trend-hover-card">
            <i className="insight-mark">✦</i>
            <div><h2>insight somatch AI <span>nouveau</span></h2><p>le contenu Family et Food connait une forte progression ce mois-ci au Maroc.<br />les créateurs Micro sur TikTok génèrent 2x plus d’engagement en moyenne.</p></div>
            <button type="button" className="trends-gradient-cta">voir l’analyse complète&nbsp; →</button>
            <button type="button" className="dismiss-insight" onClick={() => setShowInsight(false)} aria-label="Fermer l’insight">×</button>
          </section>
        ) : <button type="button" className="restore-insight" onClick={() => setShowInsight(true)}>✦ afficher l’insight somatch AI</button>}

        <section className="trends-top-grid">
          <article className="trend-card growing-card trend-hover-card">
            <SectionHeading title="catégories en croissance" info />
            <div className="growing-list">{growingCategories.map((item,index) => <div key={item.name}><b>{index + 1}</b><i className={item.tone}>{item.icon}</i><span>{item.name}</span><strong>↗{item.value}%</strong><em><i style={{ width: `${item.value}%` }} /></em></div>)}</div>
            <small>vs 30 derniers jours précédents</small>
          </article>

          <article className="trend-card creators-trending-card trend-hover-card">
            <SectionHeading title="créateurs en tendance" />
            <div className="trending-creators-list">{trendingCreators.map((creator) => <a href="/influenceur/maya-el-amrani" key={creator.name}><img src={creator.image} alt={creator.name} /><PlatformBadge name={creator.platform} /><span className="trending-creator-copy"><strong>{creator.name}</strong><small>{creator.handle}</small></span><b>{creator.growth} <i>↑</i><small>nouveaux abonnés</small></b></a>)}</div>
          </article>

          <article className="trend-card platform-performance-card trend-hover-card">
            <SectionHeading title="performances par plateforme" info />
            <div className="platform-performance-list">{platforms.map((platform) => <div key={platform.name}><PlatformBadge name={platform.name} /><span><strong>{platform.name}</strong><b>{platform.value}</b><small>engagement moyen</small></span><Sparkline variant={platform.variant} /></div>)}</div>
          </article>
        </section>

        <section className="trends-middle-grid">
          <article className="trend-card trending-content-card trend-hover-card">
            <SectionHeading title="contenus en tendance" />
            <div className="trending-content-list">{trendContent.map((content) => <article key={content.handle}><div className="trend-content-visual"><img src={content.image} alt={content.category} style={{ objectPosition: content.position }} /><PlatformBadge name={content.platform} /><span>▶ {content.views}</span><span>♡ {content.likes}</span></div><a href="/influenceur/maya-el-amrani">{content.handle}</a><p>{content.category}</p></article>)}</div>
          </article>

          <article className="trend-card hashtag-card trend-hover-card">
            <SectionHeading title="top hashtags" info />
            <div className="hashtag-list">{hashtags.map(([tag,value,width]) => <div key={tag}><strong>{tag}</strong><i><b style={{ width: `${width}%` }} /></i><span>{value}</span></div>)}</div>
          </article>

          <article className="trend-card topics-card trend-hover-card">
            <SectionHeading title="sujets populaires" info />
            <div className="topics-list">{popularTopics.map(([topic,growth]) => <div key={topic}><strong>{topic}</strong><span>↑ {growth} ✣</span></div>)}</div>
          </article>
        </section>

        <section className="trends-bottom-grid">
          <article className="trend-card location-card trend-hover-card">
            <div className="trend-section-heading"><h2>tendances par localisation&nbsp; ⓘ</h2></div>
            <nav>{["maroc","france","algérie","egypte","autres"].map((country,index) => <button type="button" className={index === 0 ? "active" : ""} key={country}>{country}</button>)}</nav>
            <div className="city-list">{cities.map(([city,growth,width]) => <div key={city}><strong>{city}</strong><i><b style={{ width: `${width}%` }} /></i><span>↑{growth}%⌁</span></div>)}</div>
          </article>

          <article className="trend-card heatmap-card trend-hover-card">
            <div className="trend-section-heading"><h2>carte de chaleur – maroc&nbsp; ⓘ</h2></div>
            <div className="morocco-map" aria-label="Carte de chaleur du Maroc"><i className="heat heat-tanger" /><i className="heat heat-rabat" /><i className="heat heat-casa" /><i className="heat heat-marrakech" /><i className="heat heat-agadir" /><span className="label-tanger">tanger</span><span className="label-rabat">rabat</span><span className="label-casa">casablanca</span><span className="label-marrakech">marrakech</span><span className="label-agadir">agadir</span></div>
            <div className="heat-legend"><span>faible</span><i /><span>élevé</span></div>
          </article>

          <article className="trend-card top-engagement-card trend-hover-card">
            <SectionHeading title="meilleurs créateurs par engagement" info />
            <div className="top-engagement-list">{topCreators.map((creator,index) => <a href="/influenceur/maya-el-amrani" key={creator.name}><b>{index + 1}</b><img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.handle}</small></span><em>{creator.score}<small>engagement</small></em><PlatformBadge name={creator.platform} /></a>)}</div>
          </article>
        </section>
      </section>
    </main>
  );
}
