import { AppSidebar } from "../components/AppShell";

type EmptyCard = {
  kind: "explorer" | "favorites" | "campaigns" | "notifications" | "search" | "casting" | "collections" | "insights";
  eyebrow: string;
  icon: string;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

const emptyCards: EmptyCard[] = [
  {
    kind: "explorer",
    eyebrow: "Explorer — Aucun résultat",
    icon: "⌕",
    title: "Aucun créateur ne correspond\nà vos critères",
    description: "Essayez d’ajuster vos filtres ou laissez\nsomatch AI vous proposer des profils pertinents.",
    primary: { label: "Modifier les filtres", href: "/explorer" },
    secondary: { label: "✧  Demander à somatch AI", href: "/somatch-ai" },
  },
  {
    kind: "favorites",
    eyebrow: "Favoris — Vide",
    icon: "♡",
    title: "Vous n’avez encore enregistré\naucun créateur",
    description: "Enregistrez vos créateurs préférés en cliquant\nsur l’icône ♡ lors de votre exploration.",
    primary: { label: "Explorer les créateurs", href: "/explorer" },
  },
  {
    kind: "campaigns",
    eyebrow: "Mes campagnes — Vide",
    icon: "▣",
    title: "Créez votre première campagne",
    description: "Lancez votre première campagne\nen quelques étapes simples.",
    primary: { label: "Créer une campagne", href: "/campagnes/creer" },
    secondary: { label: "✧  Commencer avec somatch AI", href: "/somatch-ai" },
  },
  {
    kind: "notifications",
    eyebrow: "Notifications — Vide",
    icon: "♧",
    title: "Vous êtes à jour !",
    description: "Vous n’avez aucune nouvelle notification\npour le moment. Revenez plus tard 🙂",
  },
  {
    kind: "search",
    eyebrow: "Recherche — Aucun résultat",
    icon: "⌕",
    title: "Aucun résultat pour “back to school”",
    description: "Vérifiez l’orthographe ou essayez\nl’une des suggestions ci-dessous.",
    secondary: { label: "Effacer la recherche", href: "/explorer" },
  },
  {
    kind: "casting",
    eyebrow: "Casting — Vide",
    icon: "♧",
    title: "Votre casting est vide",
    description: "Ajoutez des créateurs à votre casting\ndepuis Explorer ou laissez somatch AI\nvous proposer une sélection.",
    primary: { label: "Ajouter depuis Explorer", href: "/explorer" },
    secondary: { label: "✧  Générer avec somatch AI", href: "/somatch-ai" },
  },
  {
    kind: "collections",
    eyebrow: "Collections — Vide",
    icon: "□",
    title: "Vous n’avez aucune collection",
    description: "Créez des collections pour organiser\nvos créateurs par projet, thématique\nou marque.",
    primary: { label: "Créer une collection", href: "/favoris" },
  },
  {
    kind: "insights",
    eyebrow: "Insights — Aucun insight",
    icon: "▥",
    title: "Pas d’insights disponibles",
    description: "Les insights apparaîtront ici une fois que\nvous aurez des campagnes actives.",
    secondary: { label: "Lancer une campagne", href: "/campagnes/creer" },
  },
];

function EmptyIllustration({ kind }: { kind: EmptyCard["kind"] }) {
  if (kind === "search") {
    return (
      <div className={`empty-illustration ${kind}`} aria-hidden="true">
        <div className="empty-search-pill"><span>back to school</span><b>×</b></div>
        <i className="small-search">⌕</i>
      </div>
    );
  }

  return (
    <div className={`empty-illustration ${kind}`} aria-hidden="true">
      <i className="empty-spark one">✦</i><i className="empty-spark two">✦</i>
      {kind === "explorer" && <div className="magnifier"><b>×</b></div>}
      {kind === "favorites" && <div className="heart-outline">♡</div>}
      {kind === "campaigns" && <div className="campaign-folder"><b>＋</b></div>}
      {kind === "notifications" && <div className="notification-bell">♧<b>✓</b></div>}
      {kind === "casting" && <div className="casting-people"><i>●</i><i>●</i><i>◯</i><b>＋</b></div>}
      {kind === "collections" && <div className="collection-folder"><b>★</b></div>}
      {kind === "insights" && <div className="insight-window"><i /><i /><i /><i /></div>}
    </div>
  );
}

function EmptyStateCard({ card }: { card: EmptyCard }) {
  return (
    <article className={`empty-state-card ${card.kind}`}>
      <header><i>{card.icon}</i><strong>{card.eyebrow}</strong></header>
      <EmptyIllustration kind={card.kind} />
      <h2>{card.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
      <p>{card.description.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
      {card.kind === "search" && (
        <div className="empty-suggestions"><small>Suggestions :</small><div><button>Back to school</button><button>Rentrée scolaire</button><button>School vibes</button></div></div>
      )}
      <footer>
        {card.primary && <a className="empty-primary" href={card.primary.href}>{card.primary.label}</a>}
        {card.secondary && <a className="empty-secondary" href={card.secondary.href}>{card.secondary.label}</a>}
      </footer>
    </article>
  );
}

export default function EmptyStatesPage() {
  return (
    <main className="dashboard-page empty-states-page">
      <AppSidebar active="aucun" context="empty-states" />
      <section className="empty-states-main">
        <header className="empty-states-header">
          <div className="empty-title-icon">▣</div>
          <div><h1>États vides &amp; No Results</h1><p>Des messages clairs et des actions guidées pour vous aider à avancer.</p></div>
          <aside><i>ⓘ</i><span>Ces écrans s’affichent automatiquement selon<br />le contexte. Ils vous aident à ne jamais rester bloqué.</span></aside>
        </header>
        <section className="empty-states-grid">
          {emptyCards.map((card) => <EmptyStateCard card={card} key={card.kind} />)}
        </section>
        <section className="empty-help-banner">
          <i>✧</i><span><strong>Besoin d’aide à tout moment ?</strong><small>somatch AI est là pour vous accompagner à chaque étape.</small></span>
          <a href="/somatch-ai">Poser une question à somatch AI <b>→</b></a>
        </section>
      </section>
    </main>
  );
}
