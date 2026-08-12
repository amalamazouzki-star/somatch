"use client";

import { FormEvent, useState } from "react";

const navigation = [
  ["⌂", "accueil"],
  ["✧", "somatch AI"],
  ["◯", "explorer"],
  ["▥", "tendances"],
  ["⊞", "catégories"],
  ["♡", "favoris"],
  ["▣", "mes campagnes"],
  ["⬡", "influenceurs certifiés"],
] as const;

const secondaryNavigation = [
  ["♙", "profil"],
  ["⚙", "paramètres"],
  ["?", "Support"],
] as const;

const creators = [
  { name: "maya el amrani", handle: "@mayaelamrani", niche: "beauty · lifestyle", image: "/dashboard/maya.png", platforms: ["instagram", "tiktok"], followers: "256K", engagement: "4,8%", score: 92 },
  { name: "salma zahra", handle: "@salmazahra", niche: "lifestyle · mode", image: "/dashboard/salma.png", platforms: ["instagram", "tiktok", "youtube"], followers: "198K", engagement: "5,6%", score: 82 },
  { name: "nour beauty", handle: "@nour.beauty", niche: "beauty · skincare", image: "/dashboard/nour.png", platforms: ["instagram", "tiktok"], followers: "142K", engagement: "6,2%", score: 88 },
  { name: "youssef fit", handle: "@youssef.fit", niche: "sport · fitness", image: "/dashboard/youssef.png", platforms: ["instagram", "tiktok", "youtube"], followers: "310K", engagement: "3,9%", score: 87 },
  { name: "lina eats", handle: "@linaeats", niche: "food · lifestyle", image: "/dashboard/lina.png", platforms: ["instagram", "tiktok"], followers: "178K", engagement: "5,1%", score: 86 },
];

const upcoming = [
  { name: "salma zahra", type: "story Instagram", date: "12 mai, 18:00", image: "/dashboard/salma.png", platform: "instagram" },
  { name: "youssef fit", type: "reel TikTok", date: "13 mai, 12:00", image: "/dashboard/youssef.png", platform: "tiktok" },
  { name: "nour beauty", type: "story Instagram", date: "14 mai, 20:00", image: "/dashboard/nour.png", platform: "instagram" },
  { name: "lina eats", type: "reel Instagram", date: "15 mai, 18:30", image: "/dashboard/lina.png", platform: "instagram" },
];

const trends = [
  { icon: "♙", title: "skincare", detail: "catégorie en forte croissance", growth: "28%", tone: "pink" },
  { icon: "♪", title: "TikTok", detail: "réseau tendance", growth: "34%", tone: "black" },
  { icon: "●", title: "Maroc", detail: "localisation populaire", growth: "22%", tone: "green" },
];

const campaigns = [
  { title: "Glow Skin Care", detail: "beauty · skincare", people: "5 influenceurs", image: "/dashboard/campaign-glow.png", status: "en cours" },
  { title: "Run Your Way", detail: "sport · running", people: "8 influenceurs", image: "/dashboard/campaign-run.png", status: "en cours" },
  { title: "Café du Matin", detail: "food · boissons", people: "6 influenceurs", image: "/dashboard/campaign-cafe.png", status: "terminée" },
  { title: "Summer Collection", detail: "mode · lifestyle", people: "7 influenceurs", image: "/dashboard/campaign-summer.png", status: "terminée" },
];

function Brand() {
  return (
    <div className="dashboard-brand" aria-label="SoMatch">
      <span>somatch</span>
      <img src="/somatch-logo-mark.png" alt="" />
    </div>
  );
}

function PlatformBadge({ name }: { name: string }) {
  return <span className={`platform-badge ${name}`} aria-label={name}>{name === "tiktok" ? "♪" : name === "youtube" ? "▶" : ""}</span>;
}

function CreatorCard({ creator, favorite, toggle }: { creator: typeof creators[number]; favorite: boolean; toggle: () => void }) {
  return (
    <article className="creator-card">
      <div className="creator-card-top">
        <img src={creator.image} alt={creator.name} />
        <button type="button" className={`heart-button ${favorite ? "is-favorite" : ""}`} onClick={toggle} aria-label={`Ajouter ${creator.name} aux favoris`}>♡</button>
      </div>
      <h3>{creator.name}</h3>
      <p className="creator-handle">{creator.handle}</p>
      <p className="creator-niche">{creator.niche}</p>
      <div className="creator-platforms">{creator.platforms.map((platform) => <PlatformBadge key={platform} name={platform} />)}</div>
      <div className="creator-metrics">
        <strong>{creator.followers}<small>abonnés</small></strong>
        <strong>{creator.engagement}<small>engagement</small></strong>
      </div>
      <div className="creator-score"><b>{creator.score}/100</b><span>Somatch Score</span></div>
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
      <aside className="dashboard-sidebar">
        <Brand />
        <nav className="primary-nav" aria-label="Navigation principale">
          {navigation.map(([icon, label], index) => (
            <button type="button" className={index === 0 ? "active" : ""} key={label}>
              <i>{icon}</i><span>{label}</span>{label === "influenceurs certifiés" && <em>bientôt disponible</em>}
            </button>
          ))}
        </nav>
        <nav className="secondary-nav" aria-label="Navigation du compte">
          {secondaryNavigation.map(([icon, label]) => <button type="button" key={label}><i>{icon}</i><span>{label}</span></button>)}
        </nav>
        <section className="sidebar-ai-card">
          <div><img src="/somatch-logo-mark.png" alt="" /><strong>somatch AI</strong></div>
          <p>votre copilote IA pour des campagnes d’influence plus performantes.</p>
          <button type="button">découvrir somatch AI <span>→</span></button>
        </section>
        <button className="sidebar-profile" type="button">
          <img src="/dashboard/profile-sara.png" alt="Sara Benali" />
          <span><strong>sara benali</strong><small>marketeuse</small></span>
          <b>⌄</b>
        </button>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div><h1>bonjour, sara 👋</h1><p>découvrez, analysez et collaborez avec les meilleurs créateurs.</p></div>
          <div className="header-actions">
            <button type="button" className="notification-button" aria-label="Notifications">♧<span>3</span></button>
            <button type="button" className="profile-menu"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button>
          </div>
        </header>

        <div className="dashboard-columns">
          <div className="dashboard-center">
            <section className="ai-search-card">
              <i className="sparkle sparkle-one">✦</i><i className="sparkle sparkle-two">✦</i>
              <h2>que recherchez-vous <span>aujourd’hui ?</span></h2>
              <p>somatch AI est là pour vous aider à trouver le match parfait.</p>
              <form onSubmit={launchAi}>
                <b>✧</b>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ex : je lance une campagne skincare au Maroc pour toucher les femmes de 18-34 ans..." aria-label="Votre recherche SoMatch AI" />
                <button type="submit">{searching ? "recherche…" : "lancer somatch AI"} <span>✦</span></button>
              </form>
              <div className="popular-suggestions"><strong>suggestions populaires :</strong>
                {["skincare au Maroc", "8 créatrices lifestyle", "campagne ramadan", "food TikTok", "sport & fitness"].map((suggestion) => <button type="button" key={suggestion} onClick={() => setQuery(suggestion)}>{suggestion}</button>)}
                <button type="button" className="next-suggestion">›</button>
              </div>
            </section>

            <section className="recommendations-section">
              <div className="section-heading"><div><h2>recommandations pour vous</h2><p>des profils sélectionnés par somatch AI selon vos intérêts.</p></div><button type="button">voir tout →</button></div>
              <div className="creator-grid">
                {creators.map((creator) => <CreatorCard key={creator.name} creator={creator} favorite={favorites.includes(creator.name)} toggle={() => toggleFavorite(creator.name)} />)}
                <button type="button" className="creator-next" aria-label="Profils suivants">→</button>
              </div>
            </section>

            <div className="dashboard-lower-row">
              <section className="dashboard-panel trends-panel">
                <div className="panel-heading"><h2>tendances actuelles</h2><button type="button">voir tout →</button></div>
                {trends.map((trend) => <div className="trend-item" key={trend.title}><i className={trend.tone}>{trend.icon}</i><span><strong>{trend.title}</strong><small>{trend.detail}</small></span><b>↑ {trend.growth}<small>vs mois dernier</small></b></div>)}
              </section>
              <section className="dashboard-panel overview-panel">
                <div className="panel-heading"><h2>aperçu en un coup d’œil</h2></div>
                <div className="stat-grid">
                  <div><i className="stat-pink">♟</i><strong>152K<small>influenceurs dans<br />notre base</small></strong></div>
                  <div><i className="stat-orange">⌁</i><strong>24,6%<small>engagement moyen<br />global</small></strong></div>
                  <div><i className="stat-green">◎</i><strong>48<small>pays couverts</small></strong></div>
                  <div><i className="stat-yellow">☆</i><strong>87/100<small>somatch score moyen</small></strong></div>
                </div>
              </section>
            </div>
          </div>

          <aside className="dashboard-right">
            <section className="dashboard-panel upcoming-panel">
              <div className="panel-heading"><h2>à venir</h2><button type="button">voir tout →</button></div>
              {upcoming.map((item) => <div className="upcoming-item" key={item.name}><img src={item.image} alt={item.name} /><span><strong>{item.name}</strong><small>{item.type}</small><small>{item.date}</small></span><PlatformBadge name={item.platform} /></div>)}
            </section>
            <section className="inspiration-card">
              <div><i>✦</i><h2>besoin d’inspiration ?</h2></div>
              <p>laissez somatch AI analyser votre marché et vous proposer des insights personnalisés.</p>
              <button type="button">demander à somatch AI →</button>
            </section>
            <section className="dashboard-panel campaigns-panel">
              <div className="panel-heading"><h2>Campagnes récentes</h2><button type="button">voir tout →</button></div>
              {campaigns.map((campaign) => <div className="campaign-item" key={campaign.title}><img src={campaign.image} alt="" /><span><strong>{campaign.title}</strong><small>{campaign.detail}</small><small>{campaign.people}</small></span><b className={campaign.status === "terminée" ? "done" : "running"}>{campaign.status}</b></div>)}
            </section>
          </aside>
        </div>

        <section className="bottom-inspiration">
          <i>✦</i><div><h2>besoin d’inspiration ?</h2><p>laissez somatch AI analyser votre marché et vous proposer des insights personnalisés.</p></div><button type="button">demander à somatch AI →</button>
        </section>
      </section>
    </main>
  );
}
