import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CookDash — Home Cooks, At Your Door",
  description:
    "Discover talented local home cooks who prepare fresh, authentic meals in your kitchen. Book a personal cooking experience today.",
  keywords: [
    "home cook",
    "personal chef",
    "in-home cooking",
    "local cooks",
    "meal preparation",
    "private dining",
  ],
  openGraph: {
    title: "CookDash — Home Cooks, At Your Door",
    description:
      "Discover talented local home cooks who prepare fresh, authentic meals in your kitchen.",
    type: "website",
    locale: "en_US",
    siteName: "CookDash",
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
      className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-primary font-body">
        {children}
      </body>
    </html>
  );
}
