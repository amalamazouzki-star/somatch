"use client";

import { useState } from "react";
import { AppSidebar } from "../../components/AppShell";
import { InfluencerProfileLink } from "../../components/InfluencerProfileLink";
import { SocialLogo, type SocialNetwork } from "../../components/SocialLogo";

const creators = [
  { rank:1,name:"Hafsa Achraf",image:"/explorer/maya.png",niche:"Lifestyle · Méga",instagram:"1,4 M",tiktok:"620 K",youtube:"–",score:92,match:"Excellent match",role:"Émouvoir",tone:"pink",budget:"22 000 MAD",reason:"Forte affinité avec les parents et contenu authentique très engageant." },
  { rank:2,name:"Amine HLS",image:"/explorer/amine.png",niche:"Famille · Méga",instagram:"717 K",tiktok:"1,2 M",youtube:"210 K",score:89,match:"Très bon match",role:"Inspirer",tone:"purple",budget:"21 000 MAD",reason:"Audience familiale engagée et contenu éducatif très pertinent." },
  { rank:3,name:"Sofia HLS",image:"/explorer/sarah.png",niche:"Famille · Méga",instagram:"667 K",tiktok:"980 K",youtube:"–",score:88,match:"Très bon match",role:"Inspirer",tone:"purple",budget:"20 000 MAD",reason:"Maman inspirante, proche de la cible, avec un excellent taux d’engagement." },
  { rank:4,name:"Souhaila Abbad",image:"/explorer/salma.png",niche:"Lifestyle · Macro",instagram:"176 K",tiktok:"92 K",youtube:"–",score:85,match:"Bon match",role:"Rassembler",tone:"orange",budget:"15 000 MAD",reason:"Contenu accessible et forte connexion avec les familles de Kénitra." },
  { rank:5,name:"Sara Moudden",image:"/explorer/nour.png",niche:"Beauté · Macro",instagram:"103 K",tiktok:"68 K",youtube:"–",score:82,match:"Bon match",role:"Rassembler",tone:"orange",budget:"13 000 MAD",reason:"Créatrice positive et créative, idéale pour produire des contenus UGC à forte portée." },
] as const;

const briefTop = [
  ["Campagne","Back to School 2026"],
  ["Marque","Kinder Joy"],
  ["Marché","🇲🇦 Maroc"],
  ["Dates","01/09/2026 → 30/09/2026"],
  ["Budget","150 000 MAD"],
] as const;

const briefBottom = [
  ["Objectif principal","Notoriété & Engagement"],
  ["Cible principale","Parents 25–40 ans, familles avec enfants 3–12 ans"],
  ["Plateformes clés","Instagram, TikTok, YouTube"],
  ["Catégories","Lifestyle, Famille, Éducation"],
  ["Formats privilégiés","Reels, Stories, UGC"],
] as const;

function SocialIcon({ type }: { type:Extract<SocialNetwork,"instagram"|"tiktok"|"youtube"> }) {
  const labels = { instagram:"Instagram", tiktok:"TikTok", youtube:"YouTube" } as const;
  return <i className={`recommend-social ${type}`} role="img" aria-label={labels[type]}><SocialLogo network={type}/></i>;
}

function Social({ type, value }: { type:Extract<SocialNetwork,"instagram"|"tiktok"|"youtube">; value:string }) {
  return <span className="recommend-social-stat"><SocialIcon type={type}/><strong>{value}</strong></span>;
}

function CreatorCard({ creator }: { creator:typeof creators[number] }) {
  return <article className="recommend-creator-card influencer-card-target">
    <InfluencerProfileLink name={creator.name} />
    <header><b className={`recommend-rank ${creator.tone}`}>{creator.rank}</b><img src={creator.image} alt={creator.name}/><span><strong>{creator.name}</strong><small>{creator.niche}</small></span></header>
    <div className="recommend-socials"><Social type="instagram" value={creator.instagram}/><Social type="tiktok" value={creator.tiktok}/><Social type="youtube" value={creator.youtube}/></div>
    <div className="recommend-match"><b aria-label={`SoMatch Score : ${creator.score} sur 100`}>{creator.score}</b><strong>{creator.match}</strong></div>
    <span className={`recommend-role ${creator.tone}`}>{creator.tone === "pink" ? "♥" : creator.tone === "purple" ? "♙" : "♧"}　{creator.role}</span>
    <p><small>Pourquoi ce profil ?</small>{creator.reason}</p>
    <footer><small>Budget estimé</small><strong>{creator.budget}</strong></footer>
  </article>;
}

export default function SomatchRecommendationPage() {
  const [saved,setSaved]=useState(false);
  const [exported,setExported]=useState(false);
  const [mapVisible,setMapVisible]=useState(false);
  const [moreCreators,setMoreCreators]=useState(false);

  return <main className="dashboard-page recommendation-page">
    <AppSidebar active="somatch AI" />
    <section className="recommendation-main">
      <div className="recommendation-left">
        <header className="recommendation-header"><div><a href="/somatch-ai">←　Retour aux résultats</a><h1><i>✣</i> Recommandation SoMatch AI</h1><p>Voici la stratégie et le casting recommandés par SoMatch AI pour votre campagne.</p></div><div><button className={saved?"saved":""} type="button" aria-pressed={saved} onClick={()=>setSaved(true)}>▯　{saved?"Résultat enregistré ✓":"Enregistrer le résultat"}</button><button className={exported?"saved":""} type="button" aria-pressed={exported} onClick={()=>setExported(true)}>⇩　{exported?"Rapport exporté ✓":"Exporter le rapport"}</button></div></header>

        <section className="recommend-brief recommend-motion-card"><h2><i>▤</i> Votre brief analysé par SoMatch AI</h2><div className="recommend-brief-row top">{briefTop.map(([label,value])=><span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div><div className="recommend-brief-row bottom">{briefBottom.map(([label,value])=><span key={label}><small>{label}</small>{label === "Plateformes clés" ? <strong className="recommend-brief-platforms"><span><SocialIcon type="instagram"/>Instagram</span><span><SocialIcon type="tiktok"/>TikTok</span><span><SocialIcon type="youtube"/>YouTube</span></strong> : <strong>{value}</strong>}</span>)}</div></section>

        <section className="recommend-strategy recommend-motion-card"><article><h2><i>✣</i> SoMatch Strategy</h2><p>Notre approche repose sur trois rôles complémentaires pour créer de l’émotion, inspirer et rassembler votre audience autour de la rentrée scolaire.</p></article><article className="pink"><h3>♥　Émouvoir</h3><p>Toucher le cœur des parents à travers des moments du quotidien et la complicité avec leurs enfants.</p><strong>2 créateurs</strong></article><article className="purple"><h3>♙　Inspirer</h3><p>Inspirer avec des idées pratiques, des routines et des conseils pour une rentrée sereine et joyeuse.</p><strong>2 créateurs</strong></article><article className="orange"><h3>♧　Rassembler</h3><p>Créer du lien et fédérer la communauté autour d’expériences ludiques et participatives.</p><strong>1 à 2 créateurs</strong></article></section>

        <section className="recommend-casting recommend-motion-card"><header><h2>Casting recommandé (5 créateurs)　ⓘ</h2><button className={mapVisible?"active":""} type="button" aria-pressed={mapVisible} onClick={()=>setMapVisible(value=>!value)}>⌾　{mapVisible?"Carte affichée ✓":"Voir sur la carte"}</button></header><div className="recommend-creator-grid">{creators.map(creator=><CreatorCard key={creator.name} creator={creator}/>)}</div><button className={moreCreators?"add-recommend-creators active":"add-recommend-creators"} type="button" aria-pressed={moreCreators} onClick={()=>setMoreCreators(value=>!value)}>⊕　{moreCreators?"Suggestions supplémentaires affichées ✓":"Ajouter 1 à 3 créateurs supplémentaires (places restantes dans le budget)"}</button></section>

        <div className="recommend-bottom-grid"><section className="recommend-formats recommend-motion-card"><h2>Formats recommandés</h2><div><span><i>▣</i><strong>Reels<small>1 Reel par créateur</small></strong></span><span><i>▤</i><strong>UGC<small>Contenus communautaires</small></strong></span><span><i>▣</i><strong>Stories<small>3 à 5 Stories par créateur</small></strong></span><span><i>♙</i><strong>Unboxing<small>Mise en avant du produit et du coffret</small></strong></span></div></section><section className="recommend-kpis recommend-motion-card"><h2>Indicateurs clés attendus</h2><div>{[["⌁","Portée","2,4 M – 3,1 M"],["⌁","Vues totales","3,5 M – 4,7 M"],["✣","Engagement","4,8 % – 6,2 %"],["▶","Clics vers le site","20 K – 30 K"],["♧","Participations","8 K – 12 K"]].map(([icon,label,value])=><span key={label}><i>{icon}</i><small>{label}</small><strong>{value}</strong></span>)}</div></section><section className="recommend-calendar recommend-motion-card"><h2>Calendrier recommandé</h2><div className="calendar-weeks"><span><b>S1</b><small>1–7 sept.</small></span><span><b>S2 – S3</b><small>8–21 sept.</small></span><span><b>S4</b><small>22–30 sept.</small></span></div><div className="calendar-line"><i/><i/><i/><i/><i/></div><div className="calendar-labels"><span>Unboxing et<br/>teasing</span><span>Concours et<br/>engagement</span><span>Amplification et<br/>clôture</span></div></section></div>

        <footer className="recommend-actions"><a href="/somatch-ai">♢　Modifier mon brief</a><a href="/comparer">⚖　Comparer les profils</a><a className="primary" href="/campagnes/creer">Créer une campagne avec ce casting　→</a></footer>
      </div>

      <aside className="recommendation-right"><section className="global-score recommend-motion-card"><h2>✣ SoMatch Score global</h2><div><b role="img" aria-label="SoMatch Score global : 92 sur 100">92</b><span><strong>Excellent match</strong><small>Ce casting atteint 92 % de pertinence avec vos objectifs de campagne.</small></span></div></section><section className="budget-card recommend-motion-card"><h2>Répartition du budget</h2><div className="budget-content"><i className="budget-donut" role="img" aria-label="Répartition du budget : 72 % créateurs, 16 % production et 12 % gestion et coordination"/><div><span><b className="pink-dot"/>Créateurs<strong>108 000 MAD (72 %)</strong></span><span><b className="orange-dot"/>Production<strong>24 000 MAD (16 %)</strong></span><span><b className="purple-dot"/>Gestion et coordination<strong>18 000 MAD (12 %)</strong></span></div></div><footer><span>Budget total</span><strong>150 000 MAD HT</strong></footer></section><section className="right-metrics"><article className="recommend-motion-card"><i>◉</i><small>Couverture estimée</small><strong>2,4 M – 3,1 M</strong><span>comptes uniques</span></article><article className="recommend-motion-card"><i>▷</i><small>Vues estimées</small><strong>3,5 M – 4,7 M</strong><span>toutes plateformes</span></article><article className="recommend-motion-card"><i>♡</i><small>Engagement moyen</small><strong>4,8 % – 6,2 %</strong><span>taux d’engagement</span></article><article className="recommend-motion-card"><i>♧</i><small>Participants au concours</small><strong>8 K – 12 K</strong><span>participations estimées</span></article></section><section className="casting-reasons recommend-motion-card"><h2>Pourquoi ce casting ?</h2><ul><li>Excellente adéquation avec votre cible (parents de 25 à 40 ans)</li><li>Couverture large et diversifiée sur Instagram, TikTok et YouTube</li><li>Sélection équilibrée de profils Méga et Macro pour maximiser l’impact</li><li>Créateurs authentiques et alignés avec les valeurs de Kinder Joy</li><li>Forte complémentarité des rôles pour une narration cohérente</li></ul></section><p className="recommend-lock">♙　Vous pourrez modifier le casting<br/>　　et le budget avant validation.</p></aside>
    </section>
  </main>;
}
