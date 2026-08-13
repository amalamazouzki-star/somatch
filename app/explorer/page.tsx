"use client";

import { useMemo, useState } from "react";
import { AppSidebar } from "../components/AppShell";

const categories = [
  ["♨", "Lifestyle"],
  ["ϟ", "Beauty"],
  ["♙", "Fashion"],
  ["♧", "Sport & Fitness"],
  ["◯", "Food"],
] as const;

const creators = [
  { name:"Hafsa Achraf", image:"/explorer/maya.png", niche:"Lifestyle · Méga", city:"Casablanca, Maroc", score:92, instagram:"1.4M", tiktok:"620K", youtube:"–", engagement:"5.2%", views:"620K", match:"Excellent match", budget:"22 000 MAD", verified:"green" },
  { name:"Amine HLS", image:"/explorer/amine.png", niche:"Family · Méga", city:"Marrakech, Maroc", score:89, instagram:"717K", tiktok:"1.2M", youtube:"210K", engagement:"4.7%", views:"1.2M", match:"Très bon match", budget:"21 000 MAD", verified:"dark" },
  { name:"Sofia HLS", image:"/explorer/sarah.png", niche:"Family · Méga", city:"Marrakech, Maroc", score:89, instagram:"667K", tiktok:"980K", youtube:"–", engagement:"4.5%", views:"980K", match:"Très bon match", budget:"20 000 MAD", verified:"dark" },
  { name:"Souhaila Abbad", image:"/explorer/salma.png", niche:"Lifestyle · Macro", city:"Kénitra, Maroc", score:85, instagram:"176K", tiktok:"92K", youtube:"–", engagement:"6.1%", views:"92K", match:"Bon match", budget:"15 000 MAD", verified:"dark" },
] as const;

function SelectField({ label, value, options = [value] }: { label:string; value:string; options?:readonly string[] }) {
  return <label className="advanced-select-field"><span>{label}</span><select defaultValue={value}>{options.map(option=><option key={option}>{option}</option>)}</select></label>;
}

function RangeControl({ label, min, max, progress = "72%", dual = true }: { label:string; min:string; max:string; progress?:string; dual?:boolean }) {
  return <div className="advanced-range"><span>{label}</span><div className="advanced-range-values"><b>Min　 {min}</b><b>{dual ? `Max　 ${max}` : max}</b></div><div className="advanced-range-line"><i style={{ width:progress }} /><em className="range-start"/><em className="range-end" style={{ left:progress }}/></div></div>;
}

function SocialMetric({ platform, value }: { platform:"instagram"|"tiktok"|"youtube"; value:string }) {
  return <span className="advanced-social-metric"><i className={`advanced-social ${platform}`}>{platform === "instagram" ? "◎" : platform === "tiktok" ? "♪" : "▶"}</i><strong>{value}</strong></span>;
}

function CreatorResultCard({ creator, saved, onSave }: { creator:typeof creators[number]; saved:boolean; onSave:()=>void }) {
  return <article className="advanced-creator-card">
    <header><span className="creator-rank">♨　{creator.score}</span><button type="button" aria-label={`Options pour ${creator.name}`}>⋮</button></header>
    <div className="advanced-creator-avatar"><img src={creator.image} alt={creator.name}/><i className={creator.verified}>✓</i></div>
    <h2>{creator.name}</h2><p>{creator.niche}</p><small>⌾　{creator.city}</small>
    <div className="advanced-social-row"><SocialMetric platform="instagram" value={creator.instagram}/><SocialMetric platform="tiktok" value={creator.tiktok}/><SocialMetric platform="youtube" value={creator.youtube}/></div>
    <div className="advanced-performance"><span>Engagement<strong>{creator.engagement}</strong></span><span>Vues moyennes<strong>{creator.views}</strong></span></div>
    <div className="advanced-match"><b>{creator.score}</b><strong>{creator.match}</strong></div>
    <footer><span>Budget estimé<strong>{creator.budget}</strong><small>par collaboration</small></span><button className={saved ? "saved" : ""} type="button" onClick={onSave} aria-label={`${saved ? "Retirer" : "Ajouter"} ${creator.name} des favoris`}>{saved ? "▮" : "▯"}</button></footer>
  </article>;
}

function FilterSection({ index, title, children, open, onToggle }: { index:number; title:string; children:React.ReactNode; open:boolean; onToggle:()=>void }) {
  return <section className={`advanced-drawer-section ${open ? "open" : "closed"}`}><button className="advanced-section-title" type="button" onClick={onToggle}><strong>{index}. {title}</strong><span>{open ? "⌃" : "⌄"}</span></button>{open ? <div className="advanced-section-body">{children}</div> : null}</section>;
}

export default function Explorer() {
  const [search,setSearch]=useState("");
  const [drawerOpen,setDrawerOpen]=useState(true);
  const [savedSearch,setSavedSearch]=useState(false);
  const [savedCreators,setSavedCreators]=useState<string[]>([]);
  const [activeFilters,setActiveFilters]=useState(["Maroc","Instagram","Engagement ≥ 3%","Somatch Score ≥ 80"]);
  const [selectedCategories,setSelectedCategories]=useState(["Lifestyle"]);
  const [platforms,setPlatforms]=useState(["Instagram","TikTok"]);
  const [level,setLevel]=useState("Micro");
  const [gridView,setGridView]=useState(true);
  const [openSections,setOpenSections]=useState([1,2,3,4,5]);

  const visibleCreators=useMemo(()=>{
    const query=search.trim().toLowerCase();
    return query ? creators.filter(creator=>`${creator.name} ${creator.niche} ${creator.city}`.toLowerCase().includes(query)) : creators;
  },[search]);

  const toggleArray=(value:string,current:string[],setter:(next:string[])=>void)=>setter(current.includes(value)?current.filter(item=>item!==value):[...current,value]);
  const toggleSection=(index:number)=>setOpenSections(current=>current.includes(index)?current.filter(item=>item!==index):[...current,index]);
  const resetAll=()=>{setActiveFilters([]);setPlatforms([]);setLevel("");setSelectedCategories([]);setSearch("");};

  return <main className="dashboard-page advanced-explorer-page">
    <AppSidebar active="explorer"/>
    <div className="advanced-explorer-workspace">
      <section className="advanced-explorer-content">
        <header className="advanced-explorer-header"><div><h1>Explorer les influenceurs</h1><p>Trouvez les créateurs parfaits pour votre prochaine campagne.</p></div><div><button className={savedSearch ? "is-saved" : ""} type="button" onClick={()=>setSavedSearch(value=>!value)}>▯　{savedSearch ? "Recherche enregistrée ✓" : "Enregistrer la recherche"}</button><button className="open-advanced-filters" type="button" onClick={()=>setDrawerOpen(true)}>☷　Filtres avancés <b>{activeFilters.length > 0 ? 2 : 0}</b></button></div></header>
        <label className="advanced-explorer-search"><span>⌕</span><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Rechercher un créateur, une catégorie, un mot-clé..." aria-label="Rechercher un créateur"/></label>
        <nav className="advanced-category-nav" aria-label="Catégories de créateurs">{categories.map(([icon,label])=><button className={selectedCategories.includes(label)?"selected":""} type="button" key={label} onClick={()=>toggleArray(label,selectedCategories,setSelectedCategories)}><i>{icon}</i>{label}</button>)}<button type="button">Plus de catégories　⌄</button></nav>
        <section className="active-filter-bar"><strong>Filtres actifs :</strong>{activeFilters.map(filter=><button type="button" key={filter} onClick={()=>setActiveFilters(current=>current.filter(item=>item!==filter))}>{filter}　×</button>)}<button className="clear-active-filters" type="button" onClick={()=>setActiveFilters([])}>♙　Tout effacer</button></section>
        <div className="advanced-results-toolbar"><strong>{search ? visibleCreators.length : 247} créateurs trouvés</strong><div><label>Trier par : <select defaultValue="Pertinence"><option>Pertinence</option><option>Engagement</option><option>Somatch Score</option></select></label><span className="advanced-view-toggle"><button className={gridView?"active":""} type="button" onClick={()=>setGridView(true)}>⊞</button><button className={!gridView?"active":""} type="button" onClick={()=>setGridView(false)}>☷</button></span></div></div>
        <section className={`advanced-results-grid ${gridView?"":"list"}`}>{visibleCreators.map(creator=><CreatorResultCard key={creator.name} creator={creator} saved={savedCreators.includes(creator.name)} onSave={()=>toggleArray(creator.name,savedCreators,setSavedCreators)}/>)}{visibleCreators.length===0?<div className="advanced-empty"><strong>Aucun créateur trouvé</strong><span>Essayez un autre nom ou mot-clé.</span></div>:null}</section>
        <section className="advanced-ai-help"><i>♙</i><span><strong>Besoin d’aide ?</strong><small>Utilisez somatch AI pour obtenir une sélection personnalisée selon votre brief.</small></span><a href="/somatch-ai">Lancer somatch AI　✣</a></section>
      </section>
      <aside className={`advanced-filter-drawer ${drawerOpen?"open":"closed"}`} aria-hidden={!drawerOpen}>
        <header><h2>Filtres avancés</h2><button type="button" aria-label="Fermer les filtres avancés" onClick={()=>setDrawerOpen(false)}>×</button></header>
        <div className="advanced-drawer-scroll">
          <FilterSection index={1} title="Profil du créateur" open={openSections.includes(1)} onToggle={()=>toggleSection(1)}><div className="drawer-two-columns"><SelectField label="Pays" value="Maroc" options={["Maroc","France","Algérie"]}/><SelectField label="Ville" value="Toutes les villes"/><SelectField label="Genre" value="Tous"/><SelectField label="Langue" value="Toutes"/><SelectField label="Catégorie principale" value="Toutes les catégories"/><div className="advanced-level"><span>Niveau</span><div>{["Nano","Micro","Macro","Méga"].map(item=><button className={level===item?"active":""} type="button" key={item} onClick={()=>setLevel(item)}>{item}</button>)}</div></div></div></FilterSection>
          <FilterSection index={2} title="Réseaux & communauté" open={openSections.includes(2)} onToggle={()=>toggleSection(2)}><div className="platform-choice"><span>Plateformes</span><div>{["Instagram","TikTok","YouTube"].map(item=><label className={platforms.includes(item)?"checked":""} key={item}><input type="checkbox" checked={platforms.includes(item)} onChange={()=>toggleArray(item,platforms,setPlatforms)}/>{item}</label>)}</div></div><RangeControl label="Followers (par réseau principal)" min="10K" max="5M+" progress="88%"/></FilterSection>
          <FilterSection index={3} title="Performance" open={openSections.includes(3)} onToggle={()=>toggleSection(3)}><div className="drawer-two-columns performance-ranges"><RangeControl label="Engagement moyen" min="3%" max="" progress="72%" dual={false}/><RangeControl label="Vues moyennes (par contenu)" min="10K" max="+" progress="58%" dual={false}/><RangeControl label="Interactions moyennes" min="1K" max="+" progress="64%" dual={false}/></div></FilterSection>
          <FilterSection index={4} title="Audience" open={openSections.includes(4)} onToggle={()=>toggleSection(4)}><div className="drawer-two-columns"><RangeControl label="Âge moyen des followers" min="18" max="35" progress="78%"/><RangeControl label="Genre des followers" min="60% Femmes" max="100%" progress="62%"/><SelectField label="Pays / villes des followers" value="Maroc"/><div className="add-city"><span>&nbsp;</span><button type="button">＋ Ajouter une ville</button></div></div></FilterSection>
          <FilterSection index={5} title="Qualité somatch" open={openSections.includes(5)} onToggle={()=>toggleSection(5)}><RangeControl label="somatch Score minimum" min="" max="80" progress="78%" dual={false}/><div className="drawer-two-columns quality-selects"><SelectField label="Authenticité de l’audience" value="Élevée et très élevée"/><SelectField label="Brand Fit" value="Bon fit et excellent fit"/></div></FilterSection>
        </div>
        <footer><button type="button" onClick={resetAll}>Réinitialiser</button><button type="button" onClick={()=>setDrawerOpen(false)}>Afficher 247 créateurs　⌕</button></footer>
      </aside>
    </div>
  </main>;
}
