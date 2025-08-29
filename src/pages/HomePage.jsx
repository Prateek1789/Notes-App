import HeroSection from "../components/sections/HeroSection";
import FeatureSection from "../components/sections/FeatureSection";
import CallToAction from "../components/sections/CallToAction";

const HomePage = () => {
    return (
        <>
            <main className="h-full w-full flex flex-col items-center justify-center">
                <HeroSection />
                <FeatureSection />
                <CallToAction />
            </main>
        </>
    )
}

export default HomePage