import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { siteConfig } from "@/data/config";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { GHLChatWidget } from "@/components/chat/GHLChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://basewilmington.com"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name} Wilmington`,
  },
  description: siteConfig.longDescription,
  keywords: [...siteConfig.seoKeywords],
  openGraph: {
    title: `${siteConfig.name} — Wilmington's Event & Creative Campus`,
    description: siteConfig.longDescription,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Wilmington's Event & Creative Campus`,
    description: siteConfig.longDescription,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
    { media: "(prefers-color-scheme: light)", color: "#F5F5F2" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Inline script — runs synchronously before hydration so the right theme
// class is on <html> before first paint (no flash).
const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('base-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : true; /* default to dark */
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-screen bg-base-black text-base-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-base-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCTA />
        <LocalBusinessJsonLd />
        <GHLChatWidget />
      </body>
    </html>
  );
}
