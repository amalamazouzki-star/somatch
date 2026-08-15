"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";
import { SocialLogo, type SocialNetwork } from "../components/SocialLogo";

type SettingsIconName = "account" | "bell" | "calendar" | "check" | "chevron" | "connections" | "edit" | "globe" | "hash" | "lock" | "mail" | "moon" | "palette" | "ruler" | "settings" | "shield" | "sparkles" | "sun";

const SETTINGS_ICONS: Record<SettingsIconName, ReactNode> = {
  account: <><circle cx="12" cy="7.5" r="3.5" /><path d="M5 20c.6-4.3 3-6.5 7-6.5s6.4 2.2 7 6.5" /></>,
  bell: <><path d="M6.5 10.2c0-3.4 2-5.7 5.5-5.7s5.5 2.3 5.5 5.7v4l1.8 2.3H4.7l1.8-2.3z" /><path d="M9.5 19h5" /></>,
  calendar: <><rect x="3.5" y="5.5" width="17" height="15" rx="2" /><path d="M7.5 3.5v4M16.5 3.5v4M3.5 10h17" /></>,
  check: <path d="m5 12.5 4.2 4L19 7" />,
  chevron: <path d="m8.5 10 3.5 3.5 3.5-3.5" />,
  connections: <><circle cx="6" cy="7" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="16" cy="18" r="2" /><circle cx="6" cy="17" r="2" /><path d="m8 7 8-1M7.5 8.5l7 7.8M8 17h6" /></>,
  edit: <><path d="m5 16-1 4 4-1L19 8l-3-3z" /><path d="m14 7 3 3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></>,
  hash: <><path d="M9 3 7 21M17 3l-2 18M4 9h16M3 15h16" /></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  moon: <path d="M19 15.5A8.2 8.2 0 0 1 8.5 5a8.2 8.2 0 1 0 10.5 10.5Z" />,
  palette: <><path d="M12 3a9 9 0 0 0 0 18h1.2a2 2 0 0 0 1.6-3.2 2 2 0 0 1 1.6-3.2H18A3 3 0 0 0 21 12a9 9 0 0 0-9-9Z" /><circle cx="7.5" cy="11" r="1" /><circle cx="9" cy="7" r="1" /><circle cx="14" cy="7" r="1" /><circle cx="17" cy="10" r="1" /></>,
  ruler: <><path d="m4 17 13-13 3 3-13 13z" /><path d="m12 9 3 3M8.5 12.5l2 2M15.5 5.5l2 2" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></>,
  shield: <><path d="M12 3 5 6v5c0 4.6 2.4 7.8 7 10 4.6-2.2 7-5.4 7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  sparkles: <><path d="M12 3c.7 4 2.5 5.8 6.5 6.5-4 .7-5.8 2.5-6.5 6.5-.7-4-2.5-5.8-6.5-6.5C9.5 8.8 11.3 7 12 3Z" /><path d="M19 3v4M21 5h-4M5 16v4M7 18H3" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" /></>,
};

function SettingsIcon({ name }: { name: SettingsIconName }) {
  return <svg className="settings-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{SETTINGS_ICONS[name]}</svg>;
}

const settingsSections: ReadonlyArray<{ icon: SettingsIconName; label: string; target: string; beta?: boolean }> = [
  { icon: "settings", label: "Général", target: ".settings-general" },
  { icon: "bell", label: "Notifications", target: ".settings-notifications" },
  { icon: "sparkles", label: "Préférences SoMatch AI", target: ".settings-ai-preferences" },
  { icon: "lock", label: "Confidentialité et données", target: ".privacy-card" },
  { icon: "palette", label: "Apparence", target: ".appearance-card" },
  { icon: "connections", label: "Intégrations", target: ".integrations-card", beta: true },
  { icon: "account", label: "Compte", target: ".account-card" },
];

const notificationRows = [
  ["Campagnes", "Mises à jour sur vos campagnes et collaborations"],
  ["Recommandations SoMatch AI", "Nouveaux castings et opportunités personnalisées"],
  ["Nouveaux insights", "Tendances, benchmarks et analyses du marché"],
  ["Activité de votre équipe", "Invitations, rôles et accès"],
] as const;

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`settings-toggle ${checked ? "on" : ""}`} onClick={onChange}><span /></button>;
}

function PlatformLogo({ platform }: { platform: Extract<SocialNetwork, "instagram" | "tiktok" | "youtube"> }) {
  return <i className={`settings-social ${platform}`}><SocialLogo network={platform} /></i>;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Général");
  const [theme, setTheme] = useState<"Clair" | "Sombre">("Clair");
  const [notifications, setNotifications] = useState([true, true, true, false]);
  const [markets, setMarkets] = useState(["Maroc", "France", "MENA"]);
  const [categories, setCategories] = useState(["Lifestyle", "Beauty", "Mom Life", "Tech"]);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState("");

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2600);
  }

  function selectSection(label: string, target: string) {
    setActiveSection(label);
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleNotification(index: number) {
    setNotifications((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  function chooseTheme(nextTheme: "Clair" | "Sombre") {
    setTheme(nextTheme);
    showFeedback(`Thème ${nextTheme.toLowerCase()} sélectionné. Enregistrez pour confirmer ce choix.`);
  }

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    setFeedback("Vos paramètres ont été enregistrés.");
    window.setTimeout(() => { setSaved(false); setFeedback(""); }, 2400);
  }

  return (
    <main className="dashboard-page settings-page">
      <AppSidebar active="paramètres" />
      <form className="dashboard-main settings-main" onSubmit={saveSettings}>
        <header className="settings-header">
          <div><h1>Paramètres</h1><p>Personnalisez votre expérience sur SoMatch.</p></div>
          <div className="settings-user-actions"><NotificationTrigger /><button type="button" className="profile-menu" aria-label="Ouvrir le menu du profil" onClick={() => showFeedback("Le menu du profil est disponible en mode démonstration.")}><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><span><SettingsIcon name="chevron" /></span></button></div>
        </header>

        <section className="settings-workspace">
          <nav className="settings-menu settings-motion-card" aria-label="Sections des paramètres">{settingsSections.map((section) => <button type="button" className={activeSection === section.label ? "active" : ""} onClick={() => selectSection(section.label, section.target)} key={section.label}><i><SettingsIcon name={section.icon} /></i><span>{section.label}</span>{section.beta ? <em>BÊTA</em> : null}</button>)}</nav>

          <div className="settings-center">
            <section className="settings-card settings-general settings-motion-card"><h2><i><SettingsIcon name="globe" /></i>Général</h2><div className="settings-select-grid"><label><span>Langue</span><select defaultValue="Français"><option>Français</option><option>Arabe</option><option>Anglais</option></select></label><label><span>Fuseau horaire</span><select defaultValue="(GMT+1) Casablanca"><option>(GMT+1) Casablanca</option><option>(GMT+1) Paris</option></select></label><label><span>Format de date</span><select defaultValue="DD/MM/YYYY"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select></label><label><span>Devise par défaut</span><select defaultValue="MAD – Dirham marocain"><option>MAD – Dirham marocain</option><option>EUR – Euro</option></select></label><label><span>Format des nombres</span><select defaultValue="1 234,56"><option>1 234,56</option><option>1,234.56</option></select></label><label><span>Unité de mesure</span><select defaultValue="Métrique (km, kg, m)"><option>Métrique (km, kg, m)</option><option>Impérial (mi, lb, ft)</option></select></label></div></section>

            <section className="settings-card settings-notifications settings-motion-card"><div className="settings-card-heading"><h2><i><SettingsIcon name="bell" /></i>Notifications</h2><div><span>E-mail</span><span>Notification</span><span>Activer</span></div></div><div className="notification-list">{notificationRows.map(([title, description], index) => <article key={title}><span><strong>{title}</strong><small>{description}</small></span><i><SettingsIcon name="mail" /></i><i><SettingsIcon name="bell" /></i><Toggle checked={notifications[index]} onChange={() => toggleNotification(index)} label={`Activer les notifications pour ${title}`} /></article>)}</div></section>

            <section className="settings-card settings-ai-preferences settings-motion-card"><div className="settings-card-heading"><h2><i><SettingsIcon name="sparkles" /></i>Préférences SoMatch AI</h2><button type="button" onClick={() => showFeedback("Vous pouvez retirer une préférence en cliquant sur sa croix.")}>Modifier</button></div><div className="preference-row"><strong>Marchés prioritaires</strong><div>{markets.map((tag) => <button type="button" className="preference-tag" aria-label={`Retirer ${tag} des marchés prioritaires`} onClick={() => setMarkets((current) => current.filter((item) => item !== tag))} key={tag}>{tag}<span aria-hidden="true">×</span></button>)}</div></div><div className="preference-row"><strong>Catégories favorites</strong><div>{categories.map((tag) => <button type="button" className="preference-tag" aria-label={`Retirer ${tag} des catégories favorites`} onClick={() => setCategories((current) => current.filter((item) => item !== tag))} key={tag}>{tag}<span aria-hidden="true">×</span></button>)}</div></div><div className="preference-row"><strong>Plateformes privilégiées</strong><div>{(["instagram", "tiktok", "youtube"] as const).map((platform) => <span className="platform-tag" key={platform}><PlatformLogo platform={platform} />{platform === "instagram" ? "Instagram" : platform === "tiktok" ? "TikTok" : "YouTube"}</span>)}</div></div></section>
          </div>

          <div className="settings-right">
            <section className="settings-card appearance-card settings-motion-card"><h2><i><SettingsIcon name="palette" /></i>Apparence</h2><p>Thème de l’interface</p><div className="theme-options"><button type="button" aria-pressed={theme === "Clair"} className={theme === "Clair" ? "active" : ""} onClick={() => chooseTheme("Clair")}><i><SettingsIcon name="sun" /></i>Clair<b /></button><button type="button" aria-pressed={theme === "Sombre"} className={theme === "Sombre" ? "active" : ""} onClick={() => chooseTheme("Sombre")}><i><SettingsIcon name="moon" /></i>Sombre<b /></button></div></section>

            <section className="settings-card privacy-card settings-motion-card"><h2><i><SettingsIcon name="lock" /></i>Confidentialité et données</h2>{["Préférences de confidentialité", "Gestion de mes données", "Télécharger mes données"].map((item) => <button type="button" onClick={() => showFeedback(`${item} est disponible en mode démonstration.`)} key={item}><span>{item}</span><i><SettingsIcon name="chevron" /></i></button>)}</section>

            <section className="settings-card integrations-card settings-motion-card"><div className="settings-card-heading"><h2><i><SettingsIcon name="connections" /></i>Intégrations</h2><em>BÊTA</em></div><p>Connectez vos comptes pour une expérience enrichie.</p>{([ ["instagram", "Instagram", "Connecté"], ["tiktok", "TikTok", "Connecté"], ["youtube", "YouTube", "Non connecté"] ] as const).map(([platform, name, status]) => <button type="button" onClick={() => showFeedback(`${name} : ${status.toLowerCase()}.`)} key={name}><PlatformLogo platform={platform} /><strong>{name}</strong><span className={status === "Connecté" ? "connected" : ""}>{status}</span><i><SettingsIcon name="chevron" /></i></button>)}</section>

            <section className="settings-card account-card settings-motion-card"><h2><i><SettingsIcon name="account" /></i>Compte</h2>{["Modifier mon mot de passe", "Déconnexion de tous les appareils", "Supprimer mon compte"].map((item) => <button type="button" onClick={() => showFeedback(`${item} est disponible en mode démonstration.`)} className={item.startsWith("Supprimer") ? "danger" : ""} key={item}><span>{item}</span><i><SettingsIcon name="chevron" /></i></button>)}</section>
          </div>
        </section>

        <footer className="settings-savebar settings-motion-card"><div><i><SettingsIcon name="shield" /></i><span><strong>Vos données sont sécurisées et confidentielles.</strong><small>Nous ne partageons jamais vos informations avec des tiers.</small></span></div><button type="submit">{saved ? <><span>Modifications enregistrées</span><SettingsIcon name="check" /></> : "Enregistrer les modifications"}</button></footer>
        <p className={feedback ? "settings-feedback visible" : "settings-feedback"} role="status" aria-live="polite">{feedback}</p>
      </form>
    </main>
  );
}
