"use client";

import { FormEvent, useState } from "react";
import { AppHeader, AppSidebar } from "../components/AppShell";
import { InfluencerProfileLink } from "../components/InfluencerProfileLink";

const creators = [
  { name: "Maya El Amrani", handle: "@mayaelamrani", niche: "Beauty · Lifestyle", image: "/dashboard/maya.png", platforms: ["instagram", "tiktok"], followers: "256K", engagement: "4,8%", score: 92 },
  { name: "Salma Zahra", handle: "@salmazahra", niche: "Lifestyle · Mode", image: "/dashboard/salma.png", platforms: ["instagram", "tiktok", "youtube"], followers: "198K", engagement: "5,6%", score: 82 },
  { name: "Nour Beauty", handle: "@nour.beauty", niche: "Beauty · Skincare", image: "/dashboard/nour.png", platforms: ["instagram", "tiktok"], followers: "142K", engagement: "6,2%", score: 88 },
  { name: "Youssef Fit", handle: "@youssef.fit", niche: "Sport · Fitness", image: "/dashboard/youssef.png", platforms: ["instagram", "tiktok", "youtube"], followers: "310K", engagement: "3,9%", score: 87 },
  { name: "Lina Eats", handle: "@linaeats", niche: "Food · Lifestyle", image: "/dashboard/lina.png", platforms: ["instagram", "tiktok"], followers: "178K", engagement: "5,1%", score: 86 },
];

const trends = [
  { icon: "♙", title: "Skincare", detail: "Catégorie en forte croissance", growth: "28%", tone: "pink" },
  { icon: "♪", title: "TikTok", detail: "Réseau tendance", growth: "34%", tone: "black" },
  { icon: "●", title: "Maroc", detail: "Localisation populaire", growth: "22%", tone: "green" },
];

function PlatformBadge({ name }: { name: string }) {
  return (
    <span className={`platform-badge ${name}`} aria-label={name} role="img">
      {name === "instagram" && <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="4" /><circle cx="12" cy="12" r="3.2" /><circle className="instagram-dot" cx="16.8" cy="7.4" r="1" /></svg>}
      {name === "tiktok" && <svg viewBox="0 0 24 24" aria-hidden="true"><path className="tiktok-cyan" d="M14.3 4.2v10.1a4 4 0 1 1-3.2-3.9v2.5a1.7 1.7 0 1 0 .8 1.4V3.5h2.4c.4 2.1 1.7 3.3 3.8 3.8v2.4a7.3 7.3 0 0 1-3.8-1.5Z" /><path className="tiktok-red" d="M15.2 3.6v10.1a4 4 0 1 1-3.2-3.9v2.5a1.7 1.7 0 1 0 .8 1.4V2.9h2.4c.4 2.1 1.7 3.3 3.8 3.8v2.4a7.3 7.3 0 0 1-3.8-1.5Z" /><path className="tiktok-white" d="M14.7 3.9V14a4 4 0 1 1-3.2-3.9v2.5a1.7 1.7 0 1 0 .8 1.4V3.2h2.4c.4 2.1 1.7 3.3 3.8 3.8v2.4a7.3 7.3 0 0 1-3.8-1.5Z" /></svg>}
      {name === "youtube" && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8.2a3 3 0 0 0-2.1-2.1C17 5.6 12 5.6 12 5.6s-5 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 2.6 12c0 1.3.1 2.6.4 3.8a3 3 0 0 0 2.1 2.1c1.9.5 6.9.5 6.9.5s5 0 6.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8Z" /><path className="youtube-play" d="m10 15.2 5.2-3.2L10 8.8v6.4Z" /></svg>}
    </span>
  );
}

function CreatorCard({ creator, favorite, toggle }: { creator: typeof creators[number]; favorite: boolean; toggle: () => void }) {
  return (
    <article className="creator-card influencer-card-target">
      <InfluencerProfileLink name={creator.name} />
      <div className="creator-card-top influencer-card-controls">
        <img src={creator.image} alt={creator.name} />
        <button type="button" className={`heart-button ${favorite ? "is-favorite" : ""}`} onClick={toggle} aria-label={`Ajouter ${creator.name} aux favoris`}>♡</button>
      </div>
      <h3>{creator.name}</h3>
      <p className="creator-handle">{creator.handle}</p>
      <p className="creator-niche">{creator.niche}</p>
      <div className="creator-platforms">{creator.platforms.map((platform) => <PlatformBadge key={platform} name={platform} />)}</div>
      <div className="creator-metrics">
        <strong>{creator.followers}<small>Abonnés</small></strong>
        <strong>{creator.engagement}<small>Engagement</small></strong>
      </div>
      <div className="creator-score"><b>{creator.score}/100</b><span>SoMatch Score</span></div>
    </article>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);

  function launchAi(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearching(true);
    window.setTimeout(() => setSearching(false), 900);
  }

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  return (
    <main className="dashboard-page">
      <AppSidebar active="accueil" />

      <section className="dashboard-main">
        <AppHeader title="Bonjour, Sara 👋" subtitle="Découvrez, analysez et collaborez avec les meilleurs créateurs." />

        <div className="dashboard-columns">
          <div className="dashboard-center">
            <section className="ai-search-card">
              <i className="sparkle sparkle-one">✦</i><i className="sparkle sparkle-two">✦</i>
              <h2>Que recherchez-vous <span>aujourd’hui ?</span></h2>
              <p>SoMatch AI est là pour vous aider à trouver le match parfait.</p>
              <form onSubmit={launchAi}>
                <b>✧</b>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. : Je lance une campagne skincare au Maroc pour toucher les femmes de 18-34 ans…" aria-label="Votre recherche SoMatch AI" />
                <button type="submit">{searching ? "Recherche…" : "Lancer SoMatch AI"} <span>✦</span></button>
              </form>
              <div className="popular-suggestions"><strong>Suggestions populaires :</strong>
                {["Skincare au Maroc", "8 créatrices lifestyle", "Campagne Ramadan", "Food TikTok", "Sport & fitness"].map((suggestion) => <button type="button" key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>)}
                <button type="button" className="next-suggestion">›</button>
              </div>
            </section>

            <section className="recommendations-section">
              <div className="section-heading"><div><h2>Recommandations pour vous</h2><p>Des profils sélectionnés par SoMatch AI selon vos intérêts.</p></div><button type="button">Voir tout →</button></div>
              <div className="creator-grid">
                {creators.map((creator) => <CreatorCard key={creator.name} creator={creator} favorite={favorites.includes(creator.name)} toggle={() => toggleFavorite(creator.name)} />)}
                <button type="button" className="creator-next" aria-label="Profils suivants">→</button>
              </div>
            </section>

            <div className="dashboard-lower-row">
              <section className="dashboard-panel trends-panel">
                <div className="panel-heading"><h2>Tendances actuelles</h2><button type="button">Voir tout →</button></div>
                {trends.map((trend) => <div className="trend-item" key={trend.title}><i className={trend.tone}>{trend.icon}</i><span><strong>{trend.title}</strong><small>{trend.detail}</small></span><b>↑ {trend.growth}<small>vs mois dernier</small></b></div>)}
              </section>
              <section className="dashboard-panel overview-panel">
                <div className="panel-heading"><h2>Aperçu en un coup d’œil</h2></div>
                <div className="stat-grid">
                  <div><i className="stat-pink">♟</i><strong>152K<small>Influenceurs dans<br />notre base</small></strong></div>
                  <div><i className="stat-orange">⌁</i><strong>24,6%<small>Engagement moyen<br />global</small></strong></div>
                  <div><i className="stat-green">◎</i><strong>48<small>Pays couverts</small></strong></div>
                  <div><i className="stat-yellow">☆</i><strong>87/100<small>SoMatch Score moyen</small></strong></div>
                </div>
              </section>
            </div>
          </div>

        </div>

        <section className="bottom-inspiration">
          <i>✦</i><div><h2>Besoin d’inspiration ?</h2><p>Laissez SoMatch AI analyser votre marché et vous proposer des insights personnalisés.</p></div><button type="button">Demander à SoMatch AI →</button>
        </section>
      </section>
    </main>
  );
}
