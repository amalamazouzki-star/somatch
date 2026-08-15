"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";

type ProfileIconName = "agency" | "briefcase" | "camera" | "check" | "chevron" | "edit" | "globe" | "more" | "plus" | "settings" | "shield" | "user" | "users";

function ProfileIcon({ name }: { name: ProfileIconName }) {
  if (name === "user") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="3.5" /><path d="M5 20c.6-4.3 3-6.5 7-6.5s6.4 2.2 7 6.5" /></svg>;
  if (name === "users") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.2" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7s5 1.9 5.5 5.7M14.5 14.2c2.9-.4 5 .9 5.7 3.8" /></svg>;
  if (name === "briefcase") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="7" width="17" height="12" rx="2" /><path d="M9 7V4h6v3M3.5 12h17M10 12v2h4v-2" /></svg>;
  if (name === "settings") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" /></svg>;
  if (name === "agency") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4h10v17M15 9h4v12M8 8h2M8 12h2M8 16h2M13 8h.01M13 12h.01M13 16h.01M3 21h18" /></svg>;
  if (name === "camera") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h4l1.5-2h5L16 8h4v11H4z" /><circle cx="12" cy="13" r="3" /></svg>;
  if (name === "edit") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 16-1 4 4-1L19 8l-3-3zM14 7l3 3" /></svg>;
  if (name === "globe") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></svg>;
  if (name === "shield") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.4 7.8 7 10 4.6-2.2 7-5.4 7-10V6z" /><path d="m9 12 2 2 4-4" /></svg>;
  if (name === "plus") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>;
  if (name === "more") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></svg>;
  if (name === "check") return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4L19 7" /></svg>;
  return <svg className="profile-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 9 5 5 5-5" /></svg>;
}

const profileTabs: ReadonlyArray<{ icon: ProfileIconName; label: string; target?: string; href?: string }> = [
  { icon: "user", label: "Mon profil", target: ".personal-card" },
  { icon: "briefcase", label: "Organisation", target: ".organisation-card" },
  { icon: "users", label: "Équipe", target: ".team-card" },
  { icon: "settings", label: "Préférences", href: "/parametres" },
] as const;

const team = [
  { name: "Sara Benali", email: "sara.benali@lemonmind.agency", role: "Propriétaire", access: "Accès total", image: "/dashboard/profile-sara.png", owner: true },
  { name: "Yassine El Amrani", email: "yassine@lemonmind.agency", role: "Chef de projet", access: "Accès total", image: "/explorer/amine.png" },
  { name: "Imane El Fassi", email: "imane@lemonmind.agency", role: "Responsable des médias sociaux", access: "Accès limité", image: "/explorer/imane.png" },
  { name: "Amine Ech-Chergui", email: "amine@lemonmind.agency", role: "Analyste digital", access: "Accès limité", image: "/explorer/youssef.png" },
] as const;

function Field({ label, defaultValue, wide = false, type = "text" }: { label: string; defaultValue: string; wide?: boolean; type?: "text" | "email" }) {
  return <label className={wide ? "profile-field wide" : "profile-field"}><span>{label}</span><input type={type} defaultValue={defaultValue} /></label>;
}

function SelectField({ label, defaultValue, options }: { label: string; defaultValue: string; options: string[] }) {
  return <label className="profile-field"><span>{label}</span><select defaultValue={defaultValue}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Mon profil");
  const [saved, setSaved] = useState(false);
  const [description, setDescription] = useState("Agence indépendante spécialisée en influence marketing, création de contenu, production audiovisuelle et stratégie digitale. Nous aidons les marques à créer des campagnes d’influence performantes et authentiques.");
  const [feedback, setFeedback] = useState("");

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2600);
  }

  function selectSection(label: string, target?: string) {
    setActiveTab(label);
    if (target) document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    setFeedback("Vos modifications ont été enregistrées.");
    window.setTimeout(() => { setSaved(false); setFeedback(""); }, 2400);
  }

  return (
    <main className="dashboard-page profile-page">
      <AppSidebar active="profil" />
      <form className="dashboard-main profile-main" onSubmit={saveProfile}>
        <header className="profile-header">
          <div><h1>Mon profil</h1><p>Gérez vos informations personnelles et celles de votre organisation.</p></div>
          <div className="profile-user-actions"><NotificationTrigger /><button type="button" className="profile-menu" aria-label="Ouvrir le menu du profil" onClick={() => showFeedback("Le menu du profil est disponible en mode démonstration.")}><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><span><ProfileIcon name="chevron" /></span></button></div>
        </header>

        <nav className="profile-tabs" aria-label="Sections du profil">
          {profileTabs.map((tab) => tab.href
            ? <a href={tab.href} key={tab.label}><i><ProfileIcon name={tab.icon} /></i>{tab.label}</a>
            : <button type="button" className={activeTab === tab.label ? "active" : ""} onClick={() => selectSection(tab.label, tab.target)} key={tab.label}><i><ProfileIcon name={tab.icon} /></i>{tab.label}</button>)}
        </nav>

        <aside className="agency-account profile-motion-card"><i><ProfileIcon name="agency" /></i><span><strong>Compte agence <em>Vérifié</em></strong><small>Membre depuis mars 2024</small></span></aside>

        <section className="profile-grid">
          <div className="profile-column">
            <section className="profile-card personal-card profile-motion-card">
              <h2>Informations personnelles</h2>
              <div className="personal-top">
                <div className="profile-avatar"><img src="/dashboard/profile-sara.png" alt="Portrait de Sara Benali" /><button type="button" aria-label="Modifier la photo" onClick={() => showFeedback("La sélection d’une nouvelle photo est disponible en mode démonstration.")}><ProfileIcon name="camera" /></button></div>
                <div className="personal-fields"><Field label="Prénom" defaultValue="Sara" /><Field label="Nom" defaultValue="Benali" /><Field label="Fonction" defaultValue="Responsable marketing" wide /></div>
              </div>
              <div className="profile-two-columns"><Field label="E-mail" defaultValue="sara.benali@lemonmind.agency" type="email" /><label className="profile-field"><span>Téléphone</span><div className="phone-field"><i aria-hidden="true">🇲🇦</i><input type="tel" defaultValue="+212 661 76 80 09" /></div></label></div>
              <div className="profile-two-columns"><SelectField label="Langue" defaultValue="Français" options={["Français", "Arabe", "Anglais"]} /><SelectField label="Fuseau horaire" defaultValue="(GMT+1) Casablanca" options={["(GMT+1) Casablanca", "(GMT+1) Paris", "(GMT) Londres"]} /></div>
            </section>

            <section className="profile-card security-card profile-motion-card">
              <h2>Sécurité</h2>
              <div className="security-row"><span><strong>Mot de passe</strong><small>••••••••••</small></span><button type="button" onClick={() => showFeedback("La modification du mot de passe est disponible en mode démonstration.")}>Modifier</button></div>
              <div className="security-row"><span><strong>Authentification à deux facteurs</strong><small className="enabled">Activée</small></span><button type="button" onClick={() => showFeedback("La gestion de l’authentification est disponible en mode démonstration.")}>Gérer</button></div>
              <div className="security-row"><span><strong>Sessions actives</strong><small>3 appareils connectés</small></span><button type="button" onClick={() => showFeedback("La liste des sessions actives est disponible en mode démonstration.")}>Voir</button></div>
            </section>
          </div>

          <div className="profile-column">
            <section className="profile-card organisation-card profile-motion-card">
              <h2>Informations de l’organisation</h2>
              <div className="organisation-top"><div className="organisation-logo"><span>LEMON<br />MIND<small>DIGITAL</small></span><button type="button" aria-label="Modifier le logo" onClick={() => showFeedback("La sélection d’un nouveau logo est disponible en mode démonstration.")}><ProfileIcon name="edit" /></button></div><div><Field label="Nom de l’organisation" defaultValue="Lemon Mind Digital" /><SelectField label="Secteur d’activité" defaultValue="Marketing / Communication" options={["Marketing / Communication", "Conseil", "Technologie"]} /></div></div>
              <div className="profile-two-columns organisation-middle"><SelectField label="Pays / marché principal" defaultValue="Maroc" options={["Maroc", "France", "Émirats arabes unis"]} /><label className="profile-field"><span>Site web</span><div className="website-field"><i><ProfileIcon name="globe" /></i><input type="url" defaultValue="https://www.lemonmind.agency" /></div></label></div>
              <label className="organisation-description"><span>Description de l’organisation</span><textarea maxLength={300} value={description} onChange={(event) => setDescription(event.target.value)} /><small>{description.length} / 300</small></label>
            </section>

            <section className="profile-card team-card profile-motion-card">
              <div className="team-heading"><h2>Mon équipe</h2><span>4 membres</span><button type="button" onClick={() => showFeedback("L’invitation d’un membre est disponible en mode démonstration.")}><ProfileIcon name="plus" />Inviter un membre</button></div>
              <div className="team-columns"><span></span><span>Rôle</span><span>Niveau d’accès</span><span></span></div>
              <div className="team-list">{team.map((member) => <article key={member.email}><span className="team-person"><img src={member.image} alt={`Portrait de ${member.name}`} /><span><strong>{member.name} {member.owner ? <em>Vous</em> : null}</strong><small>{member.email}</small></span></span><span className="team-role">{member.role}</span><span className="team-access">{member.access}</span><button type="button" aria-label={`Actions pour ${member.name}`} onClick={() => showFeedback(`Les actions pour ${member.name} sont disponibles en mode démonstration.`)}><ProfileIcon name="more" /></button></article>)}</div>
            </section>
          </div>
        </section>

        <footer className="profile-savebar profile-motion-card"><div><i><ProfileIcon name="shield" /></i><span><strong>Vos données sont sécurisées et confidentielles</strong><small>Nous ne partageons jamais vos informations avec des tiers.</small></span></div><button type="submit">{saved ? <><span>Modifications enregistrées</span><ProfileIcon name="check" /></> : "Enregistrer les modifications"}</button></footer>
        <p className={feedback ? "profile-feedback visible" : "profile-feedback"} role="status" aria-live="polite">{feedback}</p>
      </form>
    </main>
  );
}
