"use client";

import { useCallback, useEffect, useState } from "react";

type NotificationItem = {
  id: number;
  group: "Aujourd’hui" | "Cette semaine" | "Plus tôt";
  icon: string;
  tone: "purple" | "green" | "orange" | "blue" | "pink" | "lavender";
  title: string;
  copy: string;
  time: string;
  action: string;
  href: string;
  unread: boolean;
};

const initialNotifications: NotificationItem[] = [
  { id: 1, group: "Aujourd’hui", icon: "✣", tone: "purple", title: "Recommandation SoMatch AI", copy: "SoMatch AI vous recommande d’ajouter un profil micro spécialisé Lifestyle/Parenting pour la campagne Back to School 2026.", time: "11:32", action: "Voir la recommandation", href: "/somatch-ai/recommandation", unread: true },
  { id: 2, group: "Aujourd’hui", icon: "▣", tone: "green", title: "Campagne créée", copy: "Votre campagne Back to School 2026 a été créée avec succès.", time: "11:28", action: "Voir la campagne", href: "/campagnes/back-to-school-2026", unread: true },
  { id: 3, group: "Aujourd’hui", icon: "♧", tone: "orange", title: "Influenceur ajouté au casting", copy: "Souhaila Abbad a été ajoutée à votre casting Back to School 2026.", time: "10:15", action: "Voir le profil", href: "/influenceur/maya-el-amrani", unread: true },
  { id: 4, group: "Cette semaine", icon: "♧", tone: "blue", title: "Membre de l’équipe", copy: "Yassmine a modifié le brief de la campagne Summer Glow.", time: "Hier", action: "Voir le brief", href: "/campagnes/creer/brief", unread: false },
  { id: 5, group: "Cette semaine", icon: "⌁", tone: "pink", title: "Nouvelle tendance détectée", copy: "Les contenus “rentrée des classes” sont en forte hausse au Maroc cette semaine (+38 %).", time: "Hier", action: "Consulter l’insight", href: "/tendances", unread: false },
  { id: 6, group: "Plus tôt", icon: "▤", tone: "lavender", title: "Message du support", copy: "Nous avons répondu à votre demande concernant l’export de votre recommandation.", time: "12/05/2026", action: "Voir le message", href: "/support", unread: false },
];

const groups = ["Aujourd’hui", "Cette semaine", "Plus tôt"] as const;

export function NotificationTrigger({ className = "notification-button", count = 6 }: { className?: string; count?: number }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" className={className} aria-label="Ouvrir les notifications" aria-expanded={open} onClick={() => setOpen(true)}>♧<span>{count}</span></button>{open ? <NotificationCenter onClose={() => setOpen(false)} /> : null}</>;
}

export function NotificationCenter({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [tab, setTab] = useState<"Toutes" | "Non lues">("Toutes");
  const visible = tab === "Toutes" ? notifications : notifications.filter(item => item.unread);
  const unreadCount = notifications.filter(item => item.unread).length;
  const close = useCallback(onClose, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [close]);

  function markAllRead() {
    setNotifications(current => current.map(item => ({ ...item, unread: false })));
  }

  return <div className="notification-overlay" role="presentation" onMouseDown={onClose}>
    <aside className="notification-drawer" role="dialog" aria-modal="true" aria-labelledby="notification-title" onMouseDown={event => event.stopPropagation()}>
      <header className="notification-drawer-header"><h2 id="notification-title">Notifications</h2><button type="button" aria-label="Fermer les notifications" onClick={onClose}>×</button></header>
      <nav className="notification-tabs" aria-label="Filtres des notifications"><button className={tab === "Toutes" ? "active" : ""} type="button" onClick={() => setTab("Toutes")}>Toutes ({notifications.length})</button><button className={tab === "Non lues" ? "active" : ""} type="button" onClick={() => setTab("Non lues")}>Non lues ({unreadCount})</button><button className="mark-read" type="button" onClick={markAllRead}>✓　Tout marquer comme lu</button><a href="/parametres" aria-label="Paramètres des notifications">⚙</a></nav>
      <div className="notification-scroll">
        {groups.map(group => {
          const items = visible.filter(item => item.group === group);
          return items.length > 0 ? <section className="notification-group" key={group}><h3>{group}</h3>{items.map(item => <article className={item.unread ? "unread" : ""} key={item.id}><i className={item.tone}>{item.icon}</i><div><header><strong>{item.title}</strong><span>{item.time}<b /></span></header><p>{item.copy}</p><a href={item.href} onClick={onClose}>{item.action}</a></div></article>)}</section> : null;
        })}
        {visible.length === 0 ? <div className="notification-empty"><i>✓</i><strong>Tout est à jour</strong><p>Vous n’avez aucune notification non lue.</p></div> : null}
      </div>
      <footer><button type="button" onClick={() => setTab("Toutes")}>Voir toutes les notifications　→</button></footer>
    </aside>
  </div>;
}
