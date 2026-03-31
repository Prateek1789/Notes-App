import Hero from "@/features/landing/components/hero";
import FeatureGrid from "@/features/landing/components/feature-grid";
import EditorShowcase from "@/features/landing/components/editor-showcase";
import DevFocus from "@/features/landing/components/dev-focus";
import CallToAction from "@/features/landing/components/call-to-action";
import Footer from "@/features/landing/components/footer";

export default function Home() {
  return (
    <>
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
