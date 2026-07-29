import type { Metadata } from "next";

import { CloudAccount } from "../../_components/cloud-account";
import { cloudContent, createCloudMetadata } from "../../cloud-i18n";

export const metadata: Metadata = createCloudMetadata("zh-CN");

export default function ChineseCloudAccount() {
  return <CloudAccount content={cloudContent["zh-CN"]} />;
}
