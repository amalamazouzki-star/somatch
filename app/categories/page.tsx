"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";
import { SocialLogo } from "../components/SocialLogo";

const popularCategories = [
  { slug: "beaute", name: "Beauté", icon: "♙", creators: "3 256", engagement: "4,7 %", growth: "+18,6 %", image: "/influencer-collage.png", position: "8% center" },
  { slug: "lifestyle", name: "Lifestyle", icon: "♨", creators: "4 872", engagement: "4,2 %", growth: "+12,1 %", image: "/influencer-collage.png", position: "91% center" },
  { slug: "mode", name: "Mode", icon: "♧", creators: "3 107", engagement: "4,9 %", growth: "+15,3 %", image: "/explorer/imane.png", position: "center 28%" },
  { slug: "food", name: "Food", icon: "♜", creators: "2 895", engagement: "5,1 %", growth: "+20,4 %", image: "/dashboard/campaign-cafe.png", position: "center" },
  { slug: "famille", name: "Famille", icon: "♙", creators: "2 157", engagement: "5,1 %", growth: "+22,7 %", image: "/explorer/salma.png", position: "center 25%" },
  { slug: "sport-fitness", name: "Sport & Fitness", icon: "⌁", creators: "1 963", engagement: "4,6 %", growth: "+17,7 %", image: "/explorer/youssef.png", position: "center 22%" },
] as const;

const categoryDirectory = [
  { slug: "voyage", name: "Voyage", icon: "✈", count: "1 842", growth: "+14,3 %", tone: "blue" },
  { slug: "parentalite", name: "Parentalité", icon: "♙", count: "1 378", growth: "+18,7 %", tone: "rose" },
  { slug: "gaming", name: "Gaming", icon: "⌘", count: "1 256", growth: "+16,8 %", tone: "purple" },
  { slug: "maison-deco", name: "Maison & déco", icon: "♜", count: "978", growth: "+12,9 %", tone: "green" },
  { slug: "tech", name: "Tech", icon: "⚙", count: "1 102", growth: "+11,9 %", tone: "violet" },
  { slug: "business", name: "Business", icon: "▣", count: "1 194", growth: "+11,4 %", tone: "lavender" },
  { slug: "divertissement", name: "Divertissement", icon: "▤", count: "2 043", growth: "+13,2 %", tone: "gray" },
  { slug: "musique", name: "Musique", icon: "♫", count: "976", growth: "+9,8 %", tone: "pink" },
  { slug: "education", name: "Éducation", icon: "◇", count: "856", growth: "+10,6 %", tone: "indigo" },
  { slug: "photographie", name: "Photographie", icon: "▢", count: "764", growth: "+9,1 %", tone: "cyan" },
] as const;

const beautyCreators = [
  { name: "Meryem Beauty", handle: "@meryembeauty", followers: "532 K", engagement: "5,3 %", image: "/explorer/maya.png", platform: "instagram" },
  { name: "Sara Beauty", handle: "@sara.beauty", followers: "412 K", engagement: "4,9 %", image: "/dashboard/profile-sara.png", platform: "tiktok" },
  { name: "Nada Glow", handle: "@nadaglow", followers: "298 K", engagement: "4,8 %", image: "/explorer/sarah.png", platform: "instagram" },
  { name: "Imane Care", handle: "@imaneskini", followers: "245 K", engagement: "4,6 %", image: "/explorer/imane.png", platform: "tiktok" },
  { name: "Glow by Lina", handle: "@glowbylina", followers: "188 K", engagement: "4,4 %", image: "/explorer/lina.png", platform: "instagram" },
] as const;

function SocialBadge({ platform }: { platform: "instagram" | "tiktok" }) {
  const label = platform === "instagram" ? "Instagram" : "TikTok";
  return <span className={`category-social ${platform}`} role="img" aria-label={label}><SocialLogo network={platform} /></span>;
}

export default function Categories() {
  const [query, setQuery] = useState("");
  const [carouselStart, setCarouselStart] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("beaute");
  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const visibleDirectory = normalizedQuery
    ? categoryDirectory.filter((category) => `${category.name} ${category.slug}`.toLocaleLowerCase("fr").includes(normalizedQuery))
    : categoryDirectory;
  const orderedPopular = popularCategories.map((_, index) => popularCategories[(index + carouselStart) % popularCategories.length]);
  const selectedCategoryLabel = popularCategories.find((category) => category.slug === selectedCategory)?.name
    ?? categoryDirectory.find((category) => category.slug === selectedCategory)?.name
    ?? "Beauté";

  return (
    <main className="dashboard-page categories-page">
      <AppSidebar active="catégories" />

      <section className="dashboard-main categories-main">
        <header className="categories-topbar">
          <div className="categories-title"><h1>Catégories</h1><p>Explorez les créateurs par univers et trouvez votre audience idéale.</p></div>
          <label className="category-search"><i aria-hidden="true">⌕</i><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher une catégorie…" aria-label="Rechercher une catégorie" /></label>
          <div className="category-user-actions">
            <NotificationTrigger />
            <button type="button" className="profile-menu" aria-label="Menu utilisateur"><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><span aria-hidden="true">⌄</span></button>
          </div>
          <aside className="category-ai-help category-hover-card">
            <i aria-hidden="true">✧</i><div><strong>Besoin d’aide pour choisir ?</strong><p>Décrivez votre campagne et SoMatch AI<br />vous recommande les meilleures catégories.</p><a href="/somatch-ai">Demander à SoMatch AI&nbsp; ✦</a></div>
          </aside>
        </header>

        <section className="popular-categories">
          <h2>Catégories populaires</h2>
          <div className="popular-category-grid">
            {orderedPopular.map((category) => (
              <button type="button" className={`popular-category-card category-hover-card ${selectedCategory === category.slug ? "selected" : ""}`} onClick={() => setSelectedCategory(category.slug)} aria-pressed={selectedCategory === category.slug} key={category.slug}>
                <span className="popular-category-visual"><img src={category.image} alt="" style={{ objectPosition: category.position }} /><i>{category.icon}</i></span>
                <span className="popular-category-copy"><strong>{category.name}</strong><small>{category.creators} créateurs</small><small>engagement moyen {category.engagement}</small><b>↗&nbsp; {category.growth}</b></span>
              </button>
            ))}
            <button type="button" className="popular-category-next" onClick={() => setCarouselStart((value) => (value + 1) % popularCategories.length)} aria-label="Catégories suivantes">→</button>
          </div>
        </section>

        <section className="category-lower-grid">
          <article className="category-panel category-directory-panel">
            <h2>Toutes les catégories</h2>
            <div className="category-directory-grid">
              {visibleDirectory.map((category) => (
                <button type="button" className="category-directory-row" onClick={() => setSelectedCategory(category.slug)} aria-pressed={selectedCategory === category.slug} key={category.slug}>
                  <i className={category.tone}>{category.icon}</i><strong>{category.name}</strong><span>{category.count} créateurs</span><b>↑ {category.growth}</b>
                </button>
              ))}
              {visibleDirectory.length === 0 ? <p className="category-empty">Aucune catégorie trouvée.</p> : null}
            </div>
            <button type="button" className="category-see-all" onClick={() => setQuery("")}>Voir toutes les catégories&nbsp; →</button>
          </article>

          <article className="category-panel beauty-creators-panel">
            <div className="category-panel-heading"><h2>Créateurs populaires dans {selectedCategoryLabel}</h2><a href="/explorer" aria-label={`Voir tous les créateurs de la catégorie ${selectedCategoryLabel}`}>Voir tout&nbsp; →</a></div>
            <div className="beauty-creator-list">
              {beautyCreators.map((creator) => (
                <a href="/influenceur/maya-el-amrani" key={creator.name}>
                  <img src={creator.image} alt={creator.name} /><span><strong>{creator.name}</strong><small>{creator.handle}</small></span><SocialBadge platform={creator.platform} /><b>{creator.followers}<small>Abonnés</small></b><b>{creator.engagement}<small>Engagement</small></b><em>Voir le profil&nbsp; →</em>
                </a>
              ))}
            </div>
            <a className="explore-category-banner" href="/explorer"><i aria-hidden="true">✧</i><span><strong>Explorer tous les créateurs {selectedCategoryLabel}</strong><small>3 256 créateurs disponibles</small></span><b aria-hidden="true">→</b></a>
          </article>
        </section>

        <section className="category-insight category-hover-card">
          <i aria-hidden="true">✦</i><div><h2>Le saviez-vous ?</h2><p>La catégorie Food génère actuellement le plus fort taux d’engagement au Maroc, avec une évolution de +20,4 % ce mois-ci.</p></div><a href="/tendances">Voir l’analyse complète&nbsp; →</a>
        </section>
      </section>
    </main>
  );
}
