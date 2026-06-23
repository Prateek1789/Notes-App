import Hero from "@/features/landing/components/hero";
import FeatureGrid from "@/features/landing/components/feature-grid";
import EditorShowcase from "@/features/landing/components/editor-showcase";
import DevFocus from "@/features/landing/components/dev-focus";
import CallToAction from "@/features/landing/components/call-to-action";
import Footer from "@/features/landing/components/footer";

import Navbar from "@/components/layout/NavBar";

export default function Home() {
  return (
    <>
      <header className="w-full h-auto px-1 bg-transparent flex items-center justify-center top-1 left-0 fixed z-999">
        <Navbar />
      </header>
      <main>
        <Hero />
        <FeatureGrid />
        <EditorShowcase />
        <DevFocus />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
