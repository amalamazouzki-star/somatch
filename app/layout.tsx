import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "./globals.css";
import "./components/notifications.css";

export const metadata: Metadata = {
  title: "Connexion | SoMatch",
  description: "Connectez-vous à votre compte SoMatch.",
  icons: { icon: "/favicon.svg" },
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
