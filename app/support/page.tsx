"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { AppSidebar } from "../components/AppShell";
import { NotificationTrigger } from "../components/NotificationCenter";
import "./support.css";

type SupportIconName = "account" | "arrow" | "campaign" | "check" | "chevron" | "headset" | "heart" | "paperclip" | "rocket" | "search" | "sparkles" | "work";

const SUPPORT_ICONS: Record<SupportIconName, ReactNode> = {
  account: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.2" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7s5 1.9 5.5 5.7M14.5 14.2c2.9-.4 5 .9 5.7 3.8" /></>,
  arrow: <><path d="M4 12h15" /><path d="m14 7 5 5-5 5" /></>,
  campaign: <><rect x="3.5" y="6.6" width="17" height="13.2" rx="1.7" /><path d="M8.1 6.6V4.2h7.8v2.4M3.5 11.4h17" /></>,
  check: <path d="m5 12.5 4.2 4L19 7" />,
  chevron: <path d="m8.5 10 3.5 3.5 3.5-3.5" />,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="2" /><rect x="17" y="13" width="4" height="6" rx="2" /><path d="M17 19c0 1.4-1.1 2-3 2h-2" /></>,
  heart: <path d="M20.7 8.5c0 5.1-8.7 10.8-8.7 10.8S3.3 13.6 3.3 8.5A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.7 2.1Z" />,
  paperclip: <path d="m8.5 12.5 6.7-6.7a3 3 0 0 1 4.3 4.2l-8.2 8.2a4.5 4.5 0 0 1-6.4-6.4l7.7-7.7" />,
  rocket: <><path d="M14 5c2.4-1.7 4.7-2.2 6.8-1.8.4 2.1-.1 4.4-1.8 6.8l-5.8 5.8-5-5z" /><path d="m14.5 14.5-1 5-3-3-5 1 1-5M8.5 10.5 4 10l3-3.5M15.5 17 16 20l3.5-4.5" /><circle cx="16.5" cy="7.5" r="1.5" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></>,
  sparkles: <><path d="M12 3c.7 4 2.5 5.8 6.5 6.5-4 .7-5.8 2.5-6.5 6.5-.7-4-2.5-5.8-6.5-6.5C9.5 8.8 11.3 7 12 3Z" /><path d="M19 3v4M21 5h-4M5 16v4M7 18H3" /></>,
  work: <><rect x="3.5" y="7" width="17" height="12" rx="2" /><path d="M9 7V4h6v3M3.5 12h17M10 12v2h4v-2" /></>,
};

function SupportIcon({ name }: { name: SupportIconName }) {
  return <svg className="support-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{SUPPORT_ICONS[name]}</svg>;
}

const quickAccess: ReadonlyArray<{ icon: SupportIconName; title: string; description: string; tone: string }> = [
  { icon: "rocket", title: "Premiers pas avec SoMatch", description: "Découvrez les bases et prenez en main la plateforme.", tone: "pink" },
  { icon: "search", title: "Recherche et influenceurs", description: "Apprenez à trouver les meilleurs profils pour vos campagnes.", tone: "orange" },
  { icon: "sparkles", title: "SoMatch AI", description: "Optimisez vos castings grâce à notre intelligence artificielle.", tone: "magenta" },
  { icon: "heart", title: "Favoris et collections", description: "Gérez vos favoris et organisez vos collections.", tone: "purple" },
  { icon: "campaign", title: "Mes campagnes", description: "Créez, suivez et analysez vos campagnes.", tone: "green" },
  { icon: "account", title: "Compte et paramètres", description: "Gérez votre compte, votre équipe et vos préférences.", tone: "blue" },
];

const faqs = [
  ["Comment trouver les influenceurs les plus pertinents pour ma campagne ?", "Utilisez Explorer, puis affinez votre recherche avec les filtres de catégorie, de localisation, d’audience et d’engagement."],
  ["Qu’est-ce que le SoMatch Score et comment est-il calculé ?", "Le SoMatch Score synthétise la qualité de l’audience, l’authenticité, la régularité, la performance et la compatibilité avec votre marque."],
  ["Comment créer et gérer une campagne ?", "Ouvrez Mes campagnes, créez votre campagne, puis ajoutez les créateurs sélectionnés à votre casting."],
  ["Comment ajouter un influenceur à mes favoris ?", "Cliquez sur le cœur présent sur une carte d’influenceur ou sur sa fiche détaillée."],
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
  const [feedback, setFeedback] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("fr");
  const visibleAccess = useMemo(() => normalizedQuery ? quickAccess.filter((item) => `${item.title} ${item.description}`.toLocaleLowerCase("fr").includes(normalizedQuery)) : quickAccess, [normalizedQuery]);

  function showFeedback(message: string) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2600);
  }

  function submitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    setFeedback("Votre demande a bien été envoyée au support.");
    event.currentTarget.reset();
    window.setTimeout(() => { setSent(false); setFeedback(""); }, 2400);
  }

  return (
    <main className="dashboard-page support-page">
      <AppSidebar active="support" />
      <section className="dashboard-main support-main">
        <header className="support-header"><div><h1>Support</h1><p>Nous sommes là pour vous accompagner.</p></div><div className="support-user-actions"><NotificationTrigger /><a href="/profil" className="profile-menu" aria-label="Ouvrir mon profil"><img src="/dashboard/profile-sara.png" alt="Sara Benali" /><span><SupportIcon name="chevron" /></span></a></div></header>

        <label className="support-search support-motion-card"><i><SupportIcon name="search" /></i><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher dans le centre d’aide..." aria-label="Rechercher dans le centre d’aide" /></label>

        <section className="support-top-grid">
          <div className="quick-access-section"><h2>Accès rapides</h2><div className="quick-access-grid">{visibleAccess.map((item) => <button type="button" className="quick-access-card support-motion-card" onClick={() => showFeedback(`Ouverture de l’aide « ${item.title} » en mode démonstration.`)} key={item.title}><i className={item.tone}><SupportIcon name={item.icon} /></i><span><strong>{item.title}</strong><small>{item.description}</small></span><b><SupportIcon name="arrow" /></b></button>)}</div>{visibleAccess.length === 0 ? <div className="support-empty"><p>Aucun article ne correspond à cette recherche.</p><button type="button" onClick={() => setQuery("")}>Effacer la recherche</button></div> : null}</div>
          <aside className="support-ai-card support-motion-card"><div><i><SupportIcon name="sparkles" /></i><h2>Posez votre question<br />{" "}à SoMatch AI</h2></div><p>Obtenez des réponses instantanées sur l’utilisation de la plateforme.</p><a href="/somatch-ai">Discuter avec SoMatch AI <SupportIcon name="sparkles" /></a></aside>
        </section>

        <section className="support-lower-grid">
          <article className="support-panel faq-panel support-motion-card"><h2>Questions fréquentes</h2><div>{faqs.map(([question, answer], index) => <section className={openFaq === index ? "open" : ""} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`}><span>{question}</span><i><SupportIcon name="chevron" /></i></button>{openFaq === index ? <p id={`faq-answer-${index}`}>{answer}</p> : null}</section>)}</div><button type="button" className="faq-all" onClick={() => showFeedback("Toutes les questions fréquentes sont affichées sur cette démonstration.")}>Voir toutes les questions fréquentes <SupportIcon name="arrow" /></button></article>

          <form className="support-panel contact-panel support-motion-card" onSubmit={submitRequest}><h2>Contacter le support</h2><p>Notre équipe vous répond en moins de 24 h ouvrées.</p><label><span>Sujet</span><select defaultValue="" required><option value="" disabled>Sélectionnez un sujet</option><option>Problème technique</option><option>Question sur mon compte</option><option>Aide sur une campagne</option></select></label><label><span>Catégorie</span><select defaultValue="" required><option value="" disabled>Sélectionnez une catégorie</option><option>Plateforme</option><option>Facturation</option><option>Influenceurs</option></select></label><label><span>Votre message</span><textarea placeholder="Décrivez votre demande en détail..." required /></label><button type="button" className="attachment-button" onClick={() => showFeedback("L’ajout d’une pièce jointe est disponible en mode démonstration.")}><i><SupportIcon name="paperclip" /></i><span><strong>Ajouter une pièce jointe <em>(facultatif)</em></strong><small>PDF, JPG ou PNG – 10 Mo max.</small></span></button><button type="submit" className="support-submit">{sent ? <><span>Demande envoyée</span><SupportIcon name="check" /></> : "Envoyer ma demande"}</button></form>

          <article className="support-panel requests-panel support-motion-card"><div className="support-panel-heading"><h2>Mes demandes</h2><button type="button" onClick={() => showFeedback("Toutes vos demandes sont déjà affichées dans cette démonstration.")}>Voir toutes</button></div><div>{requests.map((request) => <button type="button" className="request-card" onClick={() => showFeedback(`Ouverture de la demande ${request.id} en mode démonstration.`)} key={request.id}><span><em className={request.tone}>{request.status}</em><strong>{request.title}</strong><small>Demande {request.id}</small><small>{request.date}</small></span><i><SupportIcon name="chevron" /></i></button>)}</div></article>
        </section>

        <footer className="support-footer support-motion-card"><div><i><SupportIcon name="headset" /></i><span><strong>Besoin d’aide immédiate ?</strong><small>Écrivez-nous à <a href="mailto:hello@somatch.com">hello@somatch.com</a> ou appelez-nous au <a href="tel:+212661768009">+212 661 76 80 09</a>.</small></span></div><a className="support-contact-action" href="mailto:hello@somatch.com"><SupportIcon name="work" />Nous contacter</a></footer>
        <p className={feedback ? "support-feedback visible" : "support-feedback"} role="status" aria-live="polite">{feedback}</p>
      </section>
    </main>
  );
}
