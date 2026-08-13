"use client";

import { useState } from "react";
import { AppSidebar } from "../../components/AppShell";

const metrics = [
  { icon: "♟", label: "abonnés", value: "256K", growth: "+12,4%", note: "vs mois dernier", tone: "pink" },
  { icon: "♥", label: "engagement moyen", value: "4,8%", growth: "+0,6 pt", note: "vs mois dernier", tone: "rose" },
  { icon: "◉", label: "vues moyennes (reel)", value: "78K", growth: "+15,3%", note: "vs mois dernier", tone: "coral" },
  { icon: "●", label: "interactions moyennes", value: "3,2K", growth: "+10,1%", note: "vs mois dernier", tone: "orange" },
] as const;

const tabs = ["aperçu", "contenus", "audience", "performances", "collaborations", "mentions"];

const networkStats = [
  { name: "Instagram", followers: "178K abonnés", engagement: "4,6%", platform: "instagram" },
  { name: "TikTok", followers: "72K abonnés", engagement: "5,1%", platform: "tiktok" },
  { name: "YouTube", followers: "6K abonnés", engagement: "3,2%", platform: "youtube" },
] as const;

const ageGroups = [
  ["18–24 ans", 24], ["25–34 ans", 46], ["35–44 ans", 22], ["45+ ans", 8],
] as const;

const countries = [
  ["Maroc", 72], ["France", 9], ["Algérie", 6], ["Tunisie", 4], ["Autres", 9],
] as const;

const analysis = [
  ["♧", "qualité audience", 94], ["⬡", "authenticité", 91], ["⌗", "régularité", 88], ["↗", "performance", 92], ["☆", "brand fit", 90],
] as const;

const collaborations = [
  { brand: "INDOMIE", name: "indomie maroc", date: "avril 2024", category: "food", tone: "red" },
  { brand: "URIAGE", name: "uriage maroc", date: "mars 2024", category: "beauty", tone: "blue" },
  { brand: "LCW", name: "lc waikiki maroc", date: "février 2024", category: "mode", tone: "navy" },
  { brand: "Kinder", name: "kinder joy", date: "janvier 2024", category: "food", tone: "orange" },
] as const;

const recentContent = [
  { image: "/explorer/maya.png", views: "78K", likes: "4,9K", date: "12 mai 2024", platform: "instagram", position: "center" },
  { image: "/explorer/nour.png", views: "65K", likes: "3,8K", date: "9 mai 2024", platform: "instagram", position: "center" },
  { image: "/influencer-collage.png", views: "82K", likes: "5,6K", date: "7 mai 2024", platform: "instagram", position: "left" },
  { image: "/explorer/sarah.png", views: "91K", likes: "6,2K", date: "4 mai 2024", platform: "tiktok", position: "center" },
  { image: "/explorer/imane.png", views: "63K", likes: "4,1K", date: "1 mai 2024", platform: "tiktok", position: "center" },
] as const;

const chartPoints = [
  { left: 5, bottom: 24 }, { left: 20, bottom: 39 }, { left: 35, bottom: 47 }, { left: 50, bottom: 51 },
  { left: 65, bottom: 68 }, { left: 80, bottom: 72 }, { left: 94, bottom: 88 },
] as const;

function PlatformIcon({ name }: { name: string }) {
  return <span className={`profile-platform ${name}`} aria-label={name}>{name === "tiktok" ? "♪" : name === "youtube" ? "▶" : ""}</span>;
}

function FollowersChart() {
  return (
    <div className="followers-chart" aria-label="Évolution des abonnés de novembre à mai">
      {["300K", "240K", "180K", "120K", "60K", "0"].map((label) => <div className="chart-grid-line" key={label}><span>{label}</span></div>)}
      <div className="chart-plot">
        {chartPoints.slice(0, -1).map((point, index) => {
          const next = chartPoints[index + 1];
          const dx = next.left - point.left;
          const dy = next.bottom - point.bottom;
          const width = Math.sqrt(dx * dx + dy * dy).toFixed(4);
          const angle = (-Math.atan2(dy, dx) * 180 / Math.PI).toFixed(4);
          return <i className={`chart-segment ${index > 3 ? "forecast" : ""}`} key={`${point.left}-${point.bottom}`} style={{ left: `${point.left}%`, bottom: `${point.bottom}%`, width: `${width}%`, transform: `rotate(${angle}deg)` }} />;
        })}
        {chartPoints.slice(0, 5).map((point) => <b key={point.left} style={{ left: `${point.left}%`, bottom: `${point.bottom}%` }} />)}
      </div>
      <div className="chart-months">{["Nov", "Déc", "Jan", "Fév", "Mar", "Avr", "Mai"].map((month) => <span key={month}>{month}</span>)}</div>
    </div>
  );
}

export default function InfluencerProfile() {
  const [favorite, setFavorite] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("aperçu");

  return (
    <main className="dashboard-page influencer-page">
      <AppSidebar active="explorer" />
      <section className="dashboard-main influencer-main">
        <header className="influencer-topbar">
          <a href="/explorer" className="back-to-explorer"><span>←</span> retour à l’explorer</a>
          <div className="influencer-top-actions">
            <label className="profile-global-search"><i>⌕</i><input aria-label="Rechercher" placeholder="rechercher un créateur, une catégorie..." /></label>
            <button type="button" className="profile-notification" aria-label="Notifications">♧<span>3</span></button>
            <button type="button" className="profile-user" aria-label="Menu utilisateur"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button>
          </div>
        </header>

        <section className="influencer-hero animated-card">
          <div className="identity-block">
            <img className="influencer-avatar" src="/explorer/maya.png" alt="Maya El Amrani" />
            <div className="identity-copy">
              <div className="identity-title"><h1>maya el amrani</h1><i>✓</i></div>
              <p className="identity-handle">@mayaelamrani</p>
              <p className="identity-niche"><b>beauty</b><span>•</span> lifestyle</p>
              <div className="identity-details"><span>⌾ &nbsp;Casablanca, Maroc</span><span>⊕ &nbsp;Français, Arabe, Anglais</span></div>
              <div className="identity-reach"><b>mega</b><span>+1,4M abonnés au total</span></div>
            </div>
            <div className="identity-platforms"><PlatformIcon name="instagram" /><PlatformIcon name="tiktok" /><PlatformIcon name="youtube" /></div>
          </div>

          <article className="score-card animated-card">
            <span>somatch score</span>
            <strong>92<span>/100</span></strong>
            <p>Excellent <i>↗</i></p>
            <div className="score-track"><i /></div>
          </article>

          <div className="profile-actions">
            <button type="button" className={favorite ? "is-active" : ""} onClick={() => setFavorite((value) => !value)}>♡ &nbsp;{favorite ? "ajouté aux favoris" : "ajouter aux favoris"}</button>
            <button type="button" className={`campaign-action ${added ? "is-added" : ""}`} onClick={() => setAdded((value) => !value)}>＋ &nbsp;{added ? "ajoutée à la campagne" : "ajouter à une campagne"}</button>
            <button type="button" onClick={() => { window.location.href = "/comparer"; }}>⇄ &nbsp; comparer</button>
          </div>
        </section>

        <section className="profile-metrics">
          {metrics.map((metric) => (
            <article className="metric-card animated-card" key={metric.label}>
              <i className={metric.tone}>{metric.icon}</i>
              <div><span>{metric.label}</span><strong>{metric.value}</strong></div>
              <p><b>{metric.growth}</b><small>{metric.note}</small></p>
            </article>
          ))}
        </section>

        <nav className="profile-tabs" aria-label="Sections du profil">
          {tabs.map((tab) => <button type="button" className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}
        </nav>

        <section className="profile-content-grid">
          <div className="profile-data-column">
            <div className="profile-insight-row">
              <article className="data-card chart-card animated-card">
                <div className="data-card-heading"><h2>évolution des abonnés <i>ⓘ</i></h2><button type="button">6 derniers mois⌄</button></div>
                <div className="chart-legend"><span><i />Abonnés</span><span><i />Prévision</span></div>
                <FollowersChart />
              </article>

              <article className="data-card networks-card animated-card">
                <div className="data-card-heading"><h2>performances par réseau <i>ⓘ</i></h2></div>
                <div className="network-list">
                  {networkStats.map((network) => <div className="network-row" key={network.name}><PlatformIcon name={network.platform} /><span className="network-copy"><strong>{network.name}</strong><small>{network.followers}</small></span><b>{network.engagement}<small>engagement</small></b></div>)}
                </div>
                <button type="button" className="outline-cta">voir l’analyse complète <span>→</span></button>
              </article>
            </div>

            <article className="data-card recent-card animated-card">
              <div className="data-card-heading"><h2>contenus récents</h2><button type="button" className="link-button">voir tous les contenus&nbsp; →</button></div>
              <div className="recent-grid">
                {recentContent.map((post) => <article className="post-card" key={post.date}><div className="post-visual"><img src={post.image} alt="Publication de Maya" style={{ objectPosition: post.position }} /><PlatformIcon name={post.platform} /></div><div className="post-stats"><span>◉ {post.views}</span><span>♡ {post.likes}</span></div><time>{post.date}</time></article>)}
              </div>
            </article>
          </div>

          <article className="data-card audience-card animated-card">
            <div className="data-card-heading"><h2>audience <i>ⓘ</i></h2></div>
            <h3>genre</h3>
            <div className="gender-block"><div className="gender-donut"><i /></div><ul><li><i className="women" /> <b>78%</b> femmes</li><li><i className="men" /> <b>20%</b> hommes</li><li><i className="other" /> <b>2%</b> autre</li></ul></div>
            <h3>âges</h3>
            <div className="audience-bars age-bars">{ageGroups.map(([label,value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>)}</div>
            <h3>top pays</h3>
            <div className="audience-bars country-bars">{countries.map(([label,value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>)}</div>
          </article>

          <aside className="profile-right-rail">
            <article className="data-card analysis-card animated-card">
              <div className="data-card-heading"><h2>analyse somatch &nbsp;ⓘ</h2><button type="button" className="link-button">voir le détail&nbsp; →</button></div>
              <div className="analysis-list">{analysis.map(([icon,label,value]) => <div key={label}><i>{icon}</i><span>{label}</span><b><i style={{ width: `${value}%` }} /></b><strong>{value}/100</strong></div>)}</div>
            </article>

            <article className="data-card why-card animated-card">
              <h2><i>✣</i> pourquoi ce profil ?</h2>
              <p>somatch AI recommande maya el amrani pour sa communauté engagée et qualifiée, son contenu aligné avec votre marque et ses excellentes performances sur Instagram et TikTok.</p>
              <button type="button" className="gradient-cta">demander à somatch AI&nbsp; ✦</button>
            </article>

            <article className="data-card collaborations-card animated-card">
              <div className="data-card-heading"><h2>collaborations récentes</h2><button type="button" className="link-button">voir toutes&nbsp; →</button></div>
              <div className="collaboration-list">{collaborations.map((item) => <div key={item.name}><i className={item.tone}>{item.brand}</i><span><strong>{item.name}</strong><small>{item.date}</small></span><b>{item.category}</b></div>)}</div>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}
