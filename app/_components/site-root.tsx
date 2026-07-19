import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInitializer = `
(() => {
  try {
    const saved = localStorage.getItem("starlight-theme");
    const mode = saved === "light" || saved === "dark" || saved === "auto" ? saved : "auto";
    const dark = mode === "dark" || (mode === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.dataset.themeMode = mode;
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.themeMode = "auto";
  }
})();
`;

export function SiteRoot({
  children,
  lang,
}: {
  children: ReactNode;
  lang: "zh-CN" | "en";
}) {
  const agentIndexHref = lang === "en" ? "/en/llms.txt" : "/llms.txt";
  const agentIndexTitle =
    lang === "en" ? "AetherIoT agent index" : "AetherIoT 智能体索引";

  return (
    <html lang={lang} data-theme="dark" data-theme-mode="auto" suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link
          rel="alternate"
          type="text/plain"
          href={agentIndexHref}
          title={agentIndexTitle}
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
