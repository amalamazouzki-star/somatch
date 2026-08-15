"use client";

import { useState, type ReactNode } from "react";
import { AppSidebar } from "../../components/AppShell";
import { NotificationTrigger } from "../../components/NotificationCenter";
import { SocialLogo } from "../../components/SocialLogo";

const metrics = [
  { icon: "users", label: "Abonnés", value: "256 K", growth: "+12,4 %", note: "par rapport au mois dernier", tone: "pink" },
  { icon: "heart", label: "Engagement moyen", value: "4,8 %", growth: "+0,6 pt", note: "par rapport au mois dernier", tone: "rose" },
  { icon: "eye", label: "Vues moyennes par Reel", value: "78 K", growth: "+15,3 %", note: "par rapport au mois dernier", tone: "coral" },
  { icon: "message", label: "Interactions moyennes", value: "3,2 K", growth: "+10,1 %", note: "par rapport au mois dernier", tone: "orange" },
] as const;

const tabs = ["Aperçu", "Contenus", "Audience", "Performances", "Collaborations", "Mentions"];

const networkStats = [
  { name: "Instagram", followers: "178 K abonnés", engagement: "4,6 %", platform: "instagram" },
  { name: "TikTok", followers: "72 K abonnés", engagement: "5,1 %", platform: "tiktok" },
  { name: "YouTube", followers: "6 K abonnés", engagement: "3,2 %", platform: "youtube" },
] as const;

const ageGroups = [
  ["18–24 ans", 24], ["25–34 ans", 46], ["35–44 ans", 22], ["45+ ans", 8],
] as const;

const countries = [
  ["Maroc", 72], ["France", 9], ["Algérie", 6], ["Tunisie", 4], ["Autres", 9],
] as const;

const analysis = [
  ["users", "Qualité de l’audience", 94], ["shield", "Authenticité", 91], ["calendar", "Régularité", 88], ["trend", "Performance", 92], ["star", "Affinité avec la marque", 90],
] as const;

const collaborations = [
  { brand: "INDOMIE", name: "Indomie Maroc", date: "avril 2024", category: "Food", tone: "red" },
  { brand: "URIAGE", name: "Uriage Maroc", date: "mars 2024", category: "Beauté", tone: "blue" },
  { brand: "LCW", name: "LC Waikiki Maroc", date: "février 2024", category: "Mode", tone: "navy" },
  { brand: "Kinder", name: "Kinder Joy", date: "janvier 2024", category: "Food", tone: "orange" },
] as const;

const recentContent = [
  { image: "/explorer/maya.png", views: "78K", likes: "4,9 K", date: "12 mai 2024", platform: "instagram", position: "center" },
  { image: "/explorer/nour.png", views: "65K", likes: "3,8 K", date: "9 mai 2024", platform: "instagram", position: "center" },
  { image: "/influencer-collage.png", views: "82K", likes: "5,6 K", date: "7 mai 2024", platform: "instagram", position: "left" },
  { image: "/explorer/sarah.png", views: "91K", likes: "6,2 K", date: "4 mai 2024", platform: "tiktok", position: "center" },
  { image: "/explorer/imane.png", views: "63K", likes: "4,1 K", date: "1 mai 2024", platform: "tiktok", position: "center" },
] as const;

const chartPoints = [
  { left: 5, bottom: 24 }, { left: 20, bottom: 39 }, { left: 35, bottom: 47 }, { left: 50, bottom: 51 },
  { left: 65, bottom: 68 }, { left: 80, bottom: 72 }, { left: 94, bottom: 88 },
] as const;

function PlatformIcon({ name }: { name: "instagram" | "tiktok" | "youtube" }) {
  const label = name === "instagram" ? "Instagram" : name === "tiktok" ? "TikTok" : "YouTube";
  return <span className={`profile-platform ${name}`} role="img" aria-label={label}><SocialLogo network={name} /></span>;
}

type ProfileIconName = "arrow-left" | "arrow-right" | "calendar" | "compare" | "eye" | "globe" | "heart" | "info" | "location" | "message" | "plus" | "search" | "shield" | "sparkles" | "star" | "trend" | "users";

const profileIconPaths: Record<ProfileIconName, ReactNode> = {
  "arrow-left": <><path d="m15 5-7 7 7 7" /><path d="M8 12h12" /></>,
  "arrow-right": <><path d="m9 5 7 7-7 7" /><path d="M4 12h12" /></>,
  calendar: <><rect x="3.5" y="5.5" width="17" height="15" rx="2" /><path d="M7.5 3v5M16.5 3v5M3.5 10h17" /></>,
  compare: <><path d="M4 8h14M15 5l3 3-3 3M20 16H6M9 13l-3 3 3 3" /></>,
  eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.8" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" /></>,
  heart: <path d="M20.7 8.5c0 5.1-8.7 10.8-8.7 10.8S3.3 13.6 3.3 8.5A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.7 2.1Z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 10.5v6M12 7.4h.01" /></>,
  location: <><path d="M12 21s6-5.7 6-11a6 6 0 1 0-12 0c0 5.3 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
  message: <path d="M5 18.5 3.5 21l3.9-.9a9 9 0 1 0-2.4-1.6Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
  shield: <><path d="m12 2.8 8 3.9v5.8c0 4.4-3.3 7.5-8 8.7-4.7-1.2-8-4.3-8-8.7V6.7l8-3.9Z" /><path d="m8.7 12.1 2.1 2.1 4.7-4.8" /></>,
  sparkles: <><path d="M12 2.8c.7 4.2 2.6 6.1 6.8 6.8-4.2.7-6.1 2.6-6.8 6.8-.7-4.2-2.6-6.1-6.8-6.8 4.2-.7 6.1-2.6 6.8-6.8Z" /><path d="M19.1 2.8v3.6M20.9 4.6h-3.6" /></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />,
  trend: <><path d="m4 17 5-5 3 3 7-8" /><path d="M14 7h5v5" /></>,
  users: <><circle cx="9" cy="8.5" r="3" /><circle cx="17" cy="9.5" r="2.2" /><path d="M3.5 19c.4-4 2.4-6.1 5.5-6.1s5.1 2.1 5.5 6.1M14.2 14c3.5-.3 5.5 1.4 6.1 4.4" /></>,
};

function ProfileIcon({ name, label }: { name: ProfileIconName; label?: string }) {
  return <svg className="profile-vector-icon" viewBox="0 0 24 24" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{profileIconPaths[name]}</svg>;
}

function FollowersChart() {
  return (
    <div className="followers-chart" role="img" aria-label="Évolution des abonnés de novembre à mai, avec prévision à partir de mars">
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
  const [activeTab, setActiveTab] = useState("Aperçu");

  const sectionTargets: Record<string, string> = {
    Aperçu: "profile-overview",
    Contenus: "recent-content",
    Audience: "audience-insights",
    Performances: "network-performance",
    Collaborations: "recent-collaborations",
    Mentions: "profile-overview",
  };

  function selectSection(tab: string) {
    setActiveTab(tab);
    document.getElementById(sectionTargets[tab])?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="dashboard-page influencer-page">
      <AppSidebar active="explorer" />
      <section className="dashboard-main influencer-main">
        <header className="influencer-topbar">
          <a href="/explorer" className="back-to-explorer"><span><ProfileIcon name="arrow-left" /></span> Retour à Explorer</a>
          <div className="influencer-top-actions">
            <label className="profile-global-search"><i><ProfileIcon name="search" /></i><input aria-label="Rechercher un créateur ou une catégorie" placeholder="Rechercher un créateur, une catégorie…" /></label>
            <NotificationTrigger className="profile-notification" />
            <button type="button" className="profile-user" aria-label="Menu utilisateur"><img src="/dashboard/profile-sara.png" alt="Sara Benali" width="45" height="45" decoding="async" /><span>⌄</span></button>
          </div>
        </header>

        <section className="influencer-hero animated-card">
          <div className="identity-block">
            <img className="influencer-avatar" src="/explorer/maya.png" alt="Maya El Amrani" width="139" height="139" decoding="async" />
            <div className="identity-copy">
              <div className="identity-title"><h1>Maya El Amrani</h1><i role="img" aria-label="Profil vérifié">✓</i></div>
              <p className="identity-handle">@mayaelamrani</p>
              <p className="identity-niche"><b>Beauté</b><span>•</span> Lifestyle</p>
              <div className="identity-details"><span><ProfileIcon name="location" /> Casablanca, Maroc</span><span><ProfileIcon name="globe" /> Français, arabe et anglais</span></div>
              <div className="identity-reach"><b>Méga</b><span>+1,4 M abonnés au total</span></div>
            </div>
            <div className="identity-platforms"><PlatformIcon name="instagram" /><PlatformIcon name="tiktok" /><PlatformIcon name="youtube" /></div>
          </div>

          <article className="score-card animated-card">
            <span>SoMatch Score</span>
            <strong>92<span>/100</span></strong>
            <p>Excellent <i>↗</i></p>
            <div className="score-track"><i /></div>
          </article>

          <div className="profile-actions">
            <button type="button" className={favorite ? "is-active" : ""} aria-pressed={favorite} onClick={() => setFavorite((value) => !value)}><ProfileIcon name="heart" />{favorite ? "Ajoutée aux favoris" : "Ajouter aux favoris"}</button>
            <button type="button" className={`campaign-action ${added ? "is-added" : ""}`} aria-pressed={added} onClick={() => setAdded((value) => !value)}><ProfileIcon name="plus" />{added ? "Ajoutée à la campagne" : "Ajouter à une campagne"}</button>
            <a className="profile-action-link" href="/comparer"><ProfileIcon name="compare" />Comparer</a>
          </div>
        </section>

        <section className="profile-metrics">
          {metrics.map((metric) => (
            <article className="metric-card animated-card" key={metric.label}>
              <i className={metric.tone}><ProfileIcon name={metric.icon} /></i>
              <div><span>{metric.label}</span><strong>{metric.value}</strong></div>
              <p><b>{metric.growth}</b><small>{metric.note}</small></p>
            </article>
          ))}
        </section>

        <nav className="influencer-tabs" aria-label="Accès rapide aux sections du profil">
          {tabs.map((tab) => <button type="button" aria-pressed={activeTab === tab} className={activeTab === tab ? "active" : ""} onClick={() => selectSection(tab)} key={tab}>{tab}</button>)}
        </nav>

        <section className="profile-content-grid" id="profile-overview">
          <div className="profile-data-column">
            <div className="profile-insight-row">
              <article className="data-card chart-card animated-card">
                <div className="data-card-heading"><h2>Évolution des abonnés <i><ProfileIcon name="info" label="Informations" /></i></h2><button type="button" aria-label="Période affichée : six derniers mois">6 derniers mois</button></div>
                <div className="chart-legend"><span><i />Abonnés</span><span><i />Prévision</span></div>
                <FollowersChart />
              </article>

              <article className="data-card networks-card animated-card" id="network-performance">
                <div className="data-card-heading"><h2>Performances par réseau <i><ProfileIcon name="info" label="Informations" /></i></h2></div>
                <div className="network-list">
                  {networkStats.map((network) => <div className="network-row" key={network.name}><PlatformIcon name={network.platform} /><span className="network-copy"><strong>{network.name}</strong><small>{network.followers}</small></span><b>{network.engagement}<small>Engagement</small></b></div>)}
                </div>
                <a className="outline-cta" href="/somatch-ai/recommandation">Voir l’analyse complète <span><ProfileIcon name="arrow-right" /></span></a>
              </article>
            </div>

            <article className="data-card recent-card animated-card" id="recent-content">
              <div className="data-card-heading"><h2>Contenus récents</h2><button type="button" className="link-button" onClick={() => selectSection("Contenus")}>Voir tous les contenus <ProfileIcon name="arrow-right" /></button></div>
              <div className="recent-grid">
                {recentContent.map((post) => <article className="post-card" key={post.date}><div className="post-visual"><img src={post.image} alt={`Publication ${post.platform === "instagram" ? "Instagram" : "TikTok"} de Maya El Amrani, ${post.date}`} width="180" height="258" loading="lazy" decoding="async" style={{ objectPosition: post.position }} /><PlatformIcon name={post.platform} /></div><div className="post-stats"><span><ProfileIcon name="eye" />{post.views}</span><span><ProfileIcon name="heart" />{post.likes}</span></div><time dateTime={`2024-05-${post.date.startsWith("12") ? "12" : post.date.startsWith("9") ? "09" : post.date.startsWith("7") ? "07" : post.date.startsWith("4") ? "04" : "01"}`}>{post.date}</time></article>)}
              </div>
            </article>
          </div>

          <article className="data-card audience-card animated-card" id="audience-insights">
            <div className="data-card-heading"><h2>Audience <i><ProfileIcon name="info" label="Informations" /></i></h2></div>
            <h3>Genre</h3>
            <div className="gender-block"><div className="gender-donut" role="img" aria-label="Répartition de l’audience : 78 % de femmes, 20 % d’hommes et 2 % autres"><i /></div><ul><li><i className="women" /> <b>78 %</b> Femmes</li><li><i className="men" /> <b>20 %</b> Hommes</li><li><i className="other" /> <b>2 %</b> Autres</li></ul></div>
            <h3>Âges</h3>
            <div className="audience-bars age-bars">{ageGroups.map(([label,value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value} %</strong></div>)}</div>
            <h3>Principaux pays</h3>
            <div className="audience-bars country-bars">{countries.map(([label,value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value} %</strong></div>)}</div>
          </article>

          <aside className="profile-right-rail">
            <article className="data-card analysis-card animated-card">
              <div className="data-card-heading"><h2>Analyse SoMatch <i><ProfileIcon name="info" label="Informations" /></i></h2><a href="/somatch-ai/recommandation" className="link-button">Voir le détail <ProfileIcon name="arrow-right" /></a></div>
              <div className="analysis-list">{analysis.map(([icon,label,value]) => <div key={label}><i><ProfileIcon name={icon} /></i><span>{label}</span><b role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><i style={{ width: `${value}%` }} /></b><strong>{value}/100</strong></div>)}</div>
            </article>

            <article className="data-card why-card animated-card">
              <h2><i><ProfileIcon name="sparkles" /></i> Pourquoi ce profil ?</h2>
              <p>SoMatch AI recommande Maya El Amrani pour sa communauté engagée et qualifiée, son contenu aligné avec votre marque et ses excellentes performances sur Instagram et TikTok.</p>
              <a href="/somatch-ai" className="gradient-cta">Demander à SoMatch AI <ProfileIcon name="sparkles" /></a>
            </article>

            <article className="data-card collaborations-card animated-card" id="recent-collaborations">
              <div className="data-card-heading"><h2>Collaborations récentes</h2><button type="button" className="link-button" onClick={() => selectSection("Collaborations")}>Voir toutes <ProfileIcon name="arrow-right" /></button></div>
              <div className="collaboration-list">{collaborations.map((item) => <div key={item.name}><i className={item.tone}>{item.brand}</i><span><strong>{item.name}</strong><small>{item.date}</small></span><b>{item.category}</b></div>)}</div>
            </article>
          </aside>
        </section>
      </section>
    </main>
  );
}
