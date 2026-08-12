"use client";

import { FormEvent, useState } from "react";
import { AppHeader, AppSidebar } from "../components/AppShell";

const initialBrief = "Campagne Back to School. Mettre en avant Kinder comme le compagnon idéal des petits au quotidien et soutenir les parents dans la rentrée scolaire.\nTon bienveillant, familial et positif.";

const formats = ["Reel", "Stories", "Unboxing", "UGC", "Live"] as const;
const quickSuggestions = ["Lancement produit", "Back to School", "Ramadan", "UGC Challenge", "Awareness", "Conversion"] as const;

const recentBriefs = [
  { brand: "Kinder", title: "Kinder - Back to School", date: "12 août 2026", status: "complété", tone: "red" },
  { brand: "LC WAIKIKI", title: "LC Waikiki - BTS", date: "6 août 2026", status: "brouillon", tone: "blue" },
  { brand: "FILORGA", title: "Filorga - Sérum 5XP", date: "30 juil. 2026", status: "complété", tone: "gray" },
  { brand: "URIAGE", title: "Uriage - Hyseac UGC", date: "22 juil. 2026", status: "brouillon", tone: "navy" },
] as const;

const creators = [
  { name: "souhaila abbad", handle: "@souhailaabbad", niches: "Mom Life  ·  Lifestyle", image: "/explorer/salma.png", platforms: ["instagram", "tiktok"], followers: "176K", engagement: "5,2%", score: 92, fit: "Parfait fit : maman créative, contenu authentique et très proche de sa communauté." },
  { name: "amine hls", handle: "@amine.hls", niches: "Family  ·  Lifestyle", image: "/explorer/amine.png", platforms: ["instagram", "tiktok", "youtube"], followers: "718K", engagement: "6,1%", score: 91, fit: "Père de famille inspirant, fort taux d’engagement et storytelling naturel." },
  { name: "lina yahyaoui", handle: "@linayahyaoui", niches: "Mom Life  ·  Lifestyle", image: "/explorer/lina.png", platforms: ["instagram", "tiktok"], followers: "284K", engagement: "4,8%", score: 90, fit: "Contenu doux et positif, idéale pour adresser les parents avec bienveillance." },
  { name: "fatiyass", handle: "@fatiyass.off", niches: "Family  ·  Lifestyle", image: "/explorer/sarah.png", platforms: ["instagram", "tiktok"], followers: "198K", engagement: "5,0%", score: 90, fit: "Créatrice proche de sa communauté, parfaite pour un ton familial et fun." },
  { name: "lamiae skalli", handle: "@lamiae.skalli", niches: "Lifestyle  ·  Mom Life", image: "/explorer/nour.png", platforms: ["instagram", "tiktok"], followers: "312K", engagement: "4,6%", score: 88, fit: "Esthétique soignée et contenu inspirant adapté aux jeunes mamans modernes." },
] as const;

const summaryItems = [
  ["◎", "Objectif", "Notoriété & Engagement"],
  ["⌾", "Cible", "Parents 25–40 ans"],
  ["⌖", "Marché", "Maroc"],
  ["▣", "Plateformes", "Instagram, TikTok, YouTube"],
  ["♙", "Catégories", "Family, Lifestyle, Mom Life"],
  ["▢", "Formats", "Reels, Stories, Unboxing"],
  ["◉", "Budget estimé", "150 000 MAD"],
  ["⌑", "Nombre de créateurs", "5 à 8"],
] as const;

function SocialBadge({ platform }: { platform: string }) {
  return <i className={`ai-social ${platform}`} aria-label={platform}>{platform === "tiktok" ? "♪" : platform === "youtube" ? "▶" : ""}</i>;
}

function CreatorRow({ creator, favorite, onToggle }: { creator: typeof creators[number]; favorite: boolean; onToggle: () => void }) {
  return (
    <article className="ai-creator-row">
      <img src={creator.image} alt={creator.name} />
      <div className="ai-creator-identity"><strong>{creator.name} <i>◆</i></strong><small>{creator.handle}</small><span>{creator.niches}</span><p>{creator.fit}</p></div>
      <div className="ai-creator-platforms">{creator.platforms.map((platform) => <SocialBadge platform={platform} key={platform} />)}</div>
      <b className="ai-creator-stat">{creator.followers}<small>abonnés</small></b>
      <b className="ai-creator-stat">{creator.engagement}<small>engagement</small></b>
      <div className="ai-score-ring" style={{ "--score": `${creator.score * 3.6}deg` } as React.CSSProperties}><strong>{creator.score}</strong><small>/100</small></div>
      <button type="button" className={`ai-favorite ${favorite ? "selected" : ""}`} onClick={onToggle} aria-label={`Ajouter ${creator.name} aux favoris`}>{favorite ? "♥" : "♡"}</button>
    </article>
  );
}

export default function SomatchAi() {
  const [brand, setBrand] = useState("Kinder");
  const [brief, setBrief] = useState(initialBrief);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["Reel", "Stories"]);
  const [activeSuggestion, setActiveSuggestion] = useState("Back to School");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  function toggleFormat(format: string) {
    setSelectedFormats((current) => current.includes(format) ? current.filter((item) => item !== format) : [...current, format]);
  }

  function applySuggestion(suggestion: string) {
    setActiveSuggestion(suggestion);
    setBrief(`${suggestion} — ${initialBrief}`);
  }

  function generateCasting(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setGenerating(true);
    window.setTimeout(() => setGenerating(false), 900);
  }

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  return (
    <main className="dashboard-page somatch-ai-page">
      <AppSidebar active="somatch AI" />
      <section className="dashboard-main somatch-ai-main">
        <AppHeader title={<><i>✣</i> somatch AI</>} subtitle="décrivez votre campagne, notre IA trouve les créateurs parfaits pour vous." />

        <div className="somatch-ai-workspace">
          <div className="somatch-ai-left">
            <form className="ai-brief-card ai-motion-card" onSubmit={generateCasting}>
              <div className="ai-card-heading"><div><h2>1. décrivez votre campagne</h2><p>plus vous partagez de détails, plus la recommandation sera précise.</p></div><button type="button" onClick={() => { setBrand("Kinder"); setBrief(initialBrief); }}>▣&nbsp; coller mon brief</button></div>

              <div className="ai-form-grid ai-form-grid-three">
                <label>nom de la marque<input value={brand} onChange={(event) => setBrand(event.target.value)} /></label>
                <label>objectif de la campagne<select defaultValue="Notoriété & Engagement"><option>Notoriété & Engagement</option><option>Conversion</option><option>Lancement produit</option></select></label>
                <label>pays / marché<input defaultValue="Maroc" /></label>
                <label>cible principale<input defaultValue="Parents 25–40 ans" /></label>
                <label>langue<input defaultValue="Français, Arabe" /></label>
                <label>plateformes<span className="ai-platform-field"><SocialBadge platform="instagram" /><SocialBadge platform="tiktok" /><SocialBadge platform="youtube" /><b>⌄</b></span></label>
              </div>

              <div className="ai-form-grid ai-form-grid-bottom">
                <label>catégories<span className="ai-category-field"><b>Family</b><b>Lifestyle</b><b>Mom Life&nbsp; ×</b><i>⌄</i></span></label>
                <label>nombre de créateurs<select defaultValue="5 - 8 créateurs"><option>5 - 8 créateurs</option><option>8 - 12 créateurs</option></select></label>
                <label>budget estimé<select defaultValue="150 000 MAD"><option>150 000 MAD</option><option>200 000 MAD</option></select></label>
              </div>

              <fieldset className="ai-format-field"><legend>formats souhaités</legend><div>{formats.map((format) => <button type="button" className={selectedFormats.includes(format) ? "selected" : ""} onClick={() => toggleFormat(format)} key={format}>{selectedFormats.includes(format) ? "●" : "◌"}&nbsp; {format}{format === "Reel" ? " ⌄" : ""}</button>)}</div></fieldset>
              <label className="ai-brief-text">décrivez votre campagne (brief libre)<textarea value={brief} maxLength={1000} onChange={(event) => setBrief(event.target.value)} /><small>{brief.length} / 1000</small></label>
              <div className="ai-quick-suggestions"><strong>suggestions rapides</strong><div>{quickSuggestions.map((suggestion) => <button type="button" className={activeSuggestion === suggestion ? "selected" : ""} onClick={() => applySuggestion(suggestion)} key={suggestion}>{suggestion}</button>)}</div></div>
              <button type="submit" className="ai-generate-button">✦&nbsp; {generating ? "génération du casting…" : "générer mon casting avec somatch AI"}</button>
              <small className="ai-security">♙&nbsp; vos informations sont sécurisées et confidentielles.</small>
            </form>

            <section className="ai-recent-card ai-motion-card">
              <div className="ai-section-heading"><h2>briefs récents</h2><button type="button">voir tout&nbsp; →</button></div>
              <div className="ai-recent-grid">{recentBriefs.map((item) => <button type="button" key={item.title}><i className={item.tone}>{item.brand}</i><span><strong>{item.title}</strong><small>{item.date}</small><b className={item.status === "complété" ? "done" : "draft"}>{item.status}</b></span></button>)}</div>
            </section>
          </div>

          <div className="somatch-ai-right">
            <section className="ai-summary-card ai-motion-card">
              <div className="ai-section-heading"><h2>résumé intelligent de votre besoin</h2><i>IA</i></div>
              <div className="ai-summary-list">{summaryItems.map(([icon,label,value]) => <p key={label}><i>{icon}</i><span><strong>{label} :</strong> {value}</span></p>)}</div>
            </section>

            <div className="ai-recommendation-heading"><h2>2. recommandation somatch AI <span>✦</span></h2><button type="button">modifier le brief</button></div>
            <section className="ai-metric-grid">
              <article className="ai-motion-card"><i className="orange">◉</i><span>somatch score moyen</span><strong>91/100</strong><small>Excellent</small><b><i /></b></article>
              <article className="ai-motion-card"><i className="blue">♙</i><span>couverture estimée</span><strong>2.8M</strong><small>comptes uniques</small></article>
              <article className="ai-motion-card"><i className="pink">♙</i><span>engagement estimé</span><strong>6.4%</strong><small>moyen</small></article>
              <article className="ai-motion-card"><i className="yellow">▣</i><span>budget estimé</span><strong>148 500 MAD</strong><small>dans votre enveloppe</small></article>
            </section>

            <div className="ai-shortlist-heading"><h2>votre shortlist de créateurs&nbsp; ⓘ</h2><span>5 créateurs sélectionnés</span></div>
            <section className="ai-shortlist-card ai-motion-card">
              <div className="ai-creator-list">{creators.map((creator) => <CreatorRow creator={creator} favorite={favorites.includes(creator.name)} onToggle={() => toggleFavorite(creator.name)} key={creator.name} />)}</div>
              <footer><button type="button">▣&nbsp; ajouter à une campagne</button><button type="button">⇄&nbsp; comparer</button><button type="button">créer une campagne&nbsp; →</button></footer>
            </section>
          </div>
        </div>
        <p className="somatch-ai-disclaimer">somatch AI peut faire des erreurs. Vérifiez toujours les informations clés.</p>
      </section>
    </main>
  );
}
