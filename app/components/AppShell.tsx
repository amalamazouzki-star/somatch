import type { ReactNode } from "react";
import { NotificationTrigger } from "./NotificationCenter";

type SidebarIconName = "home" | "sparkles" | "search" | "trending" | "grid" | "heart" | "campaign" | "verified" | "user" | "settings" | "help" | "chevron";

const SIDEBAR_ICON_PATHS: Record<SidebarIconName, ReactNode> = {
    home: <><path d="M3.5 10.5 12 3.8l8.5 6.7" /><path d="M5.7 9.3v10.2h12.6V9.3M9.4 19.5v-6.2h5.2v6.2" /></>,
    sparkles: <><path d="M12 2.8c.7 4.2 2.6 6.1 6.8 6.8-4.2.7-6.1 2.6-6.8 6.8-.7-4.2-2.6-6.1-6.8-6.8 4.2-.7 6.1-2.6 6.8-6.8Z" /><path d="M19.1 2.8v3.6M20.9 4.6h-3.6M4.8 16.8v4.4M7 19H2.6" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
    trending: <path d="M4.2 20V12h3.4v8H4.2ZM10.3 20V4.3h3.4V20h-3.4ZM16.4 20V8.2h3.4V20h-3.4Z" />,
    grid: <><rect x="3.8" y="3.8" width="6.2" height="6.2" rx=".8" /><rect x="14" y="3.8" width="6.2" height="6.2" rx=".8" /><rect x="3.8" y="14" width="6.2" height="6.2" rx=".8" /><rect x="14" y="14" width="6.2" height="6.2" rx=".8" /></>,
    heart: <path d="M20.7 8.5c0 5.1-8.7 10.8-8.7 10.8S3.3 13.6 3.3 8.5A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.7 2.1Z" />,
    campaign: <><rect x="3.5" y="6.6" width="17" height="13.2" rx="1.7" /><path d="M8.1 6.6V4.2h7.8v2.4M3.5 11.4h17M9.4 11.4v2.3h5.2v-2.3" /></>,
    verified: <><path d="m12 2.8 8 3.9v5.8c0 4.4-3.3 7.5-8 8.7-4.7-1.2-8-4.3-8-8.7V6.7l8-3.9Z" /><path d="m8.7 12.1 2.1 2.1 4.7-4.8" /></>,
    user: <><circle cx="12" cy="7.2" r="3.6" /><path d="M4.7 20.1c.5-4 3.2-6.5 7.3-6.5s6.8 2.5 7.3 6.5" /></>,
    settings: <><circle cx="12" cy="12" r="3.1" /><path d="M19.2 13.8a7.6 7.6 0 0 0 0-3.6l2-1.5-2-3.5-2.5 1a8 8 0 0 0-3.1-1.8L13.2 2H9.1l-.4 2.4a8 8 0 0 0-3.1 1.8l-2.4-1-2 3.5 2 1.5a7.6 7.6 0 0 0 0 3.6l-2 1.5 2 3.5 2.4-1a8 8 0 0 0 3.1 1.8l.4 2.4h4.1l.4-2.4a8 8 0 0 0 3.1-1.8l2.5 1 2-3.5-2-1.5Z" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9.1a2.7 2.7 0 1 1 3.5 2.6c-.8.3-1.1.9-1.1 1.8M12 17.2h.01" /></>,
    chevron: <path d="m8.5 10 3.5 3.5 3.5-3.5" />,
};

function SidebarIcon({ name }: { name: SidebarIconName }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{SIDEBAR_ICON_PATHS[name]}</svg>;
}

const navigation = [
  { icon: "home", active: "accueil", label: "Accueil", href: "/dashboard" },
  { icon: "sparkles", active: "somatch AI", label: "SoMatch AI", href: "/somatch-ai" },
  { icon: "search", active: "explorer", label: "Explorer", href: "/explorer" },
  { icon: "trending", active: "tendances", label: "Tendances", href: "/tendances" },
  { icon: "grid", active: "catégories", label: "Catégories", href: "/categories" },
  { icon: "heart", active: "favoris", label: "Favoris", href: "/favoris" },
  { icon: "campaign", active: "mes campagnes", label: "Mes campagnes", href: "/campagnes" },
  { icon: "verified", active: "influenceurs certifiés", label: "Influenceurs certifiés", href: "#", soon: true },
] as const;

const secondaryNavigation = [
  { icon: "user", active: "profil", label: "Profil", href: "/profil" },
  { icon: "settings", active: "paramètres", label: "Paramètres", href: "/parametres" },
  { icon: "help", active: "support", label: "Support", href: "/support" },
] as const;

export function AppSidebar({ active, context }: { active: "accueil" | "somatch AI" | "explorer" | "tendances" | "catégories" | "favoris" | "mes campagnes" | "profil" | "paramètres" | "support" | "aucun"; context?: "create-campaign" | "empty-states" }) {
  const aiDescription = context === "create-campaign"
    ? "Besoin d’inspiration ? Laissez notre IA vous aider à trouver les meilleurs créateurs."
    : context === "empty-states"
      ? "Besoin d’aide pour trouver les meilleurs créateurs ou lancer votre campagne ? SoMatch AI est là pour vous."
    : active === "tendances"
    ? "Votre copilote IA pour analyser le marché et détecter les tendances qui comptent."
    : active === "catégories"
      ? "Votre copilote IA pour analyser le marché et détecter les meilleures opportunités."
      : active === "somatch AI"
        ? "Votre copilote IA pour créer vos castings parfaits en quelques secondes."
        : active === "favoris"
          ? "Votre copilote IA pour analyser vos sélections et créer des castings gagnants."
          : active === "mes campagnes"
            ? "Votre copilote IA pour créer, optimiser et piloter vos campagnes d’influence."
            : active === "profil"
              ? "Votre copilote IA pour analyser le marché et détecter les meilleures opportunités."
              : active === "paramètres"
                ? "Votre copilote IA pour créer vos castings parfaits en quelques secondes."
                : active === "support"
                  ? "Posez vos questions à notre IA et obtenez des réponses instantanées."
            : "Votre copilote IA pour des campagnes d’influence plus performantes.";
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-scroll-area">
        <div className="dashboard-brand" aria-label="SoMatch">
          <img src="/somatch-logo-vb.png" alt="SoMatch" />
        </div>
        <nav className="primary-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <a className={active === item.active ? "active" : ""} href={item.href} key={item.active} onClick={item.href === "#" ? (event) => event.preventDefault() : undefined}>
              <i><SidebarIcon name={item.icon} /></i><span>{item.label}</span>{item.soon && <em>Bientôt disponible</em>}
            </a>
          ))}
        </nav>
        <nav className="secondary-nav" aria-label="Navigation du compte">
          {secondaryNavigation.map((item) => <a className={active === item.active ? "active" : ""} href={item.href} key={item.active}><i><SidebarIcon name={item.icon} /></i><span>{item.label}</span></a>)}
        </nav>
        <section className="sidebar-ai-card">
          <div><img src="/somatch-logo-mark.png" alt="" /><strong>SoMatch AI</strong></div>
          <p>{aiDescription}</p>
          <button type="button">{context === "create-campaign" ? "Essayer maintenant" : context === "empty-states" || active === "support" ? "Poser une question" : "Découvrir SoMatch AI"} <span>→</span></button>
        </section>
      </div>
      <a className="sidebar-profile" href="/profil" aria-label="Ouvrir le profil de Sara Benali" style={{ textDecoration: "none" }}>
        <img src="/dashboard/profile-sara.png" alt="Sara Benali" />
        <span><strong>Sara Benali</strong><small>Marketeuse</small></span>
        <b><SidebarIcon name="chevron" /></b>
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
        <a className="profile-menu" href="/profil" aria-label="Ouvrir mon profil" style={{ textDecoration: "none" }}><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><span><SidebarIcon name="chevron" /></span></a>
      </div>
    </header>
  );
}
