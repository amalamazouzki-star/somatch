"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";

const profileTabs = [
  ["♙", "mon profil"],
  ["▣", "organisation"],
  ["♙", "équipe"],
  ["⚙", "préférences"],
] as const;

const team = [
  { name: "Sara Benali", email: "sara.benali@lemonmind.agency", role: "Propriétaire", access: "Accès total", image: "/dashboard/profile-sara.png", owner: true },
  { name: "Yassine El Amrani", email: "yassine@lemonmind.agency", role: "Chef de projet", access: "Accès total", image: "/explorer/amine.png" },
  { name: "Imane El Fassi", email: "imane@lemonmind.agency", role: "Social Media Manager", access: "Accès limité", image: "/explorer/imane.png" },
  { name: "Amine Ech-Chergui", email: "amine@lemonmind.agency", role: "Analyste Digital", access: "Accès limité", image: "/explorer/youssef.png" },
] as const;

function Field({ label, defaultValue, wide = false }: { label: string; defaultValue: string; wide?: boolean }) {
  return <label className={wide ? "profile-field wide" : "profile-field"}><span>{label}</span><input defaultValue={defaultValue} /></label>;
}

function SelectField({ label, defaultValue, options }: { label: string; defaultValue: string; options: string[] }) {
  return <label className="profile-field"><span>{label}</span><select defaultValue={defaultValue}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("mon profil");
  const [saved, setSaved] = useState(false);

  function saveProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <main className="dashboard-page profile-page">
      <AppSidebar active="profil" />
      <form className="dashboard-main profile-main" onSubmit={saveProfile}>
        <header className="profile-header">
          <div><h1>mon profil</h1><p>gérez vos informations personnelles et celles de votre organisation.</p></div>
          <div className="profile-user-actions"><NotificationTrigger /><button type="button" className="profile-menu"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button></div>
        </header>

        <nav className="profile-tabs" aria-label="Sections du profil">
          {profileTabs.map(([icon, label]) => <button type="button" className={activeTab === label ? "active" : ""} onClick={() => setActiveTab(label)} key={label}><i>{icon}</i>{label}</button>)}
        </nav>

        <aside className="agency-account profile-motion-card"><i>▥</i><span><strong>compte agence <em>vérifié</em></strong><small>membre depuis mars 2024</small></span></aside>

        <section className="profile-grid">
          <div className="profile-column">
            <section className="profile-card personal-card profile-motion-card">
              <h2>informations personnelles</h2>
              <div className="personal-top">
                <div className="profile-avatar"><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><button type="button" aria-label="Modifier la photo">▣</button></div>
                <div className="personal-fields"><Field label="prénom" defaultValue="Sara" /><Field label="nom" defaultValue="Benali" /><Field label="fonction" defaultValue="Responsable Marketing" wide /></div>
              </div>
              <div className="profile-two-columns"><Field label="email" defaultValue="sara.benali@lemonmind.agency" /><label className="profile-field"><span>téléphone</span><div className="phone-field"><i>🇲🇦</i><input defaultValue="+212 661 76 80 09" /></div></label></div>
              <div className="profile-two-columns"><SelectField label="langue" defaultValue="Français" options={["Français", "Arabe", "Anglais"]} /><SelectField label="fuseau horaire" defaultValue="(GMT+1) Casablanca" options={["(GMT+1) Casablanca", "(GMT+1) Paris", "(GMT) Londres"]} /></div>
            </section>

            <section className="profile-card security-card profile-motion-card">
              <h2>sécurité</h2>
              <div className="security-row"><span><strong>mot de passe</strong><small>••••••••••</small></span><button type="button">modifier</button></div>
              <div className="security-row"><span><strong>authentification à deux facteurs</strong><small className="enabled">activée</small></span><button type="button">gérer</button></div>
              <div className="security-row"><span><strong>sessions actives</strong><small>3 appareils connectés</small></span><button type="button">voir</button></div>
            </section>
          </div>

          <div className="profile-column">
            <section className="profile-card organisation-card profile-motion-card">
              <h2>informations de l’organisation</h2>
              <div className="organisation-top"><div className="organisation-logo"><span>LEMON<br />MIND<small>DIGITAL</small></span><button type="button" aria-label="Modifier le logo">⌕</button></div><div><Field label="nom de l’organisation" defaultValue="Lemon Mind Digital" /><SelectField label="secteur d’activité" defaultValue="Marketing / Communication" options={["Marketing / Communication", "Conseil", "Technologie"]} /></div></div>
              <div className="profile-two-columns organisation-middle"><SelectField label="pays / marché principal" defaultValue="Maroc" options={["Maroc", "France", "Émirats arabes unis"]} /><label className="profile-field"><span>site web</span><div className="website-field"><i>⊙</i><input defaultValue="www.lemonmind.agency" /></div></label></div>
              <label className="organisation-description"><span>description de l’organisation</span><textarea defaultValue="Agence indépendante spécialisée en influence marketing, création de contenu, production audiovisuelle et stratégie digitale. Nous aidons les marques à créer des campagnes d’influence performantes et authentiques." /><small>156 / 300</small></label>
            </section>

            <section className="profile-card team-card profile-motion-card">
              <div className="team-heading"><h2>mon équipe</h2><span>4 membres</span><button type="button">＋&nbsp; inviter un membre</button></div>
              <div className="team-columns"><span></span><span>rôle</span><span>niveau d’accès</span><span></span></div>
              <div className="team-list">{team.map((member) => <article key={member.email}><span className="team-person"><img src={member.image} alt="" /><span><strong>{member.name} {member.owner ? <em>vous</em> : null}</strong><small>{member.email}</small></span></span><span>{member.role}</span><span>{member.access}</span><button type="button" aria-label={`Actions pour ${member.name}`}>⋮</button></article>)}</div>
            </section>
          </div>
        </section>

        <footer className="profile-savebar profile-motion-card"><div><i>♢</i><span><strong>vos données sont sécurisées et confidentielles</strong><small>Nous ne partageons jamais vos informations avec des tiers.</small></span></div><button type="submit">{saved ? "modifications enregistrées ✓" : "enregistrer les modifications"}</button></footer>
      </form>
    </main>
  );
}
