"use client";

import { useMemo, useState } from "react";
import { AppHeader, AppSidebar } from "../components/AppShell";

const filters = [
  ["◎", "réseau"],
  ["⊞", "catégorie"],
  ["⌾", "localisation"],
  ["▥", "niveau"],
  ["♙", "followers"],
  ["⌁", "engagement"],
] as const;

const profiles = [
  { tier:"mega", name:"maya el amrani", handle:"@mayaelamrani", tags:["beauty","lifestyle"], image:"/explorer/maya.png", platforms:["instagram","tiktok"], followers:"256K", engagement:"4,8%", score:92, action:true },
  { tier:"macro", name:"salma zahra", handle:"@salmazahra", tags:["lifestyle","mode"], image:"/explorer/salma.png", platforms:["instagram","tiktok","youtube"], followers:"198K", engagement:"5,6%", score:82, action:true },
  { tier:"macro", name:"nour beauty", handle:"@nour.beauty", tags:["beauty","skincare"], image:"/explorer/nour.png", platforms:["instagram","tiktok"], followers:"142K", engagement:"6,2%", score:88, action:true },
  { tier:"micro", name:"youssef fit", handle:"@youssef.fit", tags:["sport","fitness"], image:"/explorer/youssef.png", platforms:["instagram","tiktok","youtube"], followers:"310K", engagement:"3,9%", score:87, action:true },
  { tier:"micro", name:"lina eats", handle:"@linaeats", tags:["food","lifestyle"], image:"/explorer/lina.png", platforms:["instagram","tiktok"], followers:"178K", engagement:"5,1%", score:86, action:true },
  { tier:"nano", name:"kaoutar life", handle:"@kaoutarlife", tags:["lifestyle","travel"], image:"/explorer/kaoutar.png", platforms:["instagram"], followers:"28K", engagement:"8,7%", score:78 },
  { tier:"micro", name:"amine vlogs", handle:"@amine.vlogs", tags:["travel","vlog"], image:"/explorer/amine.png", platforms:["instagram","youtube"], followers:"95K", engagement:"4,6%", score:81 },
  { tier:"macro", name:"sarah diary", handle:"@sarah.diary", tags:["lifestyle","mom life"], image:"/explorer/sarah.png", platforms:["instagram","tiktok"], followers:"233K", engagement:"6,0%", score:85 },
  { tier:"macro", name:"taha lifestyle", handle:"@taha.lifestyle", tags:["lifestyle","fashion"], image:"/explorer/taha.png", platforms:["instagram","tiktok"], followers:"121K", engagement:"4,9%", score:83 },
  { tier:"nano", name:"imane green", handle:"@imanegreen", tags:["eco","lifestyle"], image:"/explorer/imane.png", platforms:["instagram"], followers:"19K", engagement:"9,3%", score:76 },
];

function PlatformBadge({ name }: { name: string }) {
  return <span className={`platform-badge ${name}`} aria-label={name}>{name === "tiktok" ? "♪" : name === "youtube" ? "▶" : ""}</span>;
}

function ExplorerCard({ profile, favorite, toggle }: { profile: typeof profiles[number]; favorite: boolean; toggle: () => void }) {
  return (
    <article className={`explorer-card ${profile.action ? "with-action" : "compact-card"}`}>
      <span className={`tier-badge ${profile.tier}`}>{profile.tier}</span>
      <button type="button" className={`explorer-heart ${favorite ? "is-favorite" : ""}`} onClick={toggle} aria-label={`Ajouter ${profile.name} aux favoris`}>♡</button>
      <div className="explorer-avatar"><img src={profile.image} alt={profile.name} /><i>✓</i></div>
      <h2>{profile.name}</h2>
      <p className="explorer-handle">{profile.handle}</p>
      <p className="explorer-tags"><b>{profile.tags[0]}</b><span>·</span>{profile.tags[1]}</p>
      <div className="explorer-platforms">{profile.platforms.map((platform) => <PlatformBadge key={platform} name={platform} />)}</div>
      <div className="explorer-metrics"><strong>{profile.followers}<small>abonnés</small></strong><strong>{profile.engagement}<small>engagement</small></strong></div>
      <div className="explorer-score"><b>{profile.score}/100</b><span>somatch score</span></div>
      {profile.action && <a className="profile-cta" href="/influenceur/maya-el-amrani">voir le profil <span>→</span></a>}
    </article>
  );
}

export default function Explorer() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [gridView, setGridView] = useState(true);
  const [advanced, setAdvanced] = useState(false);

  const filteredProfiles = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return profiles;
    return profiles.filter((profile) => `${profile.name} ${profile.handle} ${profile.tags.join(" ")}`.toLowerCase().includes(normalized));
  }, [search]);

  function toggleFilter(label: string) {
    setActiveFilters((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  }

  function resetFilters() {
    setActiveFilters([]);
    setSearch("");
    setAdvanced(false);
  }

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  return (
    <main className="dashboard-page explorer-page">
      <AppSidebar active="explorer" />
      <section className="dashboard-main explorer-main">
        <AppHeader title="explorer" subtitle="trouvez les créateurs qui correspondent parfaitement à votre projet." />

        <section className={`explorer-search-panel ${advanced ? "advanced-open" : ""}`}>
          <label className="explorer-search-field"><i>⌕</i><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="rechercher un créateur, une catégorie, un @username..." aria-label="Rechercher un créateur" /><button type="button">◷&nbsp; recherches récentes&nbsp;⌄</button></label>
          <div className="explorer-filters">
            {filters.map(([icon,label]) => <button type="button" className={activeFilters.includes(label) ? "selected" : ""} key={label} onClick={() => toggleFilter(label)}><i>{icon}</i><span>{label}</span><b>⌄</b></button>)}
            <button type="button" className={`advanced-button ${advanced ? "selected" : ""}`} onClick={() => setAdvanced((value) => !value)}><i>☷</i><span>filtres avancés</span></button>
          </div>
          {advanced && <div className="advanced-filter-hint"><span>audience certifiée</span><span>contenu récent</span><span>disponible ce mois</span></div>}
        </section>

        <div className="explorer-toolbar">
          <div><strong>{search ? filteredProfiles.length : "2 147"} profils trouvés</strong><button type="button" onClick={resetFilters}>effacer les filtres <span>×</span></button></div>
          <div><span>trier par :</span><select aria-label="Trier les profils"><option>pertinence</option><option>engagement</option><option>followers</option></select><div className="view-toggle"><button type="button" className={gridView ? "active" : ""} onClick={() => setGridView(true)}>⊞</button><button type="button" className={!gridView ? "active" : ""} onClick={() => setGridView(false)}>☰</button></div></div>
        </div>

        <section className={`explorer-grid ${gridView ? "" : "list-view"}`} aria-live="polite">
          {filteredProfiles.map((profile) => <ExplorerCard key={profile.name} profile={profile} favorite={favorites.includes(profile.name)} toggle={() => toggleFavorite(profile.name)} />)}
          {filteredProfiles.length === 0 && <div className="explorer-empty"><i>⌕</i><h2>aucun profil trouvé</h2><p>essayez un autre nom ou retirez certains filtres.</p></div>}
        </section>

        <nav className="explorer-pagination" aria-label="Pagination"><button type="button">‹</button><button type="button" className="active">1</button><button type="button">2</button><button type="button">3</button><span>…</span><button type="button">45</button><button type="button">›</button></nav>
      </section>
    </main>
  );
}
