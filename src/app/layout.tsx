import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sideplate.online"),
  title: {
    default: "Sideplate | Your website on every table",
    template: "%s | Sideplate",
  },
  description:
    "Sideplate turns every restaurant table into a digital waiter: QR ordering, shared bills, a live kitchen display and one calm dashboard for the whole service.",
  icons: {
    icon: "/qr-logo.png",
    apple: "/qr-logo.png",
  },
  keywords: [
    "Sideplate",
    "QR ordering",
    "restaurant ordering",
    "table management",
    "kitchen display system",
    "restaurant dashboard",
    "Nigerian restaurants",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Restaurant software",
  authors: [{ name: "Sideplate" }],
  creator: "Sideplate",
  publisher: "Sideplate",
  applicationName: "Sideplate",
  openGraph: {
    title: "Sideplate | Your website on every table",
    description:
      "QR ordering, table service, kitchen operations and restaurant intelligence in one calm system.",
    url: "https://sideplate.online",
    siteName: "Sideplate",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sideplate: your website on every table",
    description:
      "QR ordering, shared bills, a live kitchen display and one calm dashboard for the whole service.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sideplate.online/#organization",
      name: "Sideplate",
      url: "https://sideplate.online",
      email: "hello@sideplate.online",
      description:
        "Sideplate turns every restaurant table into a digital waiter: QR ordering, shared bills, a live kitchen display and one dashboard for the whole service.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://sideplate.online/#website",
      url: "https://sideplate.online",
      name: "Sideplate",
      publisher: { "@id": "https://sideplate.online/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      name: "Sideplate",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Restaurant ordering and kitchen management",
      operatingSystem: "Web browser",
      url: "https://sideplate.online",
      description:
        "QR menu and table ordering, shared bills, a kitchen display system, table management and service insights for restaurants.",
      featureList: [
        "QR menu and ordering",
        "Table management",
        "Shared bills and checkout",
        "Live kitchen display",
        "Menu management",
        "Service insights",
      ],
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
