import type { Metadata } from "next";
import { TableCodes } from "@/features/dashboard/table-codes";

export const metadata: Metadata = {
  title: "QR and NFC",
  description: "Every table has a code, a link and an NFC tag ready for service.",
};

export default function QrPage() {
  return <TableCodes />;
}
