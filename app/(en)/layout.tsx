import "../globals.css";
import { SiteRoot } from "../_components/site-root";

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteRoot lang="en">{children}</SiteRoot>;
}
