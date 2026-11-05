import type { Metadata } from "next";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { ScanExperience } from "@/features/qr/scan-experience";

export const metadata: Metadata = {
  title: "Scan a table code",
  description:
    "Scan a Sideplate table QR code with your camera, upload a photo, or test the demo code. Every code opens the right table menu.",
};

export default function ScanPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <ScanExperience />
      <Footer />
    </div>
  );
}
