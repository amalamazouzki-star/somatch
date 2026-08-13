"use client";

import { useMemo, useState } from "react";
import { AppSidebar } from "../components/AppShell";
import "./support.css";

const quickAccess = [
  { icon: "♨", title: "Premiers pas avec somatch", description: "Découvrez les bases et prenez en main la plateforme.", tone: "pink" },
  { icon: "⌕", title: "Recherche & influenceurs", description: "Apprenez à trouver les meilleurs profils pour vos campagnes.", tone: "orange" },
  { icon: "✧", title: "somatch AI", description: "Optimisez vos castings grâce à notre intelligence artificielle.", tone: "magenta" },
  { icon: "♡", title: "Favoris & collections", description: "Gérez vos favoris et organisez vos collections.", tone: "purple" },
  { icon: "▣", title: "Mes campagnes", description: "Créez, suivez et analysez vos campagnes.", tone: "green" },
  { icon: "♙", title: "Compte & paramètres", description: "Gérez votre compte, votre équipe et vos préférences.", tone: "blue" },
] as const;

const faqs = [
  ["Comment trouver les influenceurs les plus pertinents pour ma campagne ?", "Utilisez Explorer, puis affinez votre recherche avec les filtres de catégorie, localisation, audience et engagement."],
  ["Qu’est-ce que le somatch Score et comment est-il calculé ?", "Le SoMatch Score synthétise la qualité de l’audience, l’authenticité, la régularité, la performance et la compatibilité avec votre marque."],
  ["Comment créer et gérer une campagne ?", "Ouvrez Mes campagnes, créez votre campagne puis ajoutez les créateurs sélectionnés à votre casting."],
  ["Comment ajouter un influenceur à mes favoris ?", "Cliquez sur le cœur présent sur une carte influenceur ou sur sa fiche détaillée."],
  ["Puis-je collaborer avec plusieurs membres de mon équipe ?", "Oui. Depuis votre profil, invitez les membres de votre équipe et attribuez-leur un niveau d’accès."],
] as const;

const requests = [
  { status: "Ouverte", tone: "open", title: "Accès à Hootsuite suspendu", id: "#SR-2026-1257", date: "Créée le 12 mai 2026" },
  { status: "En cours", tone: "pending", title: "Question sur les filtres avancés", id: "#SR-2026-1189", date: "Créée le 5 mai 2026" },
  { status: "Résolue", tone: "resolved", title: "Problème d’export des rapports", id: "#SR-2026-1043", date: "Résolue le 28 avr. 2026" },
] as const;

export default function SupportPage() {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const visibleAccess = useMemo(() => normalizedQuery ? quickAccess.filter((item) => `${item.title} ${item.description}`.toLocaleLowerCase("fr").includes(normalizedQuery)) : quickAccess, [normalizedQuery]);

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 2400);
  }

  return (
    <main className="dashboard-page support-page">
      <AppSidebar active="support" />
      <section className="dashboard-main support-main">
        <header className="support-header"><div><h1>support</h1><p>nous sommes là pour vous accompagner.</p></div><div className="support-user-actions"><button type="button" className="notification-button" aria-label="Notifications">♧<span>3</span></button><button type="button" className="profile-menu"><img src="/dashboard/profile-sara.png" alt="Sara" /><span>⌄</span></button></div></header>

        <label className="support-search support-motion-card"><i>⌕</i><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher dans le centre d’aide..." aria-label="Rechercher dans le centre d’aide" /></label>

        <section className="support-top-grid">
          <div className="quick-access-section"><h2>accès rapides</h2><div className="quick-access-grid">{visibleAccess.map((item) => <button type="button" className="quick-access-card support-motion-card" key={item.title}><i className={item.tone}>{item.icon}</i><span><strong>{item.title}</strong><small>{item.description}</small></span><b>→</b></button>)}</div>{visibleAccess.length === 0 ? <p className="support-empty">Aucun résultat pour cette recherche.</p> : null}</div>
          <aside className="support-ai-card support-motion-card"><div><i>✣</i><h2>Posez votre question<br />à somatch AI</h2></div><p>Obtenez des réponses instantanées sur l’utilisation de la plateforme.</p><button type="button">discuter avec somatch AI&nbsp; ✣</button></aside>
        </section>

        <section className="support-lower-grid">
          <article className="support-panel faq-panel support-motion-card"><h2>questions fréquentes</h2><div>{faqs.map(([question, answer], index) => <section className={openFaq === index ? "open" : ""} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><i>⌄</i></button>{openFaq === index ? <p>{answer}</p> : null}</section>)}</div><button type="button" className="faq-all">voir toutes les questions fréquentes&nbsp;⌄</button></article>

          <form className="support-panel contact-panel support-motion-card" onSubmit={submitRequest}><h2>contacter le support</h2><p>Notre équipe vous répond en moins de 24h ouvrées.</p><label><span>sujet</span><select defaultValue=""><option value="" disabled>Sélectionnez un sujet</option><option>Problème technique</option><option>Question sur mon compte</option><option>Aide sur une campagne</option></select></label><label><span>catégorie</span><select defaultValue=""><option value="" disabled>Sélectionnez une catégorie</option><option>Plateforme</option><option>Facturation</option><option>Influenceurs</option></select></label><label><span>votre message</span><textarea placeholder="Décrivez votre demande en détail..." required /></label><button type="button" className="attachment-button"><i>⌕</i><span><strong>ajouter une pièce jointe <em>(facultatif)</em></strong><small>PDF, JPG, PNG - Max 10 Mo</small></span></button><button type="submit" className="support-submit">{sent ? "demande envoyée ✓" : "envoyer ma demande"}</button></form>

          <article className="support-panel requests-panel support-motion-card"><div className="support-panel-heading"><h2>mes demandes</h2><button type="button">voir toutes</button></div><div>{requests.map((request) => <button type="button" className="request-card" key={request.id}><span><em className={request.tone}>{request.status}</em><strong>{request.title}</strong><small>Demande {request.id}</small><small>{request.date}</small></span><i>›</i></button>)}</div></article>
        </section>

        <footer className="support-footer support-motion-card"><div><i>♧</i><span><strong>Besoin d’aide immédiate ?</strong><small>Écrivez-nous à <a href="mailto:hello@somatch.com">hello@somatch.com</a> ou appelez-nous au <a href="tel:+212661768009">+212 661 76 80 09</a></small></span></div><button type="button">▣&nbsp; Nous contacter</button></footer>
      </section>
    </main>
  );
}
