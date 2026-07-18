import type { Metadata } from "next";
import "../globals.css";
import { SiteRoot } from "../_components/site-root";
import { createMetadata } from "../i18n";

export const metadata: Metadata = createMetadata("zh-CN");

export default function ChineseRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRoot lang="zh-CN">{children}</SiteRoot>;
}
