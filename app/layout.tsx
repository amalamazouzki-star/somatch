import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connexion | SoMatch",
  description: "Connectez-vous à votre compte SoMatch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
