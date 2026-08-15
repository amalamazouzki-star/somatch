"use client";

import type { KeyboardEvent } from "react";
import "./influencer-profile-link.css";

const influencerProfileHref = "/influenceur/maya-el-amrani";

function activateProfileFromKeyboard(event: KeyboardEvent<HTMLAnchorElement>) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  event.currentTarget.click();
}

export function InfluencerProfileLink({ name }: { name: string }) {
  return (
    <a
      className="influencer-profile-link"
      href={influencerProfileHref}
      aria-label={`Voir la fiche influenceur de ${name}`}
      title={`Voir la fiche de ${name}`}
      onKeyDown={activateProfileFromKeyboard}
    />
  );
}
