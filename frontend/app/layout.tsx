import type { Metadata } from "next";
import "./globals.css";
import { Revalia, Roboto_Condensed } from "next/font/google";

const revalia = Revalia({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-header",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "EcoRide - website",
  description: "Ecoride, la plateforme de covoiturage éco-responsable",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${revalia.variable} ${robotoCondensed.variable}`}
    >
      <body className="antialiased bg-background text-text font-[var(--font-body)]">
        {children}
      </body>
    </html>
  );
}
