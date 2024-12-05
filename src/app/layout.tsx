import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Define metadata for the page
export const metadata: Metadata = {
  title: "iTrackInvest",
  description:
    "La mejor aplicación para gestion de inversiones.",
  keywords: [
    "gestión médica",
    "software",
    "salud",
    "cuidado paliativo",
    "iTrackInvest",
    "iTrackInvest",
  ],
  authors: [{ name: "iTrackInvest" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "",
    title: "iTrackInvest",
    description:
      "La mejor aplicación para gestion de inversiones.",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "iTrackInvest",
      },
    ],
    siteName: "iTrackInvest",
  },
  twitter: {
    card: "summary_large_image",
    title: "iTrackInvest",
    description:
      "La mejor aplicación para gestion de inversiones.",
    images: [
      "",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "1I5vN8XfzHo9awJVBZa30hiGiyayFTx9_EoB8QtzLsg",
  },
};

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          plusJakartaSans.className,
          "antialiased min-h-screen text-lg"
        )}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
