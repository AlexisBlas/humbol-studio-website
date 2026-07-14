import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-E5GGSL8RHY";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://humbol.studio"),
  icons: {
    icon: "/favicon.svg",
  },
  title: "humbol — Shape that matters.",
  description:
    "humbol is a one-person design studio partnering with founders, startups, and mission-driven organizations to design products people actually use — and systems teams can actually build from.",
  openGraph: {
    title: "humbol — Shape that matters.",
    description:
      "humbol is a one-person design studio partnering with founders, startups, and mission-driven organizations to design products people actually use — and systems teams can actually build from.",
    url: "https://humbol.studio",
    siteName: "humbol",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "humbol — Shape that matters.",
    description:
      "humbol is a one-person design studio partnering with founders, startups, and mission-driven organizations to design products people actually use — and systems teams can actually build from.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SmoothScroll />
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
