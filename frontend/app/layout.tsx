import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoRide - website",
  description: "Ecoride, la plateforme de covoiturage Eco-Responsable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased roboto-condensed bg-background text-text">
        {children}
      </body>
    </html>
  );
}
