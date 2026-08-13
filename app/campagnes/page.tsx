"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";

const campaigns = [
  { id:"CMP-2026-007", name:"Kinder – Back to School 2026", brand:"Kinder", objective:"Notoriété & Engagement", budget:"150 000 MAD", date:"10 août 2026", status:"En préparation", image:"/dashboard/campaign-glow.png", avatars:["/explorer/salma.png","/explorer/amine.png","/explorer/youssef.png"], more:2 },
  { id:"CMP-2026-006", name:"LC Waikiki – Fall Collection", brand:"LC WAIKIKI", objective:"Awareness", budget:"120 000 MAD", date:"2 août 2026", status:"En cours", image:"/dashboard/campaign-summer.png", avatars:["/explorer/youssef.png","/explorer/lina.png","/explorer/sarah.png"], more:4 },
  { id:"CMP-2026-005", name:"Filorga – Time-Filler 5XP", brand:"FILORGA", objective:"Lancement produit", budget:"180 000 MAD", date:"18 juil. 2026", status:"Brouillon", image:"/dashboard/campaign-cafe.png", avatars:["/explorer/amine.png","/explorer/youssef.png","/explorer/sarah.png"], more:3 },
  { id:"CMP-2026-004", name:"Sonarges – Infrastructures Sportives", brand:"SONARGES", objective:"Image & Fierté nationale", budget:"200 000 MAD", date:"5 juin 2026", status:"Terminée", image:"/influencer-collage.png", avatars:["/explorer/maya.png","/explorer/nour.png","/explorer/amine.png"], more:6 },
  { id:"CMP-2026-003", name:"Uriage – Hyseac UGC", brand:"URIAGE", objective:"UGC & Engagement", budget:"80 000 MAD", date:"20 mai 2026", status:"Terminée", image:"/dashboard/campaign-cafe.png", avatars:["/explorer/lina.png","/explorer/nour.png","/explorer/sarah.png"], more:1 },
] as const;

const selectedCreators = [
  {name:"souhaila abbad",handle:"@souhailaabbad",image:"/explorer/salma.png",followers:"176K",engagement:"5,2%",platforms:["instagram","tiktok"]},
  {name:"amine hls",handle:"@amine.hls",image:"/explorer/amine.png",followers:"718K",engagement:"6,1%",platforms:["instagram","tiktok","youtube"]},
  {name:"lina yahyaoui",handle:"@linayahyaoui",image:"/explorer/lina.png",followers:"284K",engagement:"4,8%",platforms:["instagram","tiktok"]},
  {name:"fatiyass",handle:"@fatiyass.off",image:"/explorer/sarah.png",followers:"198K",engagement:"5,0%",platforms:["tiktok","instagram"]},
  {name:"lamiae skalli",handle:"@lamiae.skalli",image:"/explorer/nour.png",followers:"312K",engagement:"4,6%",platforms:["instagram"]},
] as const;

function SocialBadge({ platform }: { platform:string }) { return <i className={`campaign-social ${platform}`} aria-label={platform}>{platform === "tiktok" ? "♪" : platform === "youtube" ? "▶" : ""}</i>; }
function StatusBadge({ status }: { status:string }) { const key=status.toLowerCase().replace(" ","-").normalize("NFD").replace(/[\u0300-\u036f]/g,""); return <span className={`campaign-status ${key}`}>{status}</span>; }

export default function Campaigns() {
  const [query,setQuery]=useState("");
  const [selectedId,setSelectedId]=useState(campaigns[0].id);
  const [activeTab,setActiveTab]=useState("aperçu");
  const [expanded,setExpanded]=useState(false);
  const selected=campaigns.find((campaign)=>campaign.id===selectedId) ?? campaigns[0];
  const normalized=query.trim().toLocaleLowerCase("fr");
  const visible=(expanded ? [...campaigns,...campaigns.slice(1,3)] : campaigns).filter((campaign)=>!normalized || campaign.name.toLocaleLowerCase("fr").includes(normalized));

  return (
    <main className="dashboard-page campaigns-page">
      <AppSidebar active="mes campagnes" />
      <section className="dashboard-main campaigns-main">
        <header className="campaigns-header"><div><h1>mes campagnes</h1><p>gérez toutes vos campagnes d’influence au même endroit.</p></div><div className="campaign-user-actions"><NotificationTrigger /><button type="button" className="profile-menu"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button></div></header>
        <section className="campaign-toolbar"><label><i>⌕</i><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="rechercher une campagne..." /></label><button type="button">tous les statuts <span>⌄</span></button><button type="button">▣&nbsp; période : tout <span>⌄</span></button><a href="/campagnes/creer" className="campaign-create">＋&nbsp; créer une campagne</a></section>

        <section className="campaign-table campaign-motion-card">
          <div className="campaign-table-head"><span>campagne</span><span>marque</span><span>objectif</span><span>budget estimé</span><span>influenceurs</span><span>créée le</span><span>statut</span><span>actions</span></div>
          <div className="campaign-table-body">{visible.map((campaign,index)=><button type="button" className={selectedId===campaign.id ? "selected" : ""} onClick={()=>setSelectedId(campaign.id)} key={`${campaign.id}-${index}`}><span className="campaign-name"><img src={campaign.image} alt="" /><span><strong>{campaign.name}</strong><small>ID : {campaign.id}</small></span></span><b className="campaign-brand">{campaign.brand}</b><span>{campaign.objective}</span><span>{campaign.budget}</span><span className="campaign-avatars">{campaign.avatars.map((avatar,i)=><img src={avatar} alt="" key={avatar+i} />)}<b>+{campaign.more}</b></span><span>{campaign.date}</span><StatusBadge status={campaign.status} /><i>⋮</i></button>)}</div>
          <button type="button" className="campaign-more" onClick={()=>setExpanded((value)=>!value)}>{expanded ? "réduire la liste" : "voir plus de campagnes"}&nbsp;⌄</button>
        </section>

        <section className="campaign-detail campaign-motion-card">
          <aside className="campaign-detail-nav"><div><img src={selected.image} alt="" /><span><strong>{selected.name.replace(" 2026","")}</strong><StatusBadge status={selected.status} /></span></div><nav>{[["⊞","aperçu"],["♙","influenceurs (5)"],["▤","brief & stratégie"],["▣","budget & paiements"],["▣","planning"],["▢","documents"],["□","notes"]].map(([icon,label])=><button type="button" className={activeTab===label ? "active" : ""} onClick={()=>setActiveTab(label)} key={label}><i>{icon}</i>{label}</button>)}</nav></aside>
          <div className="campaign-detail-content">
            <section className="campaign-summary-strip">{[["◎","objectif",selected.objective],["▣","budget estimé",selected.budget],["♙","influenceurs sélectionnés","5 / 8"],["▤","formats principaux","Reels, Stories"],["▣","période","Septembre 2026"]].map(([icon,label,value])=><article key={label}><i>{icon}</i><span><small>{label}</small><strong>{value}</strong></span></article>)}</section>
            <div className="campaign-info-grid"><article><h2>brief de la campagne</h2><p>Mettre en avant Kinder comme le compagnon idéal des petits au quotidien et soutenir les parents dans la rentrée scolaire.<br />Ton bienveillant, familial et positif.</p><div>{["Parents 25–40 ans","Maroc","Instagram, TikTok, YouTube","Family, Lifestyle, Mom Life","UGC, Unboxing"].map(tag=><span key={tag}>{tag}</span>)}</div></article><article className="campaign-budget"><h2>répartition du budget</h2><div className="budget-donut"><strong>150 000<small>MAD</small></strong></div><ul><li><i className="pink"/><span>Rémunération influenceurs<br /><b>105 000 MAD</b></span><strong>70%</strong></li><li><i className="orange"/><span>Production & contenus<br /><b>20 000 MAD</b></span><strong>20%</strong></li><li><i className="yellow"/><span>Gestion & suivi<br /><b>15 000 MAD</b></span><strong>10%</strong></li></ul></article><article className="campaign-performance"><h2>performance estimée&nbsp; ⓘ</h2><div><strong className="pink">2.8M<small>couverture estimée<br />comptes uniques</small></strong><strong className="orange">6.4%<small>engagement estimé<br />taux moyen</small></strong><strong className="purple">3.1M<small>vues estimées<br />toutes plateformes</small></strong></div></article></div>
            <section className="campaign-creators"><div className="campaign-section-heading"><h2>influenceurs sélectionnés (5)</h2><button type="button">voir tous (5)</button></div><div>{selectedCreators.map((creator)=><a href="/influenceur/maya-el-amrani" key={creator.name}><img src={creator.image} alt={creator.name}/><span><strong>{creator.name} <i>◆</i></strong><small>{creator.handle}</small><b>{creator.followers} abonnés</b><em>{creator.engagement} engagement</em><span>{creator.platforms.map(platform=><SocialBadge platform={platform} key={platform}/>)}</span></span></a>)}</div></section>
            <aside className="campaign-ai-card"><h2>✧&nbsp; somatch AI</h2><p>Besoin d’optimiser votre casting ?<br />Notre IA peut analyser votre sélection et vous proposer des recommandations.</p><button type="button">analyser cette campagne&nbsp; ✣</button></aside>
          </div>
        </section>
      </section>
    </main>
  );
}
