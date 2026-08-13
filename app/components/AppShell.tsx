import type { ReactNode } from "react";
import { NotificationTrigger } from "./NotificationCenter";

const navigation = [
  { icon: "⌂", label: "accueil", href: "/dashboard" },
  { icon: "✧", label: "somatch AI", href: "/somatch-ai" },
  { icon: "◯", label: "explorer", href: "/explorer" },
  { icon: "▥", label: "tendances", href: "/tendances" },
  { icon: "⊞", label: "catégories", href: "/categories" },
  { icon: "♡", label: "favoris", href: "/favoris" },
  { icon: "▣", label: "mes campagnes", href: "/campagnes" },
  { icon: "⬡", label: "influenceurs certifiés", href: "#", soon: true },
];

const secondaryNavigation = [
  { icon: "♙", label: "profil", href: "/profil" },
  { icon: "⚙", label: "paramètres", href: "/parametres" },
  { icon: "?", label: "support", href: "/support" },
] as const;

export function AppSidebar({ active, context }: { active: "accueil" | "somatch AI" | "explorer" | "tendances" | "catégories" | "favoris" | "mes campagnes" | "profil" | "paramètres" | "support" | "aucun"; context?: "create-campaign" | "empty-states" }) {
  const aiDescription = context === "create-campaign"
    ? "Besoin d’inspiration ? Laissez notre IA vous aider à trouver les meilleurs créateurs."
    : context === "empty-states"
      ? "Besoin d’aide pour trouver les meilleurs créateurs ou lancer votre campagne ? somatch AI est là pour vous."
    : active === "tendances"
    ? "votre copilote IA pour analyser le marché et détecter les tendances qui comptent."
    : active === "catégories"
      ? "votre copilote IA pour analyser le marché et détecter les meilleures opportunités."
      : active === "somatch AI"
        ? "votre copilote IA pour créer vos castings parfaits en quelques secondes."
        : active === "favoris"
          ? "votre copilote IA pour analyser vos sélections et créer des castings gagnants."
          : active === "mes campagnes"
            ? "votre copilote IA pour créer, optimiser et piloter vos campagnes d’influence."
            : active === "profil"
              ? "votre copilote IA pour analyser le marché et détecter les meilleures opportunités."
              : active === "paramètres"
                ? "votre copilote IA pour créer vos castings parfaits en quelques secondes."
                : active === "support"
                  ? "Posez vos questions à notre IA et obtenez des réponses instantanées."
            : "votre copilote IA pour des campagnes d’influence plus performantes.";
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-scroll-area">
        <div className="dashboard-brand" aria-label="SoMatch">
          <img src="/somatch-logo-vb.png" alt="SoMatch" />
        </div>
        <nav className="primary-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <a className={active === item.label ? "active" : ""} href={item.href} key={item.label} onClick={item.href === "#" ? (event) => event.preventDefault() : undefined}>
              <i>{item.icon}</i><span>{item.label}</span>{item.soon && <em>bientôt disponible</em>}
            </a>
          ))}
        </nav>
        <nav className="secondary-nav" aria-label="Navigation du compte">
          {secondaryNavigation.map((item) => <a className={active === item.label ? "active" : ""} href={item.href} key={item.label}><i>{item.icon}</i><span>{item.label}</span></a>)}
        </nav>
        <section className="sidebar-ai-card">
          <div><img src="/somatch-logo-mark.png" alt="" /><strong>somatch AI</strong></div>
          <p>{aiDescription}</p>
          <button type="button">{context === "create-campaign" ? "essayer maintenant" : context === "empty-states" || active === "support" ? "poser une question" : "découvrir somatch AI"} <span>→</span></button>
        </section>
      </div>
      <a className="sidebar-profile" href="/profil" aria-label="Ouvrir le profil de Sara Benali" style={{ textDecoration: "none" }}>
        <img src="/dashboard/profile-sara.png" alt="Sara Benali" />
        <span><strong>sara benali</strong><small>marketeuse</small></span>
        <b>⌄</b>
      </a>
    </aside>
  );
}

export function AppHeader({ title, subtitle }: { title: ReactNode; subtitle: string }) {
  return (
    <header className="dashboard-header">
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="header-actions">
        <NotificationTrigger />
        <a className="profile-menu" href="/profil" aria-label="Ouvrir mon profil" style={{ textDecoration: "none" }}><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></a>
      </div>
    </header>
  );
}
