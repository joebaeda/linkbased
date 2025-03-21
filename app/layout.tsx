import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./providers/Provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = "https://linkbased.xyz";

export async function generateMetadata(): Promise<Metadata> {
  const ogImageUrl = `${appUrl}/og-image.jpg`;

  return {
    title: "Link Based | Web3 Profile Generator",
    description: "Convert your .base.eth domain to a cool web3 profile",
    openGraph: {
      title: "Link Based | Web3 Profile Generator",
      description: "Convert your .base.eth domain to a cool web3 profile",
      url: appUrl,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 600,
          alt: 'Web3 Profile Generator',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Link Based | Web3 Profile Generator",
      description: "Convert your .base.eth domain to a cool web3 profile",
      images: [ogImageUrl],
    },
    icons: {
      icon: '/favicon.ico',
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
