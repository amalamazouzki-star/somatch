import "./influencer-profile-link.css";

const influencerProfileHref = "/influenceur/maya-el-amrani";

export function InfluencerProfileLink({ name }: { name: string }) {
  return (
    <a
      className="influencer-profile-link"
      href={influencerProfileHref}
      aria-label={`Voir la fiche influenceur de ${name}`}
      title={`Voir la fiche de ${name}`}
    />
  );
}
