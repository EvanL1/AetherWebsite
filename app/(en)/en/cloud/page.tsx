import type { Metadata } from "next";

import { CloudAccount } from "../../../_components/cloud-account";
import { cloudContent, createCloudMetadata } from "../../../cloud-i18n";

export const metadata: Metadata = createCloudMetadata("en");

export default function EnglishCloudAccount() {
  return <CloudAccount content={cloudContent.en} />;
}
