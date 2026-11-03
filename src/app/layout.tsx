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
  title: {
    default: "QR | Your website on every table",
    template: "%s | QR",
  },
  description:
    "QR turns every restaurant table into a digital waiter: QR ordering, shared bills, a live kitchen display and one intelligent dashboard for the whole service.",
  keywords: [
    "QR ordering",
    "restaurant ordering",
    "table management",
    "kitchen display system",
    "restaurant dashboard",
    "Nigerian restaurants",
  ],
  openGraph: {
    title: "QR | Your website on every table",
    description:
      "QR ordering, table service, kitchen operations and restaurant intelligence in one calm system.",
    type: "website",
  },
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
      <body>{children}</body>
    </html>
  );
}
