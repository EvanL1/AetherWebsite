import { LandingPage } from "../_components/landing-page";
import { siteContent } from "../i18n";

export default function ChineseHome() {
  return <LandingPage content={siteContent["zh-CN"]} />;
}
