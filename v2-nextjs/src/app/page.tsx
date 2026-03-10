import Hero from "@/components/sections/Hero";
import FeatureGrid from "@/components/sections/FeatureGrid";
import EditorShowcase from "@/components/sections/EditorShowcase";
import DevFocus from "@/components/sections/DevFocus";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";

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
