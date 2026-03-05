import Hero from "@/components/sections/Hero";
import FeatureGrid from "@/components/sections/FeatureGrid";
import EditorShowcase from "@/components/sections/EditorShowcase";
import DevFocus from "@/components/sections/DevFocus";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeatureGrid />
        <EditorShowcase />
        <DevFocus />
      </main>
      <footer>

      </footer>
    </>
  );
}
