"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";

const collections = [
  ["♥", "Tous mes favoris", 32], ["▣", "Kinder BTS 2026", 14], ["♙", "Beauty Campaign", 8], ["♨", "Ramadan 2026", 6], ["▤", "À présenter au client", 12], ["♧", "Ambassadeurs potentiels", 5],
] as const;

const filters = [["catégorie", "toutes"], ["plateforme", "toutes"], ["niveau", "tous"], ["localisation", "toutes"], ["somatch score", "tous"]] as const;

const creators = [
  { name: "souhaila abbad", handle: "@souhailaabbad", niches: "Mom Life  ·  Lifestyle", image: "/explorer/salma.png", position: "center 16%", platforms: ["instagram","tiktok"], followers: "176K", engagement: "5,2%", score: 92, city: "Casablanca, Maroc" },
  { name: "amine hls", handle: "@amine.hls", niches: "Family  ·  Lifestyle", image: "/explorer/amine.png", position: "center 18%", platforms: ["instagram","tiktok","youtube"], followers: "718K", engagement: "6,1%", score: 91, city: "Marrakech, Maroc" },
  { name: "lina yahyaoui", handle: "@linayahyaoui", niches: "Mom Life  ·  Lifestyle", image: "/explorer/lina.png", position: "center 17%", platforms: ["instagram","tiktok"], followers: "284K", engagement: "4,8%", score: 90, city: "Rabat, Maroc" },
  { name: "fatiyass", handle: "@fatiyass.off", niches: "Family  ·  Lifestyle", image: "/explorer/sarah.png", position: "center 18%", platforms: ["tiktok","instagram"], followers: "198K", engagement: "5,0%", score: 90, city: "Casablanca, Maroc" },
  { name: "lamiae skalli", handle: "@lamiae.skalli", niches: "Lifestyle  ·  Mom Life", image: "/explorer/nour.png", position: "center 20%", platforms: ["instagram"], followers: "312K", engagement: "4,6%", score: 88, city: "Casablanca, Maroc" },
  { name: "lina yahyaoui", handle: "@linayahyaoui_", niches: "Sport  ·  Fitness", image: "/explorer/imane.png", position: "center 20%", platforms: ["instagram","tiktok"], followers: "154K", engagement: "6,3%", score: 87, city: "Tanger, Maroc" },
  { name: "mohamed vlog", handle: "@mohamed.vlog", niches: "Travel  ·  Lifestyle", image: "/explorer/youssef.png", position: "center 18%", platforms: ["youtube","instagram"], followers: "402K", engagement: "5,1%", score: 86, city: "Agadir, Maroc" },
  { name: "nada glow", handle: "@nadaglow", niches: "Beauty  ·  Lifestyle", image: "/explorer/maya.png", position: "center 18%", platforms: ["instagram","tiktok"], followers: "231K", engagement: "4,7%", score: 85, city: "Rabat, Maroc" },
] as const;

function PlatformBadge({ platform }: { platform: string }) {
  return <i className={`favorite-social ${platform}`} aria-label={platform}>{platform === "tiktok" ? "♪" : platform === "youtube" ? "▶" : ""}</i>;
}

export default function Favorites() {
  const [query, setQuery] = useState("");
  const [activeCollection, setActiveCollection] = useState("Tous mes favoris");
  const [selected, setSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>(creators.map((creator, index) => `${creator.handle}-${index}`));
  const [gridView, setGridView] = useState(true);
  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const visibleCreators = normalizedQuery ? creators.filter((creator) => creator.name.includes(normalizedQuery) || creator.handle.includes(normalizedQuery)) : creators;

  function creatorKey(creator: typeof creators[number], index: number) { return `${creator.handle}-${index}`; }
  function toggleSelection(key: string) { setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]); }
  function toggleFavorite(key: string) { setFavorites((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]); }
  function removeSelected() { setFavorites((current) => current.filter((key) => !selected.includes(key))); setSelected([]); }

  return (
    <main className="dashboard-page favorites-page">
      <AppSidebar active="favoris" />
      <section className="dashboard-main favorites-main">
        <header className="favorites-header">
          <div><h1>favoris <span>♡</span></h1><p>32 créateurs enregistrés</p></div>
          <label><i>⌕</i><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="rechercher un créateur dans vos favoris..." aria-label="Rechercher dans les favoris" /></label>
          <button type="button" className="favorites-analysis">✧&nbsp; analyser ma sélection</button>
          <button type="button" className="favorites-campaign">＋&nbsp; ajouter à une campagne</button>
          <button type="button" className="favorites-notification" aria-label="Notifications">♧<span>2</span></button>
          <button type="button" className="favorites-profile"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button>
        </header>

        <section className="favorites-filterbar">
          {filters.map(([label,value]) => <button type="button" key={label}><span><strong>{label}</strong><small>{value}</small></span><i>⌄</i></button>)}
          <button type="button" className="favorites-sort"><span><strong>trié par</strong><small>plus récent</small></span><i>⌄</i></button>
          <div className="favorites-view"><button type="button" className={gridView ? "active" : ""} onClick={() => setGridView(true)}>⊞</button><button type="button" className={!gridView ? "active" : ""} onClick={() => setGridView(false)}>☷</button></div>
        </section>

        <section className="favorites-workspace">
          <aside className="favorites-left">
            <section className="collections-card favorite-motion-card">
              <div className="favorite-section-heading"><h2>collections</h2><button type="button">＋ nouvelle collection</button></div>
              <nav>{collections.map(([icon,label,count],index) => <button type="button" className={activeCollection === label ? "active" : ""} onClick={() => setActiveCollection(label)} key={label}><i>{icon}</i><span>{label}</span><b>{count}</b></button>)}</nav>
              <button type="button" className="all-collections">voir toutes mes collections&nbsp; →</button>
            </section>

            <section className="favorite-insight-card favorite-motion-card">
              <h2>insight somatch AI <span>✦</span><i>♧</i></h2><strong>Votre sélection est équilibrée !</strong><p>Vous avez 32 créateurs dans 6 catégories différentes avec un excellent potentiel de complémentarité.</p>
              <div className="platform-distribution"><h3>répartition par plateforme</h3>{[["instagram","22 créateurs",68],["tiktok","18 créateurs",56],["youtube","6 créateurs",19]].map(([platform,count,value]) => <div key={platform as string}><PlatformBadge platform={platform as string} /><span>{count}</span><i><b style={{ width:`${value}%` }} /></i><strong>{value}%</strong></div>)}</div>
              <button type="button" className="favorite-gradient-button">analyser ma sélection&nbsp; ✣</button>
            </section>
          </aside>

          <div className="favorites-content">
            <section className="favorites-bulkbar favorite-motion-card"><label><input type="checkbox" checked={selected.length === visibleCreators.length && visibleCreators.length > 0} onChange={() => setSelected(selected.length === visibleCreators.length ? [] : visibleCreators.map((creator,index) => creatorKey(creator,index)))} /><span>{selected.length} sélectionné{selected.length > 1 ? "s" : ""}</span></label><div><button type="button">⇄&nbsp; comparer</button><button type="button">▣&nbsp; déplacer</button><button type="button" className="delete" onClick={removeSelected}>♙&nbsp; supprimer</button></div></section>
            <div className={`favorite-creator-grid ${gridView ? "" : "list-view"}`}>
              {visibleCreators.map((creator,index) => { const key=creatorKey(creator,index); return (
                <article className="favorite-creator-card favorite-motion-card" key={key}>
                  <div className="favorite-visual"><img src={creator.image} alt={creator.name} style={{ objectPosition:creator.position }} /><input type="checkbox" checked={selected.includes(key)} onChange={() => toggleSelection(key)} aria-label={`Sélectionner ${creator.name}`} /><button type="button" className={favorites.includes(key) ? "saved" : ""} onClick={() => toggleFavorite(key)}>{favorites.includes(key) ? "♥" : "♡"}</button></div>
                  <div className="favorite-card-copy"><h2>{creator.name} <i>◆</i></h2><small>{creator.handle}</small><p>{creator.niches}</p><div className="favorite-platforms">{creator.platforms.map((platform) => <PlatformBadge platform={platform} key={platform} />)}</div><div className="favorite-card-stats"><b>{creator.followers}<small>abonnés</small></b><b>{creator.engagement}<small>engagement</small></b><span className="favorite-score" style={{ "--score":`${creator.score * 3.6}deg` } as React.CSSProperties}><strong>{creator.score}</strong><small>/100</small></span></div><footer>⌾&nbsp; {creator.city}</footer></div>
                </article>
              ); })}
            </div>
          </div>
        </section>
        <p className="favorites-security">♢&nbsp; vos données sont sécurisées et confidentielles.</p>
        <button type="button" className="favorites-chat" aria-label="Ouvrir le chat">◯</button>
      </section>
    </main>
  );
}
