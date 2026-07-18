import type { Metadata } from "next";
import { LandingPage } from "../../_components/landing-page";
import { createMetadata, siteContent } from "../../i18n";

export const metadata: Metadata = createMetadata("en");

export default function EnglishHome() {
  return <LandingPage content={siteContent.en} />;
}
