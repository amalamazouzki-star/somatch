"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AppSidebar } from "../components/AppShell";

type EmptyIconName = "arrow" | "bell" | "campaign" | "chart" | "check" | "close" | "folder" | "heart" | "info" | "layout" | "plus" | "search" | "sparkles" | "star" | "users";

const EMPTY_ICONS: Record<EmptyIconName, ReactNode> = {
  arrow: <><path d="M4 12h15" /><path d="m14 7 5 5-5 5" /></>,
  bell: <><path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 6 2.2 6 2.2 7.5H4.3C4.3 16 6.5 16 6.5 10Z" /><path d="M9.5 20h5" /></>,
  campaign: <><path d="M3.5 8h17v11.5h-17z" /><path d="M8 8V5h8v3M3.5 12h17" /></>,
  chart: <><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M7 16v-3M11 16V9M15 16v-5M19 16V7" /></>,
  check: <path d="m5 12.5 4.2 4L19 7" />,
  close: <path d="m7 7 10 10M17 7 7 17" />,
  folder: <path d="M3.5 7.5h6l2-2h9v14h-17z" />,
  heart: <path d="M20.7 8.5c0 5.1-8.7 10.8-8.7 10.8S3.3 13.6 3.3 8.5A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.7 2.1Z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 10.5V17M12 7.2h.01" /></>,
  layout: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="10.7" cy="10.7" r="6.6" /><path d="m15.7 15.7 4.5 4.5" /></>,
  sparkles: <><path d="M12 3c.7 4 2.5 5.8 6.5 6.5-4 .7-5.8 2.5-6.5 6.5-.7-4-2.5-5.8-6.5-6.5C9.5 8.8 11.3 7 12 3Z" /><path d="M19 3v4M21 5h-4M5 16v4M7 18H3" /></>,
  star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.3" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7s5 1.9 5.5 5.7M14.5 14.2c2.9-.4 5 .9 5.7 3.8" /></>,
};

function EmptyIcon({ name }: { name: EmptyIconName }) {
  return <svg className="empty-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{EMPTY_ICONS[name]}</svg>;
}

type EmptyCard = {
  kind: "explorer" | "favorites" | "campaigns" | "notifications" | "search" | "casting" | "collections" | "insights";
  eyebrow: string;
  icon: EmptyIconName;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const emptyCards: EmptyCard[] = [
  { kind: "explorer", eyebrow: "Explorer — Aucun résultat", icon: "search", title: "Aucun créateur ne correspond\nà vos critères", description: "Essayez d’ajuster vos filtres ou laissez\nSoMatch AI vous proposer des profils pertinents.", primary: { label: "Modifier les filtres", href: "/explorer" }, secondary: { label: "Demander à SoMatch AI", href: "/somatch-ai" } },
  { kind: "favorites", eyebrow: "Favoris — Aucun favori", icon: "heart", title: "Vous n’avez encore enregistré\naucun créateur", description: "Enregistrez vos créateurs préférés en cliquant\nsur l’icône en forme de cœur pendant votre exploration.", primary: { label: "Explorer les créateurs", href: "/explorer" } },
  { kind: "campaigns", eyebrow: "Mes campagnes — Aucune campagne", icon: "campaign", title: "Créez votre première campagne", description: "Lancez votre première campagne\nen quelques étapes simples.", primary: { label: "Créer une campagne", href: "/campagnes/creer" }, secondary: { label: "Commencer avec SoMatch AI", href: "/somatch-ai" } },
  { kind: "notifications", eyebrow: "Notifications — Aucune notification", icon: "bell", title: "Vous êtes à jour !", description: "Vous n’avez aucune nouvelle notification\npour le moment. Revenez plus tard." },
  { kind: "search", eyebrow: "Recherche — Aucun résultat", icon: "search", title: "Aucun résultat pour « Back to School »", description: "Vérifiez l’orthographe ou essayez\nl’une des suggestions ci-dessous.", secondary: { label: "Effacer la recherche", href: "/explorer" } },
  { kind: "casting", eyebrow: "Casting — Aucun créateur", icon: "users", title: "Votre casting est vide", description: "Ajoutez des créateurs à votre casting\ndepuis Explorer ou laissez SoMatch AI\nvous proposer une sélection.", primary: { label: "Ajouter depuis Explorer", href: "/explorer" }, secondary: { label: "Générer avec SoMatch AI", href: "/somatch-ai" } },
  { kind: "collections", eyebrow: "Collections — Aucune collection", icon: "folder", title: "Vous n’avez aucune collection", description: "Créez des collections pour organiser\nvos créateurs par projet, thématique\nou marque.", primary: { label: "Créer une collection", href: "/favoris" } },
  { kind: "insights", eyebrow: "Insights — Aucun insight", icon: "chart", title: "Pas d’insight disponible", description: "Les insights apparaîtront ici une fois que\nvous aurez des campagnes actives.", secondary: { label: "Lancer une campagne", href: "/campagnes/creer" } },
];

function EmptyIllustration({ kind, searchTerm }: { kind: EmptyCard["kind"]; searchTerm: string }) {
  if (kind === "search") {
    return <div className={`empty-illustration ${kind}`} aria-hidden="true"><div className="empty-search-pill"><span>{searchTerm || "Recherche effacée"}</span><i className="empty-search-clear"><EmptyIcon name="close" /></i></div><i className="small-search"><EmptyIcon name="search" /></i></div>;
  }

  return (
    <div className={`empty-illustration ${kind}`} aria-hidden="true">
      <i className="empty-spark one" /><i className="empty-spark two" />
      {kind === "explorer" && <div className="magnifier"><EmptyIcon name="close" /></div>}
      {kind === "favorites" && <div className="heart-outline"><EmptyIcon name="heart" /></div>}
      {kind === "campaigns" && <div className="campaign-folder"><b><EmptyIcon name="plus" /></b></div>}
      {kind === "notifications" && <div className="notification-bell"><EmptyIcon name="bell" /><b><EmptyIcon name="check" /></b></div>}
      {kind === "casting" && <div className="casting-people"><EmptyIcon name="users" /><b><EmptyIcon name="plus" /></b></div>}
      {kind === "collections" && <div className="collection-folder"><b><EmptyIcon name="star" /></b></div>}
      {kind === "insights" && <div className="insight-window"><i /><i /><i /><i /></div>}
    </div>
  );
}

function EmptyStateCard({ card, searchTerm, onSearch, onReset }: { card: EmptyCard; searchTerm: string; onSearch: (term: string) => void; onReset: () => void }) {
  return (
    <article className={`empty-state-card ${card.kind}`}>
      <header><i><EmptyIcon name={card.icon} /></i><strong>{card.eyebrow}</strong></header>
      <EmptyIllustration kind={card.kind} searchTerm={searchTerm} />
      <h2>{card.title}</h2>
      <p>{card.description}</p>
      {card.kind === "search" && <div className="empty-suggestions"><small>Suggestions :</small><div>{["Back to School", "Rentrée scolaire", "Ambiance école"].map((suggestion) => <button type="button" className={searchTerm === suggestion ? "active" : ""} onClick={() => onSearch(suggestion)} key={suggestion}>{suggestion}</button>)}</div></div>}
      <footer>
        {card.primary && <a className="empty-primary" href={card.primary.href}>{card.primary.label}</a>}
        {card.kind === "search" ? <button type="button" className="empty-secondary" onClick={onReset}>{card.secondary?.label}</button> : card.secondary && <a className="empty-secondary" href={card.secondary.href}>{card.secondary.href === "/somatch-ai" && <EmptyIcon name="sparkles" />}{card.secondary.label}</a>}
      </footer>
    </article>
  );
}

export default function EmptyStatesPage() {
  const [searchTerm, setSearchTerm] = useState("Back to School");
  const [feedback, setFeedback] = useState("");

  function chooseSuggestion(term: string) {
    setSearchTerm(term);
    setFeedback(`Recherche mise à jour avec « ${term} ».`);
    window.setTimeout(() => setFeedback(""), 2400);
  }

  function resetSearch() {
    setSearchTerm("");
    setFeedback("La recherche a été effacée.");
    window.setTimeout(() => setFeedback(""), 2400);
  }

  return (
    <main className="dashboard-page empty-states-page">
      <AppSidebar active="aucun" context="empty-states" />
      <section className="empty-states-main">
        <header className="empty-states-header">
          <div className="empty-title-icon"><EmptyIcon name="layout" /></div>
          <div><h1>États vides et résultats introuvables</h1><p>Des messages clairs et des actions guidées pour vous aider à avancer.</p></div>
          <aside><i><EmptyIcon name="info" /></i><span>Ces écrans s’affichent automatiquement selon<br />le contexte. Ils vous aident à toujours savoir comment avancer.</span></aside>
        </header>
        <section className="empty-states-grid">
          {emptyCards.map((card) => <EmptyStateCard card={card} searchTerm={searchTerm} onSearch={chooseSuggestion} onReset={resetSearch} key={card.kind} />)}
        </section>
        <section className="empty-help-banner">
          <i><EmptyIcon name="sparkles" /></i><span><strong>Besoin d’aide à tout moment ?</strong><small>SoMatch AI est là pour vous accompagner à chaque étape.</small></span>
          <a href="/somatch-ai">Poser une question à SoMatch AI <EmptyIcon name="arrow" /></a>
        </section>
        <p className={feedback ? "empty-feedback visible" : "empty-feedback"} role="status" aria-live="polite">{feedback}</p>
      </section>
    </main>
  );
}
