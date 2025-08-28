import FeatureCard from "../ui/FeatureCard"

const features = [
    {
        icon: 'note',
        heading: 'Quick Notes',
        info: 'Capture ideas instantly with lightning-fast input and keyboard-first UX. No friction — just flow.'
    },
    {
        icon: 'code',
        heading: 'Developer Friendly',
        info: 'Markdown, code blocks, CLI shortcuts, and Git-style versioning. Feels like home.'
    },
    {
        icon: 'shield',
        heading: 'Secure by Design',
        info: 'Your notes are private. Local-first architecture and optional end-to-end encryption mean full control.'
    }
];

const FeatureSection = () => {
    return (
        <section className="feature w-screen h-auto min-h-[70vh] xl:min-h-[90vh] flex flex-col justify-center items-center text-center gap-6 py-8 px-4 md:gap-8">
            <h2 className="text-4xl md:text-[5vw] xl:text-7xl max-w-[15ch] font-medium md:max-w-[35ch]">
                Crafted for Developers like You
            </h2>
            <p className="text-lg md:text-lg xl:text-lg">Smart, flexible, and powerful — everything you need to build your second brain 🧠</p>
            <div className="w-auto h-auto mt-8 grid grid-rows-3 gap-4 justify-center lg:grid-rows-1 lg:grid-cols-3 xl:gap-6">
                {features.map((feature, idx) => <FeatureCard key={idx} heading={feature.heading} info={feature.info} icon={feature.icon} /> )}
            </div>
        </section>
    )
}

export default FeatureSection