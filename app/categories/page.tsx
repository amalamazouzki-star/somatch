"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";

const popularCategories = [
  { name: "beauty", icon: "♙", creators: "3 256", engagement: "4,7%", growth: "+18,6%", image: "/influencer-collage.png", position: "8% center" },
  { name: "lifestyle", icon: "♨", creators: "4 872", engagement: "4,2%", growth: "+12,1%", image: "/influencer-collage.png", position: "91% center" },
  { name: "fashion", icon: "♧", creators: "3 107", engagement: "4,9%", growth: "+15,3%", image: "/explorer/imane.png", position: "center 28%" },
  { name: "food", icon: "♜", creators: "2 895", engagement: "5,1%", growth: "+20,4%", image: "/dashboard/campaign-cafe.png", position: "center" },
  { name: "family", icon: "♙", creators: "2 157", engagement: "5,1%", growth: "+22,7%", image: "/explorer/salma.png", position: "center 25%" },
  { name: "sport & fitness", icon: "⌁", creators: "1 963", engagement: "4,6%", growth: "+17,7%", image: "/explorer/youssef.png", position: "center 22%" },
] as const;

const categoryDirectory = [
  { name: "travel", icon: "✈", count: "1 842", growth: "+14,3%", tone: "blue" },
  { name: "parenting", icon: "♙", count: "1 378", growth: "+18,7%", tone: "rose" },
  { name: "gaming", icon: "⌘", count: "1 256", growth: "+16,8%", tone: "purple" },
  { name: "home & deco", icon: "♜", count: "978", growth: "+12,9%", tone: "green" },
  { name: "tech", icon: "⚙", count: "1 102", growth: "+11,9%", tone: "violet" },
  { name: "business", icon: "▣", count: "1 194", growth: "+11,4%", tone: "lavender" },
  { name: "entertainment", icon: "▤", count: "2 043", growth: "+13,2%", tone: "gray" },
  { name: "music", icon: "♫", count: "976", growth: "+9,8%", tone: "pink" },
  { name: "education", icon: "◇", count: "856", growth: "+10,6%", tone: "indigo" },
  { name: "photography", icon: "▢", count: "764", growth: "+9,1%", tone: "cyan" },
] as const;

const beautyCreators = [
  { name: "meryem/beauty", handle: "@meryembeauty", followers: "532K", engagement: "5,3%", image: "/explorer/maya.png", platform: "instagram" },
  { name: "sara beauty", handle: "@sara.beauty", followers: "412K", engagement: "4,9%", image: "/dashboard/profile-sara.png", platform: "tiktok" },
  { name: "nada glow", handle: "@nadaglow", followers: "298K", engagement: "4,8%", image: "/explorer/sarah.png", platform: "instagram" },
  { name: "imane care", handle: "@imaneskini", followers: "245K", engagement: "4,6%", image: "/explorer/imane.png", platform: "tiktok" },
  { name: "glow by lina", handle: "@glowbylina", followers: "188K", engagement: "4,4%", image: "/explorer/lina.png", platform: "instagram" },
] as const;

function SocialBadge({ platform }: { platform: "instagram" | "tiktok" }) {
  return <i className={`category-social ${platform}`} aria-label={platform}>{platform === "tiktok" ? "♪" : ""}</i>;
}

export default function Categories() {
  const [query, setQuery] = useState("");
  const [carouselStart, setCarouselStart] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("beauty");
  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const visibleDirectory = normalizedQuery
    ? categoryDirectory.filter((category) => category.name.includes(normalizedQuery))
    : categoryDirectory;
  const orderedPopular = popularCategories.map((_, index) => popularCategories[(index + carouselStart) % popularCategories.length]);

  return (
    <main className="dashboard-page categories-page">
      <AppSidebar active="catégories" />

      <section className="dashboard-main categories-main">
        <header className="categories-topbar">
          <div className="categories-title"><h1>catégories</h1><p>explorez les créateurs par univers et trouvez votre audience idéale.</p></div>
          <label className="category-search"><i>⌕</i><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une catégorie..." aria-label="Rechercher une catégorie" /></label>
          <div className="category-user-actions">
            <button type="button" className="notification-button" aria-label="Notifications">♧<span>3</span></button>
            <button type="button" className="profile-menu" aria-label="Menu utilisateur"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button>
          </div>
          <aside className="category-ai-help category-hover-card">
            <i>✧</i><div><strong>besoin d’aide pour choisir ?</strong><p>décrivez votre campagne et somatch AI<br />vous recommande les meilleures catégories.</p><button type="button">demander à somatch AI&nbsp; ✦</button></div>
          </aside>
        </header>

        <section className="popular-categories">
          <h2>catégories populaires</h2>
          <div className="popular-category-grid">
            {orderedPopular.map((category) => (
              <button type="button" className={`popular-category-card category-hover-card ${selectedCategory === category.name ? "selected" : ""}`} onClick={() => setSelectedCategory(category.name)} key={category.name}>
                <span className="popular-category-visual"><img src={category.image} alt="" style={{ objectPosition: category.position }} /><i>{category.icon}</i></span>
                <span className="popular-category-copy"><strong>{category.name}</strong><small>{category.creators} créateurs</small><small>engagement moyen {category.engagement}</small><b>↗&nbsp; {category.growth}</b></span>
              </button>
            ))}
            <button type="button" className="popular-category-next" onClick={() => setCarouselStart((value) => (value + 1) % popularCategories.length)} aria-label="Catégories suivantes">→</button>
          </div>
        </section>

        <section className="category-lower-grid">
          <article className="category-panel category-directory-panel">
            <h2>toutes les catégories</h2>
            <div className="category-directory-grid">
              {visibleDirectory.map((category) => (
                <button type="button" className="category-directory-row" onClick={() => setSelectedCategory(category.name)} key={category.name}>
                  <i className={category.tone}>{category.icon}</i><strong>{category.name}</strong><span>{category.count} créateurs</span><b>↑ {category.growth}</b>
                </button>
              ))}
              {visibleDirectory.length === 0 ? <p className="category-empty">Aucune catégorie trouvée.</p> : null}
            </div>
            <button type="button" className="category-see-all" onClick={() => setQuery("")}>voir toutes les catégories&nbsp; →</button>
          </article>

          <article className="category-panel beauty-creators-panel">
            <div className="category-panel-heading"><h2>créateurs populaires dans {selectedCategory}</h2><button type="button">voir tout&nbsp; →</button></div>
            <div className="beauty-creator-list">
              {beautyCreators.map((creator) => (
                <a href="/influenceur/maya-el-amrani" key={creator.name}>
                  <img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.handle}</small></span><SocialBadge platform={creator.platform} /><b>{creator.followers}<small>abonnés</small></b><b>{creator.engagement}<small>engagement</small></b><em>voir le profil&nbsp; →</em>
                </a>
              ))}
            </div>
            <a className="explore-category-banner" href="/explorer"><i>✧</i><span><strong>explorer tous les créateurs {selectedCategory}</strong><small>3 256 créateurs disponibles</small></span><b>→</b></a>
          </article>
        </section>

        <section className="category-insight category-hover-card">
          <i>✦</i><div><h2>le saviez-vous ?</h2><p>la catégorie Food génère actuellement le plus fort taux d’engagement au Maroc avec +20,4% d’évolution ce mois-ci.</p></div><button type="button">voir l’analyse complète&nbsp; →</button>
        </section>
      </section>
    </main>
  );
}
