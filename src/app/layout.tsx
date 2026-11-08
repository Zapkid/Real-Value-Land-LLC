import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const displayFont = localFont({
  variable: "--font-display",
  src: [
    { path: "../assets/fonts/PlayfairDisplay-Variable.woff2", weight: "500 900", style: "normal" },
    { path: "../assets/fonts/PlayfairDisplay-Italic-Variable.woff2", weight: "500 900", style: "italic" },
  ],
});

const bodyFont = localFont({
  variable: "--font-body",
  src: "../assets/fonts/PlusJakartaSans-Variable.woff2",
  weight: "400 700",
});

const brandFont = localFont({
  src: "../assets/fonts/BarlowCondensed-Bold.ttf",
  variable: "--font-brand",
  weight: "700",
});

const description =
  "Real Value Land LLC is an independent land consulting firm. We help landowners, builders, and investors understand what a parcel can become before they commit.";

export const metadata: Metadata = {
  metadataBase: new URL("https://realvaluelandllc.com"),
  title: "Real Value Land LLC | Land Consulting & Advisory",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Real Value Land LLC | Land Consulting & Advisory",
    description,
    siteName: "Real Value Land LLC",
    url: "/",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Value Land LLC | Land Consulting & Advisory",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1b3b2b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${brandFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-forest-dark"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
