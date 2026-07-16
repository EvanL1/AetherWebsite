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
  metadataBase: new URL("https://www.aetheriot.workers.dev"),
  title: "AetherIoT — The AI-native runtime for physical spaces",
  description:
    "The open-source runtime foundation for agents to turn human intent into governed, verifiable physical behavior.",
  openGraph: {
    title: "AetherIoT — The AI-native runtime for physical spaces",
    description:
      "Describe the outcome. Let agents generate governed behavior that the edge can execute without the model.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AetherIoT — The AI-native runtime for physical spaces.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherIoT — The AI-native runtime for physical spaces",
    description:
      "Describe the outcome. Verify the change. Execute it at the edge.",
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
