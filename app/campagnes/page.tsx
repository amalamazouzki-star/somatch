"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";
import { SocialLogo, type SocialNetwork } from "../components/SocialLogo";

const campaigns = [
  { id:"CMP-2026-007", name:"Kinder – Back to School 2026", brand:"Kinder", objective:"Notoriété & Engagement", budget:"150 000 MAD", date:"10 août 2026", status:"En préparation", image:"/dashboard/campaign-glow.png", avatars:["/explorer/salma.png","/explorer/amine.png","/explorer/youssef.png"], more:2 },
  { id:"CMP-2026-006", name:"LC Waikiki – Collection automne", brand:"LC WAIKIKI", objective:"Notoriété", budget:"120 000 MAD", date:"2 août 2026", status:"En cours", image:"/dashboard/campaign-summer.png", avatars:["/explorer/youssef.png","/explorer/lina.png","/explorer/sarah.png"], more:4 },
  { id:"CMP-2026-005", name:"Filorga – Time-Filler 5XP", brand:"FILORGA", objective:"Lancement de produit", budget:"180 000 MAD", date:"18 juil. 2026", status:"Brouillon", image:"/dashboard/campaign-cafe.png", avatars:["/explorer/amine.png","/explorer/youssef.png","/explorer/sarah.png"], more:3 },
  { id:"CMP-2026-004", name:"Sonarges – Infrastructures sportives", brand:"SONARGES", objective:"Image et fierté nationale", budget:"200 000 MAD", date:"5 juin 2026", status:"Terminée", image:"/influencer-collage.png", avatars:["/explorer/maya.png","/explorer/nour.png","/explorer/amine.png"], more:6 },
  { id:"CMP-2026-003", name:"Uriage – Hyséac UGC", brand:"URIAGE", objective:"UGC et engagement", budget:"80 000 MAD", date:"20 mai 2026", status:"Terminée", image:"/dashboard/campaign-cafe.png", avatars:["/explorer/lina.png","/explorer/nour.png","/explorer/sarah.png"], more:1 },
] as const;

const additionalCampaigns = [
  { id:"CMP-2026-002", name:"Lemon Mind – Créateurs B2B", brand:"LEMON MIND", objective:"Notoriété de marque", budget:"95 000 MAD", date:"8 avr. 2026", status:"Terminée", image:"/dashboard/campaign-glow.png", avatars:["/explorer/maya.png","/explorer/amine.png","/explorer/lina.png"], more:2 },
  { id:"CMP-2026-001", name:"Café du Matin – Nouveaux rituels", brand:"CAFÉ DU MATIN", objective:"Engagement", budget:"65 000 MAD", date:"12 mars 2026", status:"Terminée", image:"/dashboard/campaign-cafe.png", avatars:["/explorer/nour.png","/explorer/salma.png","/explorer/youssef.png"], more:1 },
] as const;

const allCampaigns = [...campaigns, ...additionalCampaigns] as const;

const selectedCreators = [
  {name:"Souhaila Abbad",handle:"@souhailaabbad",image:"/explorer/salma.png",followers:"176 K",engagement:"5,2 %",platforms:["instagram","tiktok"]},
  {name:"Amine HLS",handle:"@amine.hls",image:"/explorer/amine.png",followers:"718 K",engagement:"6,1 %",platforms:["instagram","tiktok","youtube"]},
  {name:"Lina Yahyaoui",handle:"@linayahyaoui",image:"/explorer/lina.png",followers:"284 K",engagement:"4,8 %",platforms:["instagram","tiktok"]},
  {name:"Fatiyass",handle:"@fatiyass.off",image:"/explorer/sarah.png",followers:"198 K",engagement:"5,0 %",platforms:["tiktok","instagram"]},
  {name:"Lamiae Skalli",handle:"@lamiae.skalli",image:"/explorer/nour.png",followers:"312 K",engagement:"4,6 %",platforms:["instagram"]},
] as const;

function SocialBadge({ platform }: { platform:Extract<SocialNetwork,"instagram"|"tiktok"|"youtube"> }) { const labels={instagram:"Instagram",tiktok:"TikTok",youtube:"YouTube"} as const; return <i className={`campaign-social ${platform}`} role="img" aria-label={labels[platform]}><SocialLogo network={platform}/></i>; }
function StatusBadge({ status }: { status:string }) { const key=status.toLowerCase().replace(/\s+/g,"-").normalize("NFD").replace(/[\u0300-\u036f]/g,""); return <span className={`campaign-status ${key}`}>{status}</span>; }

export default function Campaigns() {
  const [query,setQuery]=useState("");
  const [selectedId,setSelectedId]=useState(campaigns[0].id);
  const [activeTab,setActiveTab]=useState("aperçu");
  const [expanded,setExpanded]=useState(false);
  const [statusFilter,setStatusFilter]=useState<"Tous les statuts"|"En cours"|"Terminée">("Tous les statuts");
  const [periodFilter,setPeriodFilter]=useState<"Toute la période"|"Année 2026">("Toute la période");
  const [analysisReady,setAnalysisReady]=useState(false);
  const selected=allCampaigns.find((campaign)=>campaign.id===selectedId) ?? campaigns[0];
  const normalized=query.trim().toLocaleLowerCase("fr");
  const visible=(expanded ? allCampaigns : campaigns).filter((campaign)=>(statusFilter==="Tous les statuts" || campaign.status===statusFilter) && (!normalized || campaign.name.toLocaleLowerCase("fr").includes(normalized) || campaign.brand.toLocaleLowerCase("fr").includes(normalized) || campaign.objective.toLocaleLowerCase("fr").includes(normalized)));

  function cycleStatus() { setStatusFilter(current=>current==="Tous les statuts"?"En cours":current==="En cours"?"Terminée":"Tous les statuts"); }

  return (
    <main className="dashboard-page campaigns-page">
      <AppSidebar active="mes campagnes" />
      <section className="dashboard-main campaigns-main">
        <header className="campaigns-header"><div><h1>Mes campagnes</h1><p>Gérez toutes vos campagnes d’influence au même endroit.</p></div><div className="campaign-user-actions"><NotificationTrigger /><button type="button" className="profile-menu"><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><span>⌄</span></button></div></header>
        <section className="campaign-toolbar"><label><i>⌕</i><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Rechercher une campagne…" aria-label="Rechercher une campagne" /></label><button type="button" aria-label="Filtrer par statut" onClick={cycleStatus}>{statusFilter} <span>⌄</span></button><button type="button" aria-label="Filtrer par période" onClick={()=>setPeriodFilter(value=>value==="Toute la période"?"Année 2026":"Toute la période")}>▣&nbsp; {periodFilter} <span>⌄</span></button><a href="/campagnes/creer" className="campaign-create">＋&nbsp; Créer une campagne</a></section>

        <section className="campaign-table campaign-motion-card">
          <div className="campaign-table-head"><span>Campagne</span><span>Marque</span><span>Objectif</span><span>Budget estimé</span><span>Influenceurs</span><span>Créée le</span><span>Statut</span><span>Actions</span></div>
          <div className="campaign-table-body">{visible.map((campaign)=><button type="button" className={selectedId===campaign.id ? "selected" : ""} aria-pressed={selectedId===campaign.id} onClick={()=>setSelectedId(campaign.id)} key={campaign.id}><span className="campaign-name"><img src={campaign.image} alt={campaign.name} /><span><strong>{campaign.name}</strong><small>ID : {campaign.id}</small></span></span><b className="campaign-brand">{campaign.brand}</b><span>{campaign.objective}</span><span>{campaign.budget}</span><span className="campaign-avatars">{campaign.avatars.map((avatar,i)=><img src={avatar} alt={`Influenceur ${i+1} de ${campaign.name}`} key={avatar+i} />)}<b>+{campaign.more}</b></span><span>{campaign.date}</span><StatusBadge status={campaign.status} /><i aria-hidden="true">⋮</i></button>)}</div>
          {visible.length===0 && <div className="campaign-empty"><strong>Aucune campagne trouvée</strong><span>Modifiez votre recherche ou vos filtres.</span><button type="button" onClick={()=>{setQuery("");setStatusFilter("Tous les statuts");}}>Réinitialiser les filtres</button></div>}
          <button type="button" className="campaign-more" aria-expanded={expanded} onClick={()=>setExpanded((value)=>!value)}>{expanded ? "Réduire la liste" : "Voir plus de campagnes"}&nbsp;⌄</button>
        </section>

        <section className="campaign-detail campaign-motion-card">
          <aside className="campaign-detail-nav"><div><img src={selected.image} alt={selected.name} /><span><strong>{selected.name.replace(" 2026","")}</strong><StatusBadge status={selected.status} /></span></div><nav>{[["⊞","Aperçu"],["♙","Influenceurs (5)"],["▤","Brief et stratégie"],["▣","Budget et paiements"],["▣","Planning"],["▢","Documents"],["□","Notes"]].map(([icon,label])=><button type="button" aria-pressed={activeTab===label.toLocaleLowerCase("fr")} className={activeTab===label.toLocaleLowerCase("fr") ? "active" : ""} onClick={()=>setActiveTab(label.toLocaleLowerCase("fr"))} key={label}><i>{icon}</i>{label}</button>)}</nav></aside>
          <div className="campaign-detail-content">
            <section className="campaign-summary-strip">{[["◎","Objectif",selected.objective],["▣","Budget estimé",selected.budget],["♙","Influenceurs sélectionnés","5 / 8"],["▤","Formats principaux","Reels, Stories"],["▣","Période","Septembre 2026"]].map(([icon,label,value])=><article key={label}><i>{icon}</i><span><small>{label}</small><strong>{value}</strong></span></article>)}</section>
            <div className="campaign-info-grid"><article><h2>Brief de la campagne</h2><p>Mettre en avant Kinder comme le compagnon idéal des petits au quotidien et soutenir les parents pendant la rentrée scolaire.<br />Ton bienveillant, familial et positif.</p><div>{["Parents de 25 à 40 ans","Maroc","Instagram, TikTok, YouTube","Famille, Lifestyle, Vie de maman","UGC, Unboxing"].map(tag=><span key={tag}>{tag}</span>)}</div></article><article className="campaign-budget"><h2>Répartition du budget</h2><div className="budget-donut" role="img" aria-label="Répartition du budget : 70 % influenceurs, 20 % production et 10 % gestion"><strong>150 000<small>MAD</small></strong></div><ul><li><i className="pink"/><span>Rémunération des influenceurs<br /><b>105 000 MAD</b></span><strong>70 %</strong></li><li><i className="orange"/><span>Production et contenus<br /><b>20 000 MAD</b></span><strong>20 %</strong></li><li><i className="yellow"/><span>Gestion et suivi<br /><b>15 000 MAD</b></span><strong>10 %</strong></li></ul></article><article className="campaign-performance"><h2>Performance estimée&nbsp; ⓘ</h2><div><strong className="pink">2,8 M<small>Couverture estimée<br />Comptes uniques</small></strong><strong className="orange">6,4 %<small>Engagement estimé<br />Taux moyen</small></strong><strong className="purple">3,1 M<small>Vues estimées<br />Toutes plateformes</small></strong></div></article></div>
            <section className="campaign-creators"><div className="campaign-section-heading"><h2>Influenceurs sélectionnés (5)</h2><a href="/explorer">Voir tous (5)</a></div><div>{selectedCreators.map((creator)=><a href="/influenceur/maya-el-amrani" key={creator.name}><img src={creator.image} alt={creator.name}/><span><strong>{creator.name} <i aria-label="Profil vérifié">◆</i></strong><small>{creator.handle}</small><b>{creator.followers} abonnés</b><em>{creator.engagement} d’engagement</em><span>{creator.platforms.map(platform=><SocialBadge platform={platform} key={platform}/>)}</span></span></a>)}</div></section>
            <aside className="campaign-ai-card"><h2>✧&nbsp; SoMatch AI</h2><p>Besoin d’optimiser votre casting ?<br />Notre IA peut analyser votre sélection et vous proposer des recommandations.</p><button className={analysisReady?"active":""} type="button" aria-pressed={analysisReady} onClick={()=>setAnalysisReady(true)}>{analysisReady?"Analyse prête ✓":"Analyser cette campagne ✣"}</button></aside>
          </div>
        </section>
      </section>
    </main>
  );
}
