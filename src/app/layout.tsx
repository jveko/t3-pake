import "@uploadthing/react/styles.css";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { siteConfig } from "~/config/site";

import { ClientProviders } from "./client-providers";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "App-Router",
    "TRPC",
    "Edge",
    "Drizzle",
    "PlanetScale",
    "T3",
    "Stack",
    "Tailwind",
    "shadcn/ui",
    "Radix",
  ],
  authors: [
    {
      name: "Oleksandr Ploskovytskyy",
      url: "",
    },
  ],
  creator: "Oleksandr Ploskovytskyy",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@o_ploskovytskyy",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <ClientProviders>
        <body>
          <main>{children}</main>
          <Toaster />
        </body>
      </ClientProviders>
    </html>
  );
}
