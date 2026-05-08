import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fernando Franco Jr. // Engineering Dossier",
  description:
    "Software engineer — mission-critical aerospace, embedded C/C++, Linux, simulation & HIL, telemetry, secure cloud, and full-stack delivery. A cinematic noir dossier.",
  authors: [{ name: "Fernando Franco Jr." }],
  metadataBase: new URL("https://fernandofranco.dev"),
  openGraph: {
    title: "Fernando Franco Jr. // Engineering Dossier",
    description:
      "Vol. 01 // Aerospace & systems engineering dossier — embedded, simulation, distributed software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jetbrains.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="bg-noir-bg text-noir-fg min-h-full font-mono selection:bg-noir-red">
        {children}
      </body>
    </html>
  );
}
