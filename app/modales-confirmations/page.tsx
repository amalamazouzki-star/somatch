"use client";

import { useState } from "react";
import { AppSidebar } from "../components/AppShell";

type DialogTone = "danger" | "orange" | "purple";

const dialogs: Array<{
  number: number;
  label: string;
  tone: DialogTone;
  icon: string;
  title: string;
  copy: string[];
  primary: string;
  secondary: string;
}> = [
  { number: 1, label: "Supprimer une campagne", tone: "danger", icon: "♙", title: "Supprimer cette campagne ?", copy: ["Cette action est irréversible. Toutes les données", "liées à “Back to School 2026” seront définitivement", "supprimées."], primary: "Supprimer définitivement", secondary: "Annuler" },
  { number: 2, label: "Retirer un influenceur du casting", tone: "orange", icon: "♙×", title: "Retirer Souhaila Abbad\ndu casting ?", copy: ["Elle ne fera plus partie de cette campagne.", "Vous pourrez l’ajouter à nouveau à tout moment."], primary: "Retirer du casting", secondary: "Annuler" },
  { number: 3, label: "Quitter sans enregistrer", tone: "purple", icon: "!", title: "Quitter sans enregistrer ?", copy: ["Vous avez des modifications non enregistrées", "dans votre campagne “Back to School 2026”.", "Souhaitez-vous vraiment quitter ?"], primary: "Continuer l’édition", secondary: "Quitter sans enregistrer" },
  { number: 4, label: "Dupliquer une campagne", tone: "purple", icon: "▣", title: "Dupliquer cette campagne ?", copy: ["Une copie de “Back to School 2026” sera créée", "avec les mêmes paramètres et casting."], primary: "Dupliquer la campagne", secondary: "Annuler" },
];

const toastItems = [
  { number: 5, label: "Influenceur ajouté aux favoris", icon: "♡", title: "Ajouté aux favoris", copy: ["Hafsa Achraf a été ajouté à", "vos favoris."], tone: "green" },
  { number: 6, label: "Influenceur ajouté à une campagne", icon: "♙+", title: "Ajouté au casting", copy: ["Amine HLS a été ajouté au casting", "de “Back to School 2026”."], tone: "green" },
  { number: 7, label: "Modifications enregistrées", icon: "✓", title: "Modifications enregistrées", copy: ["Les modifications de votre campagne", "ont été enregistrées avec succès."], tone: "green" },
  { number: 8, label: "Erreur / action impossible", icon: "!", title: "Action impossible", copy: ["Vous ne pouvez pas supprimer cette", "campagne car elle est déjà en cours", "de diffusion."], tone: "red" },
] as const;

const inlineItems = [
  { tone: "amber", icon: "△", title: "Budget dépassé", copy: "Le budget total dépasse votre enveloppe de 150 000 MAD HT.", action: "Voir le détail" },
  { tone: "blue", icon: "ⓘ", title: "Changement de période", copy: "La modification de la période peut impacter votre planning de campagne.", action: "Compris" },
  { tone: "violet", icon: "✧", title: "Recommandation somatch AI", copy: "En ajoutant 1 profil Micro, vous pouvez améliorer votre reach estimé de +18%.", action: "Voir la recommandation" },
] as const;

export default function ModalsConfirmationsPage() {
  const [hiddenDialogs, setHiddenDialogs] = useState<number[]>([]);
  const [hiddenToasts, setHiddenToasts] = useState<number[]>([]);
  const [hiddenInline, setHiddenInline] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2200);
  };

  return (
    <main className="dashboard-page modal-library-page">
      <AppSidebar active="mes campagnes" />
      <section className="modal-library-main">
        <header className="modal-library-header">
          <div className="modal-title-icon">▣</div>
          <div><h1>Modales &amp; Confirmations</h1><p>Ensemble des modales et notifications utilisées dans somatch pour guider l’utilisateur.</p></div>
          <aside><i>ⓘ</i><span>Les modales bloquent l’action en cours<br />jusqu’à une décision de l’utilisateur.</span></aside>
        </header>

        <section className="dialog-demo-grid">
          {dialogs.map((dialog) => (
            <article className={`dialog-demo ${dialog.tone} ${hiddenDialogs.includes(dialog.number) ? "is-hidden" : ""}`} key={dialog.number}>
              <header><b>{dialog.number}</b><strong>{dialog.label}</strong></header>
              <div className="dialog-window">
                <button className="dialog-close" type="button" onClick={() => setHiddenDialogs((items) => [...items, dialog.number])} aria-label={`Fermer ${dialog.label}`}>×</button>
                <i className="dialog-icon">{dialog.icon}</i>
                <h2>{dialog.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
                <p>{dialog.copy.map((line) => <span key={line}>{line}</span>)}</p>
                <div className="dialog-actions">
                  <button type="button" className="dialog-primary" onClick={() => showFeedback(dialog.primary)}>{dialog.primary}</button>
                  <button type="button" className="dialog-secondary" onClick={() => showFeedback(dialog.secondary)}>{dialog.secondary}</button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="toast-demo-grid">
          {toastItems.map((toast) => (
            <article className={`toast-demo ${toast.tone} ${hiddenToasts.includes(toast.number) ? "is-hidden" : ""}`} key={toast.number}>
              <header><b>{toast.number}</b><strong>{toast.label}</strong><small>(toast)</small></header>
              <div className="toast-window">
                <i>{toast.icon}</i><span><strong>{toast.title}</strong><small>{toast.copy.map((line) => <em key={line}>{line}</em>)}</small></span>
                <button type="button" onClick={() => setHiddenToasts((items) => [...items, toast.number])} aria-label={`Fermer ${toast.title}`}>×</button>
              </div>
              {toast.number === 5 && <aside><i>♧</i><span>Toast : message court qui apparaît<br />en bas à droite et disparaît<br />automatiquement.</span></aside>}
            </article>
          ))}
        </section>

        <section className="inline-confirmations">
          <header><b>9</b><strong>Confirmation inline</strong><small>(exemples)</small></header>
          <div>
            {inlineItems.map((item, index) => (
              <article className={`${item.tone} ${hiddenInline.includes(index) ? "is-hidden" : ""}`} key={item.title}>
                <i>{item.icon}</i><span><strong>{item.title}</strong><small>{item.copy}</small><button type="button" onClick={() => showFeedback(item.action)}>{item.action}</button></span>
                <button className="inline-close" type="button" onClick={() => setHiddenInline((items) => [...items, index])} aria-label={`Fermer ${item.title}`}>×</button>
              </article>
            ))}
          </div>
        </section>

        <footer className="modal-library-footer"><i>♙</i><span>Ces messages assurent clarté, sécurité et fluidité dans l’expérience utilisateur.</span><b /> <a href="/support">Besoin d’aide ? Contactez notre support</a></footer>
        {feedback && <div className="modal-action-feedback" role="status">✓ {feedback}</div>}
      </section>
    </main>
  );
}
