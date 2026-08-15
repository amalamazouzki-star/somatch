"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AppSidebar } from "../components/AppShell";

type ModalIconName = "alert" | "arrow" | "check" | "close" | "copy" | "heart" | "info" | "layout" | "lock" | "sparkles" | "trash" | "userPlus" | "userRemove" | "warning";

const MODAL_ICONS: Record<ModalIconName, ReactNode> = {
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5V13M12 16.5h.01" /></>,
  arrow: <><path d="M4 12h15" /><path d="m14 7 5 5-5 5" /></>,
  check: <path d="m5 12.5 4.2 4L19 7" />,
  close: <path d="m7 7 10 10M17 7 7 17" />,
  copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4H4v12h4" /></>,
  heart: <path d="M20.7 8.5c0 5.1-8.7 10.8-8.7 10.8S3.3 13.6 3.3 8.5A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.7 2.1Z" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 10.5V17M12 7.2h.01" /></>,
  layout: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></>,
  sparkles: <><path d="M12 3c.7 4 2.5 5.8 6.5 6.5-4 .7-5.8 2.5-6.5 6.5-.7-4-2.5-5.8-6.5-6.5C9.5 8.8 11.3 7 12 3Z" /><path d="M19 3v4M21 5h-4M5 16v4M7 18H3" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></>,
  userPlus: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7s5 1.9 5.5 5.7M17 10v7M13.5 13.5h7" /></>,
  userRemove: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.5-3.8 2.4-5.7 5.5-5.7s5 1.9 5.5 5.7M15 12l5 5M20 12l-5 5" /></>,
  warning: <><path d="M12 3 2.8 20h18.4z" /><path d="M12 9v5M12 17h.01" /></>,
};

function ModalIcon({ name }: { name: ModalIconName }) {
  return <svg className="modal-vector-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{MODAL_ICONS[name]}</svg>;
}

type DialogTone = "danger" | "orange" | "purple";

const dialogs: Array<{ number: number; label: string; tone: DialogTone; icon: ModalIconName; title: string; copy: string[]; primary: string; secondary: string }> = [
  { number: 1, label: "Supprimer une campagne", tone: "danger", icon: "trash", title: "Supprimer cette campagne ?", copy: ["Cette action est irréversible. Toutes les données", "liées à « Back to School 2026 » seront définitivement", "supprimées."], primary: "Supprimer définitivement", secondary: "Annuler" },
  { number: 2, label: "Retirer une influenceuse du casting", tone: "orange", icon: "userRemove", title: "Retirer Souhaila Abbad\ndu casting ?", copy: ["Elle ne fera plus partie de cette campagne.", "Vous pourrez l’ajouter à nouveau à tout moment."], primary: "Retirer du casting", secondary: "Annuler" },
  { number: 3, label: "Quitter sans enregistrer", tone: "purple", icon: "alert", title: "Quitter sans enregistrer ?", copy: ["Vous avez des modifications non enregistrées", "dans votre campagne « Back to School 2026 ».", "Souhaitez-vous vraiment quitter ?"], primary: "Continuer la modification", secondary: "Quitter sans enregistrer" },
  { number: 4, label: "Dupliquer une campagne", tone: "purple", icon: "copy", title: "Dupliquer cette campagne ?", copy: ["Une copie de « Back to School 2026 » sera créée", "avec les mêmes paramètres et le même casting."], primary: "Dupliquer la campagne", secondary: "Annuler" },
];

const toastItems: ReadonlyArray<{ number: number; label: string; icon: ModalIconName; title: string; copy: string[]; tone: "green" | "red" }> = [
  { number: 5, label: "Influenceuse ajoutée aux favoris", icon: "heart", title: "Ajoutée aux favoris", copy: ["Hafsa Achraf a été ajoutée à", "vos favoris."], tone: "green" },
  { number: 6, label: "Influenceur ajouté à une campagne", icon: "userPlus", title: "Ajouté au casting", copy: ["Amine HLS a été ajouté au casting", "de « Back to School 2026 »."], tone: "green" },
  { number: 7, label: "Modifications enregistrées", icon: "check", title: "Modifications enregistrées", copy: ["Les modifications de votre campagne", "ont été enregistrées avec succès."], tone: "green" },
  { number: 8, label: "Erreur ou action impossible", icon: "alert", title: "Action impossible", copy: ["Vous ne pouvez pas supprimer cette", "campagne, car elle est déjà en cours", "de diffusion."], tone: "red" },
];

const inlineItems: ReadonlyArray<{ tone: "amber" | "blue" | "violet"; icon: ModalIconName; title: string; copy: string; action: string }> = [
  { tone: "amber", icon: "warning", title: "Budget dépassé", copy: "Le budget total dépasse votre enveloppe de 150 000 MAD HT.", action: "Voir le détail" },
  { tone: "blue", icon: "info", title: "Changement de période", copy: "La modification de la période peut avoir un impact sur le calendrier de votre campagne.", action: "Compris" },
  { tone: "violet", icon: "sparkles", title: "Recommandation SoMatch AI", copy: "En ajoutant un profil de micro-influenceur, vous pouvez améliorer votre portée estimée de 18 %.", action: "Voir la recommandation" },
];

export default function ModalsConfirmationsPage() {
  const [hiddenDialogs, setHiddenDialogs] = useState<number[]>([]);
  const [hiddenToasts, setHiddenToasts] = useState<number[]>([]);
  const [hiddenInline, setHiddenInline] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    document.title = "Modales et confirmations | SoMatch";
  }, []);

  const showFeedback = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 2400);
  };

  const dismissDialog = (number: number, label: string) => {
    setHiddenDialogs((items) => [...items, number]);
    showFeedback(`La modale « ${label} » a été fermée.`);
  };

  const dismissToast = (number: number, title: string) => {
    setHiddenToasts((items) => [...items, number]);
    showFeedback(`La notification « ${title} » a été fermée.`);
  };

  const dismissInline = (index: number, title: string) => {
    setHiddenInline((items) => [...items, index]);
    showFeedback(`Le message « ${title} » a été fermé.`);
  };

  return (
    <main className="dashboard-page modal-library-page">
      <AppSidebar active="mes campagnes" />
      <section className="modal-library-main">
        <header className="modal-library-header">
          <div className="modal-title-icon"><ModalIcon name="layout" /></div>
          <div><h1>Modales et confirmations</h1><p>Ensemble des modales et notifications utilisées dans SoMatch pour guider l’utilisateur.</p></div>
          <aside><i><ModalIcon name="info" /></i><span>Les fenêtres modales bloquent l’action en cours<br />jusqu’à ce que l’utilisateur prenne une décision.</span></aside>
        </header>

        <section className="dialog-demo-grid">
          {dialogs.map((dialog) => (
            <article className={`dialog-demo ${dialog.tone} ${hiddenDialogs.includes(dialog.number) ? "is-hidden" : ""}`} aria-hidden={hiddenDialogs.includes(dialog.number)} key={dialog.number}>
              <header><b>{dialog.number}</b><strong>{dialog.label}</strong></header>
              <div className="dialog-window">
                <button className="dialog-close" type="button" onClick={() => dismissDialog(dialog.number, dialog.label)} aria-label={`Fermer : ${dialog.label}`}><ModalIcon name="close" /></button>
                <i className="dialog-icon"><ModalIcon name={dialog.icon} /></i>
                <h2>{dialog.title}</h2>
                <p>{dialog.copy.join("\n")}</p>
                <div className="dialog-actions">
                  <button type="button" className="dialog-primary" onClick={() => showFeedback(`Action simulée : « ${dialog.primary} ».`)}>{dialog.primary}</button>
                  <button type="button" className="dialog-secondary" onClick={() => showFeedback(`Action simulée : « ${dialog.secondary} ».`)}>{dialog.secondary}</button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="toast-demo-grid">
          {toastItems.map((toast) => (
            <article className={`toast-demo ${toast.tone} ${hiddenToasts.includes(toast.number) ? "is-hidden" : ""}`} aria-hidden={hiddenToasts.includes(toast.number)} key={toast.number}>
              <header><b>{toast.number}</b><strong>{toast.label}</strong><small>(notification)</small></header>
              <div className="toast-window">
                <i><ModalIcon name={toast.icon} /></i><span><strong>{toast.title}</strong><small>{toast.copy.join("\n")}</small></span>
                <button type="button" onClick={() => dismissToast(toast.number, toast.title)} aria-label={`Fermer : ${toast.title}`}><ModalIcon name="close" /></button>
              </div>
              {toast.number === 5 && <aside><i><ModalIcon name="info" /></i><span>Notification éphémère : message court qui apparaît<br />en bas à droite et disparaît automatiquement.</span></aside>}
            </article>
          ))}
        </section>

        <section className="inline-confirmations">
          <header><b>9</b><strong>Confirmations contextuelles</strong><small>(exemples)</small></header>
          <div>
            {inlineItems.map((item, index) => (
              <article className={`${item.tone} ${hiddenInline.includes(index) ? "is-hidden" : ""}`} aria-hidden={hiddenInline.includes(index)} key={item.title}>
                <i><ModalIcon name={item.icon} /></i><span><strong>{item.title}</strong><small>{item.copy}</small><button type="button" onClick={() => showFeedback(`Action simulée : « ${item.action} ».`)}>{item.action}</button></span>
                <button className="inline-close" type="button" onClick={() => dismissInline(index, item.title)} aria-label={`Fermer : ${item.title}`}><ModalIcon name="close" /></button>
              </article>
            ))}
          </div>
        </section>

        <footer className="modal-library-footer"><i><ModalIcon name="lock" /></i><span>Ces messages assurent clarté, sécurité et fluidité dans l’expérience utilisateur.</span><b /> <a href="/support">Besoin d’aide ? Contactez notre support <ModalIcon name="arrow" /></a></footer>
        <div className={feedback ? "modal-action-feedback visible" : "modal-action-feedback"} role="status" aria-live="polite"><ModalIcon name="check" />{feedback}</div>
      </section>
    </main>
  );
}
