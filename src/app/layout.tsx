import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { PageTransition } from "@/components/page-transition";
import { CookieConsent } from "@/components/cookie-consent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studioro.com"),
  title: {
    default: "Studioro — Reflecterende videokunst uit Delft",
    template: "%s · Studioro",
  },
  description:
    "Film & fotografie uit Delft. Hoogwaardig audiovisueel beeld voor merken, events en verhalen — door Robert van Nimwegen.",
  openGraph: {
    title: "Studioro — Reflecterende videokunst uit Delft",
    description:
      "Film & fotografie uit Delft. Hoogwaardig audiovisueel beeld voor merken, events en verhalen.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${instrument.variable} h-full`}
    >
      <body className="bg-paper text-ink antialiased flex min-h-full flex-col">
        <Cursor />
        <Nav />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
