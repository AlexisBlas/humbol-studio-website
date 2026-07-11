import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "humbol — Shape that matters.",
  description:
    "humbol is a solo design studio. We partner with founders, startups, and mission-driven organizations to design products people actually use — and systems teams can actually build from.",
  openGraph: {
    title: "humbol — Shape that matters.",
    description:
      "humbol is a solo design studio. We partner with founders, startups, and mission-driven organizations to design products people actually use — and systems teams can actually build from.",
    url: "https://humbol.studio",
    siteName: "humbol",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "humbol — Shape that matters.",
    description:
      "humbol is a solo design studio. We partner with founders, startups, and mission-driven organizations to design products people actually use — and systems teams can actually build from.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
