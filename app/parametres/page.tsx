"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";

const settingsSections = [
  ["⚙", "Général"], ["♧", "Notifications"], ["✧", "Préférences somatch AI"],
  ["▣", "Confidentialité & données"], ["◉", "Apparence"], ["⌘", "Intégrations"], ["▢", "Compte"],
] as const;

const notificationRows = [
  ["campagnes", "Mises à jour sur vos campagnes et collaborations"],
  ["recommandations somatch AI", "Nouveaux castings et opportunités personnalisées"],
  ["nouveaux insights", "Tendances, benchmarks et analyses du marché"],
  ["activité de votre équipe", "Invitations, rôles et accès"],
] as const;

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`settings-toggle ${checked ? "on" : ""}`} onClick={onChange}><span /></button>;
}

function SocialIcon({ platform }: { platform: "instagram" | "tiktok" | "youtube" }) {
  return <i className={`settings-social ${platform}`}>{platform === "tiktok" ? "♪" : platform === "youtube" ? "▶" : ""}</i>;
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("Général");
  const [theme, setTheme] = useState<"Clair" | "Sombre">("Clair");
  const [notifications, setNotifications] = useState([true, true, true, false]);
  const [saved, setSaved] = useState(false);

  function toggleNotification(index: number) {
    setNotifications((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value));
  }

  function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <main className="dashboard-page settings-page">
      <AppSidebar active="paramètres" />
      <form className="dashboard-main settings-main" onSubmit={saveSettings}>
        <header className="settings-header"><div><h1>paramètres</h1><p>personnalisez votre expérience sur somatch.</p></div><div className="settings-user-actions"><button type="button" className="notification-button" aria-label="Notifications">♧<span>3</span></button><button type="button" className="profile-menu"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button></div></header>

        <section className="settings-workspace">
          <nav className="settings-menu settings-motion-card" aria-label="Sections des paramètres">{settingsSections.map(([icon, label]) => <button type="button" className={activeSection === label ? "active" : ""} onClick={() => setActiveSection(label)} key={label}><i>{icon}</i><span>{label}</span>{label === "Intégrations" ? <em>BETA</em> : null}</button>)}</nav>

          <div className="settings-center">
            <section className="settings-card settings-general settings-motion-card"><h2><i>⊙</i> général</h2><div className="settings-select-grid"><label><span>langue</span><select defaultValue="Français"><option>Français</option><option>Arabe</option><option>Anglais</option></select></label><label><span>fuseau horaire</span><select defaultValue="(GMT+1) Casablanca"><option>(GMT+1) Casablanca</option><option>(GMT+1) Paris</option></select></label><label><span>format de date</span><select defaultValue="DD/MM/YYYY"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select></label><label><span>devise par défaut</span><select defaultValue="MAD – Dirham marocain"><option>MAD – Dirham marocain</option><option>EUR – Euro</option></select></label><label><span>format des nombres</span><select defaultValue="1 234,56"><option>1 234,56</option><option>1,234.56</option></select></label><label><span>unité de mesure</span><select defaultValue="Métrique (km, kg, m)"><option>Métrique (km, kg, m)</option><option>Impérial (mi, lb, ft)</option></select></label></div></section>

            <section className="settings-card settings-notifications settings-motion-card"><div className="settings-card-heading"><h2><i>♧</i> notifications</h2><div><span>email</span><span>notification</span><span>activer</span></div></div><div className="notification-list">{notificationRows.map(([title, description], index) => <article key={title}><span><strong>{title}</strong><small>{description}</small></span><i>✉</i><i>♧</i><Toggle checked={notifications[index]} onChange={() => toggleNotification(index)} label={`Activer ${title}`} /></article>)}</div></section>

            <section className="settings-card settings-ai-preferences settings-motion-card"><div className="settings-card-heading"><h2><i>✧</i> préférences somatch AI</h2><button type="button">modifier</button></div><div className="preference-row"><strong>marchés prioritaires</strong><div>{["Maroc", "France", "MENA"].map((tag) => <span key={tag}>{tag} &nbsp;×</span>)}</div></div><div className="preference-row"><strong>catégories favorites</strong><div>{["Lifestyle", "Beauty", "Mom Life", "Tech"].map((tag) => <span key={tag}>{tag} &nbsp;×</span>)}</div></div><div className="preference-row"><strong>plateformes privilégiées</strong><div><span><SocialIcon platform="instagram" />Instagram</span><span><SocialIcon platform="tiktok" />TikTok</span><span><SocialIcon platform="youtube" />YouTube</span></div></div></section>
          </div>

          <div className="settings-right">
            <section className="settings-card appearance-card settings-motion-card"><h2><i>◉</i> apparence</h2><p>thème de l’interface</p><div className="theme-options"><button type="button" className={theme === "Clair" ? "active" : ""} onClick={() => setTheme("Clair")}><i>☼</i> Clair <b /></button><button type="button" className={theme === "Sombre" ? "active" : ""} onClick={() => setTheme("Sombre")}><i>☾</i> Sombre <b /></button></div></section>

            <section className="settings-card privacy-card settings-motion-card"><h2><i>▣</i> confidentialité & données</h2>{["préférences de confidentialité", "gestion de mes données", "télécharger mes données"].map((item) => <button type="button" key={item}><span>{item}</span><i>›</i></button>)}</section>

            <section className="settings-card integrations-card settings-motion-card"><div className="settings-card-heading"><h2><i>⌘</i> intégrations</h2><em>BETA</em></div><p>Connectez vos comptes pour une expérience enrichie.</p>{[["instagram", "Instagram", "connecté"], ["tiktok", "TikTok", "connecté"], ["youtube", "YouTube", "non connecté"]].map(([platform, name, status]) => <button type="button" key={name}><SocialIcon platform={platform as "instagram" | "tiktok" | "youtube"} /><strong>{name}</strong><span className={status === "connecté" ? "connected" : ""}>{status}</span><i>›</i></button>)}</section>

            <section className="settings-card account-card settings-motion-card"><h2><i>♙</i> compte</h2>{["modifier mon mot de passe", "déconnexion de tous les appareils", "supprimer mon compte"].map((item) => <button type="button" className={item.startsWith("supprimer") ? "danger" : ""} key={item}><span>{item}</span><i>›</i></button>)}</section>
          </div>
        </section>

        <footer className="settings-savebar settings-motion-card"><div><i>♢</i><span><strong>vos données sont sécurisées et confidentielles.</strong><small>Nous ne partageons jamais vos informations avec des tiers.</small></span></div><button type="submit">{saved ? "modifications enregistrées ✓" : "enregistrer les modifications"}</button></footer>
      </form>
    </main>
  );
}
