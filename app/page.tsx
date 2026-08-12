"use client";

import { FormEvent, useState } from "react";

const benefits = [
  { className: "ai-benefit", title: <>Match intelligent<br />par l&apos;IA</> },
  { className: "verified-benefit", title: <>Influenceurs<br />certifiés</> },
  { className: "campaign-benefit", title: <>Campagnes<br />optimisées</> },
];

function VisualCollage() {
  return (
    <div className="visual-collage" aria-hidden="true">
      <img
        className="collage-photo"
        src="/influencer-collage.png"
        alt=""
        draggable={false}
      />
      <div className="collage-fade" />
    </div>
  );
}

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => window.location.assign("/dashboard"), 650);
  }

  return (
    <main className="login-page">
      <section className="story-panel" aria-label="Présentation SoMatch">
        <VisualCollage />
        <div className="story-content">
          <h1>Connectez-vous.<br />Créez <span>l’impact.</span></h1>
          <p>La plateforme intelligente qui connecte<br className="desktop-break" /> marques et influenceurs pour des collaborations<br className="desktop-break" /> authentiques et performantes.</p>
          <div className="benefit-row">
            {benefits.map((benefit) => (
              <div className="benefit" key={benefit.className}>
                <i className={benefit.className} aria-hidden="true" />
                <span>{benefit.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="wave-field" aria-hidden="true">
          {Array.from({ length: 13 }, (_, index) => <i key={index} />)}
        </div>
        <div className="wave-glow" aria-hidden="true" />
      </section>

      <section className="form-zone">
        <form className="login-card" onSubmit={submit}>
          <img className="card-logo" src="/somatch-logo-mark.png" alt="SoMatch" draggable={false} />
          <h2>Bienvenue !</h2>
          <p className="subtitle">Connectez-vous à votre compte SoMatch</p>

          <label className="field">
            <span className="mail-icon" aria-hidden="true" />
            <input type="email" placeholder="Email" aria-label="Email" />
          </label>
          <label className="field">
            <span className="lock-icon" aria-hidden="true" />
            <input type={showPassword ? "text" : "password"} placeholder="Mot de passe" aria-label="Mot de passe" />
            <button className="eye" type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} />
          </label>

          <div className="login-options">
            <label className="remember">
              <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
              <span className="checkmark">✓</span> Se souvenir de moi
            </label>
            <button type="button" className="forgot">Mot de passe oublié ?</button>
          </div>

          <button className="primary-button" type="submit">{submitted ? "Connexion…" : "Se connecter"}</button>

          <div className="divider"><span>ou continuer avec</span></div>
          <div className="social-row">
            <button type="button" className="social-button"><i className="google-icon">G</i><span>Google</span></button>
            <button type="button" className="social-button"><i className="instagram-icon" /><span>Instagram</span></button>
            <button type="button" className="social-button"><i className="tiktok-icon">♪</i><span>TikTok</span></button>
          </div>

          <p className="signup">Pas encore de compte ? <button type="button">Créer un compte</button></p>
        </form>
      </section>
    </main>
  );
}
