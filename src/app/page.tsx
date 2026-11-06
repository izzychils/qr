import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import {
  AiBand,
  Closing,
  Faq,
  FeatureSwitch,
  GuestStory,
  Hero,
  HowItWorks,
  Payments,
  Proof,
  RoomNote,
  Surfaces,
} from "@/components/marketing/landing";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <a
        href="/main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 text-[12px] font-semibold text-cream"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeatureSwitch />
        <HowItWorks />
        <Surfaces />
        <GuestStory />
        <AiBand />
        <Payments />
        <Proof />
        <Closing />
        <Faq />
        <RoomNote />
      </main>
      <Footer />
    </div>
  );
}
