import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aetheriot.pages.dev"),
  title: "AetherIoT — Edge, cloud, and contracts",
  description:
    "The open-source IoT platform for reliable edge operation, governed cloud coordination, and portable public contracts.",
  openGraph: {
    title: "AetherIoT — Edge, cloud, and contracts",
    description:
      "One platform for AetherEdge, AetherCloud, and AetherContracts.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AetherIoT — Edge, cloud, and contracts.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherIoT — Edge, cloud, and contracts",
    description:
      "One platform for AetherEdge, AetherCloud, and AetherContracts.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
