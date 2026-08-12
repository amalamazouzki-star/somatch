import type { ReactNode } from "react";

const navigation = [
  { icon: "⌂", label: "accueil", href: "/dashboard" },
  { icon: "✧", label: "somatch AI", href: "#" },
  { icon: "◯", label: "explorer", href: "/explorer" },
  { icon: "▥", label: "tendances", href: "#" },
  { icon: "⊞", label: "catégories", href: "#" },
  { icon: "♡", label: "favoris", href: "#" },
  { icon: "▣", label: "mes campagnes", href: "#" },
  { icon: "⬡", label: "influenceurs certifiés", href: "#", soon: true },
];

const secondaryNavigation = [
  ["♙", "profil"],
  ["⚙", "paramètres"],
  ["?", "Support"],
] as const;

export function AppSidebar({ active }: { active: "accueil" | "explorer" }) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-brand" aria-label="SoMatch">
        <span>somatch</span>
        <img src="/somatch-logo-mark.png" alt="" />
      </div>
      <nav className="primary-nav" aria-label="Navigation principale">
        {navigation.map((item) => (
          <a className={active === item.label ? "active" : ""} href={item.href} key={item.label} onClick={item.href === "#" ? (event) => event.preventDefault() : undefined}>
            <i>{item.icon}</i><span>{item.label}</span>{item.soon && <em>bientôt disponible</em>}
          </a>
        ))}
      </nav>
      <nav className="secondary-nav" aria-label="Navigation du compte">
        {secondaryNavigation.map(([icon, label]) => <button type="button" key={label}><i>{icon}</i><span>{label}</span></button>)}
      </nav>
      <section className="sidebar-ai-card">
        <div><img src="/somatch-logo-mark.png" alt="" /><strong>somatch AI</strong></div>
        <p>votre copilote IA pour des campagnes d’influence plus performantes.</p>
        <button type="button">découvrir somatch AI <span>→</span></button>
      </section>
      <button className="sidebar-profile" type="button">
        <img src="/dashboard/profile-sara.png" alt="Sara Benali" />
        <span><strong>sara benali</strong><small>marketeuse</small></span>
        <b>⌄</b>
      </button>
    </aside>
  );
}

export function AppHeader({ title, subtitle }: { title: ReactNode; subtitle: string }) {
  return (
    <header className="dashboard-header">
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="header-actions">
        <button type="button" className="notification-button" aria-label="Notifications">♧<span>3</span></button>
        <button type="button" className="profile-menu"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button>
      </div>
    </header>
  );
}
