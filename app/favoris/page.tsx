"use client";

import { useState, type CSSProperties } from "react";
import { AppSidebar } from "../components/AppShell";
import { InfluencerProfileLink } from "../components/InfluencerProfileLink";
import { NotificationTrigger } from "../components/NotificationCenter";
import { SocialLogo, type SocialNetwork } from "../components/SocialLogo";

const collections = [
  ["♥", "Tous mes favoris", 32], ["▣", "Kinder BTS 2026", 14], ["♙", "Campagne Beauté", 8], ["♨", "Ramadan 2026", 6], ["▤", "À présenter au client", 12], ["♧", "Ambassadeurs potentiels", 5],
] as const;

const filters = [["Catégorie", "Toutes"], ["Plateforme", "Toutes"], ["Niveau", "Tous"], ["Localisation", "Toutes"], ["SoMatch Score", "Tous"]] as const;

const creators = [
  { id:"souhaila-abbad", name: "Souhaila Abbad", handle: "@souhailaabbad", niches: "Vie de maman · Lifestyle", image: "/explorer/salma.png", position: "center 16%", platforms: ["instagram","tiktok"], followers: "176 K", engagement: "5,2 %", score: 92, city: "Casablanca, Maroc" },
  { id:"amine-hls", name: "Amine HLS", handle: "@amine.hls", niches: "Famille · Lifestyle", image: "/explorer/amine.png", position: "center 18%", platforms: ["instagram","tiktok","youtube"], followers: "718 K", engagement: "6,1 %", score: 91, city: "Marrakech, Maroc" },
  { id:"lina-yahyaoui", name: "Lina Yahyaoui", handle: "@linayahyaoui", niches: "Vie de maman · Lifestyle", image: "/explorer/lina.png", position: "center 17%", platforms: ["instagram","tiktok"], followers: "284 K", engagement: "4,8 %", score: 90, city: "Rabat, Maroc" },
  { id:"fatiyass", name: "Fatiyass", handle: "@fatiyass.off", niches: "Famille · Lifestyle", image: "/explorer/sarah.png", position: "center 18%", platforms: ["tiktok","instagram"], followers: "198 K", engagement: "5,0 %", score: 90, city: "Casablanca, Maroc" },
  { id:"lamiae-skalli", name: "Lamiae Skalli", handle: "@lamiae.skalli", niches: "Lifestyle · Vie de maman", image: "/explorer/nour.png", position: "center 20%", platforms: ["instagram"], followers: "312 K", engagement: "4,6 %", score: 88, city: "Casablanca, Maroc" },
  { id:"lina-yahyaoui-sport", name: "Lina Yahyaoui", handle: "@linayahyaoui_", niches: "Sport · Fitness", image: "/explorer/imane.png", position: "center 20%", platforms: ["instagram","tiktok"], followers: "154 K", engagement: "6,3 %", score: 87, city: "Tanger, Maroc" },
  { id:"mohamed-vlog", name: "Mohamed Vlog", handle: "@mohamed.vlog", niches: "Voyage · Lifestyle", image: "/explorer/youssef.png", position: "center 18%", platforms: ["youtube","instagram"], followers: "402 K", engagement: "5,1 %", score: 86, city: "Agadir, Maroc" },
  { id:"nada-glow", name: "Nada Glow", handle: "@nadaglow", niches: "Beauté · Lifestyle", image: "/explorer/maya.png", position: "center 18%", platforms: ["instagram","tiktok"], followers: "231 K", engagement: "4,7 %", score: 85, city: "Rabat, Maroc" },
] as const;

function PlatformBadge({ platform }: { platform:Extract<SocialNetwork,"instagram"|"tiktok"|"youtube"> }) {
  const labels = { instagram:"Instagram", tiktok:"TikTok", youtube:"YouTube" } as const;
  return <i className={`favorite-social ${platform}`} role="img" aria-label={labels[platform]}><SocialLogo network={platform}/></i>;
}

export default function Favorites() {
  const [query, setQuery] = useState("");
  const [activeCollection, setActiveCollection] = useState("Tous mes favoris");
  const [selected, setSelected] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>(creators.map((creator) => creator.id));
  const [gridView, setGridView] = useState(true);
  const [analysisReady, setAnalysisReady] = useState(false);
  const [collectionCreated, setCollectionCreated] = useState(false);
  const [moved, setMoved] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const favoriteCreators = creators.filter((creator) => favorites.includes(creator.id));
  const visibleCreators = normalizedQuery ? favoriteCreators.filter((creator) => creator.name.toLocaleLowerCase("fr").includes(normalizedQuery) || creator.handle.toLocaleLowerCase("fr").includes(normalizedQuery)) : favoriteCreators;
  const totalFavorites = 24 + favorites.length;

  function toggleSelection(key: string) { setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]); }
  function toggleFavorite(key: string) { setFavorites((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]); }
  function removeSelected() { setFavorites((current) => current.filter((key) => !selected.includes(key))); setSelected([]); }

  return (
    <main className="dashboard-page favorites-page">
      <AppSidebar active="favoris" />
      <section className="dashboard-main favorites-main">
        <header className="favorites-header">
          <div><h1>Favoris <span>♡</span></h1><p>{totalFavorites} créateurs enregistrés</p></div>
          <label><i>⌕</i><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un créateur dans vos favoris…" aria-label="Rechercher dans les favoris" /></label>
          <button type="button" className={analysisReady?"favorites-analysis active":"favorites-analysis"} aria-pressed={analysisReady} onClick={()=>setAnalysisReady(true)}>✧&nbsp; {analysisReady?"Analyse prête ✓":"Analyser ma sélection"}</button>
          <a className="favorites-campaign" href="/campagnes/creer">＋&nbsp; Ajouter à une campagne</a>
          <NotificationTrigger className="favorites-notification" />
          <button type="button" className="favorites-profile"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button>
        </header>

        <section className="favorites-filterbar">
          {filters.map(([label,value]) => <button type="button" key={label}><span><strong>{label}</strong><small>{value}</small></span><i>⌄</i></button>)}
          <button type="button" className="favorites-sort"><span><strong>Trier par</strong><small>Plus récent</small></span><i>⌄</i></button>
          <div className="favorites-view" role="group" aria-label="Mode d’affichage"><button type="button" aria-label="Afficher en grille" aria-pressed={gridView} className={gridView ? "active" : ""} onClick={() => setGridView(true)}>⊞</button><button type="button" aria-label="Afficher en liste" aria-pressed={!gridView} className={!gridView ? "active" : ""} onClick={() => setGridView(false)}>☷</button></div>
        </section>

        <section className="favorites-workspace">
          <aside className="favorites-left">
            <section className="collections-card favorite-motion-card">
              <div className="favorite-section-heading"><h2>Collections</h2><button type="button" aria-pressed={collectionCreated} onClick={()=>setCollectionCreated(true)}>＋ {collectionCreated?"Collection créée ✓":"Nouvelle collection"}</button></div>
              <nav>{collections.map(([icon,label,count],index) => <button type="button" className={activeCollection === label ? "active" : ""} onClick={() => setActiveCollection(label)} key={label}><i>{icon}</i><span>{label}</span><b>{count}</b></button>)}</nav>
              <button type="button" className="all-collections">Voir toutes mes collections&nbsp; →</button>
            </section>

            <section className="favorite-insight-card favorite-motion-card">
              <h2>Insight SoMatch AI <span>✦</span><i>♧</i></h2><strong>Votre sélection est équilibrée !</strong><p>Vous avez {totalFavorites} créateurs dans 6 catégories différentes, avec un excellent potentiel de complémentarité.</p>
              <div className="platform-distribution"><h3>Répartition par plateforme</h3>{[["instagram","22 créateurs",68],["tiktok","18 créateurs",56],["youtube","6 créateurs",19]].map(([platform,count,value]) => <div key={platform as string}><PlatformBadge platform={platform as Extract<SocialNetwork,"instagram"|"tiktok"|"youtube">} /><span>{count}</span><i><b style={{ width:`${value}%` }} /></i><strong>{value} %</strong></div>)}</div>
              <button type="button" className="favorite-gradient-button" onClick={()=>setAnalysisReady(true)}>{analysisReady?"Analyse prête ✓":"Analyser ma sélection ✣"}</button>
            </section>
          </aside>

          <div className="favorites-content">
            <section className="favorites-bulkbar favorite-motion-card"><label><input type="checkbox" checked={selected.length === visibleCreators.length && visibleCreators.length > 0} onChange={() => setSelected(selected.length === visibleCreators.length ? [] : visibleCreators.map((creator) => creator.id))} /><span>{selected.length} sélectionné{selected.length > 1 ? "s" : ""}</span></label><div><a href="/comparer">⇄&nbsp; Comparer</a><button className={moved?"active":""} type="button" onClick={()=>setMoved(true)}>▣&nbsp; {moved?"Déplacé ✓":"Déplacer"}</button><button type="button" className="delete" disabled={selected.length===0} onClick={removeSelected}>♙&nbsp; Supprimer</button></div></section>
            <div className={`favorite-creator-grid ${gridView ? "" : "list-view"}`}>
              {visibleCreators.map((creator) => { const key=creator.id; return (
                <article className="favorite-creator-card favorite-motion-card influencer-card-target" key={key}>
                  <InfluencerProfileLink name={creator.name} />
                  <div className="favorite-visual influencer-card-controls"><img src={creator.image} alt={creator.name} style={{ objectPosition:creator.position }} /><input type="checkbox" checked={selected.includes(key)} onChange={() => toggleSelection(key)} aria-label={`Sélectionner ${creator.name}`} /><button type="button" aria-pressed={favorites.includes(key)} aria-label={`Retirer ${creator.name} des favoris`} className={favorites.includes(key) ? "saved" : ""} onClick={() => toggleFavorite(key)}>{favorites.includes(key) ? "♥" : "♡"}</button></div>
                  <div className="favorite-card-copy"><h2>{creator.name} <i aria-label="Profil vérifié">◆</i></h2><small>{creator.handle}</small><p>{creator.niches}</p><div className="favorite-platforms">{creator.platforms.map((platform) => <PlatformBadge platform={platform} key={platform} />)}</div><div className="favorite-card-stats"><b>{creator.followers}<small>Abonnés</small></b><b>{creator.engagement}<small>Engagement</small></b><span className="favorite-score" role="img" aria-label={`SoMatch Score : ${creator.score} sur 100`} style={{ "--score":`${creator.score * 3.6}deg` } as CSSProperties}><strong>{creator.score}</strong><small>/100</small></span></div><footer>⌾&nbsp; {creator.city}</footer></div>
                </article>
              ); })}
            </div>
            {visibleCreators.length === 0 && <section className="favorites-empty favorite-motion-card"><span>♡</span><h2>Aucun favori trouvé</h2><p>{query ? "Aucun créateur ne correspond à votre recherche." : "Votre sélection de favoris est vide."}</p>{query ? <button type="button" onClick={()=>setQuery("")}>Effacer la recherche</button> : <a href="/explorer">Explorer les créateurs</a>}</section>}
          </div>
        </section>
        <p className="favorites-security">♢&nbsp; Vos données sont sécurisées et confidentielles.</p>
        <button type="button" className="favorites-chat" aria-label="Ouvrir le chat">◯</button>
      </section>
    </main>
  );
}
