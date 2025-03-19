import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../globals.css";
import FrameProvider from "../providers/FrameProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = "https://linkbased.xyz/frame";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const ogImageUrl = `https://linkbased.xyz/og-image.jpg`;

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
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: ogImageUrl,
        button: {
          title: "Generate Web3 Profile",
          action: {
            type: "launch_frame",
            name: "Link Based",
            url: appUrl,
            splashImageUrl: `https://linkbased.xyz/splash.png`,
            splashBackgroundColor: "#1b1423",
          },
        },
      }),
    },
  }
};

export default function FrameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <FrameProvider>
          {children}
        </FrameProvider>
      </body>
    </html>
  );
}
