
const FeatureGrid = () => {
    const features = [
        {
            id: 1,
            title: "Secure Auth",
            summary: "Enterprise-grade security. Your data remains yours, encrypted and private.",
        },
        {
            id: 2,
            title: 'Smart Recovery',
            summary: "Mistakes happen. Undo, soft delete, and version history keep you safe."
        },
        {
            id: 3,
            title: "Notebooks",
            summary: "Structure your knowledge base with infinite nesting and custom collections.",
        },
        { 
            id: 4, 
            title: "Instant Search", 
            summary: "Full-text search that indexes code, comments, and rich text in milliseconds." 
        },
        {
            id: 5, 
            title: "Rich Media", 
            summary: "Drag & drop images, videos, and diagrams directly into your workflow." 
        },
        {
            id: 6, 
            title: "Mobile Native", 
            summary: "Responsive by default. A seamless experience on any screen size." 
        },
    ];

    return (
        <section id="feature" 
                 className="h-auto pt-30 px-4 flex flex-col items-center justify-center gap-8">
            <div className="flex flex-col gap-4 items-center justify-center">
                <span className="font-mono text-sm font-medium">
                    <span className="py-0.5 text-xs px-1 bg-primary text-white rounded-sm">01</span>
                    {" Features"}
                </span>
                <h2 className="text-h2 font-medium">Everything you need.</h2>
                <p className="max-w-[35ch] text-center">
                    We stripped away the bloat to focus on the essential tools for clarity.
                </p>
            </div>
            <div className="w-full h-full md:w-[80%] xl:w-full mt-8 p-2.5 rounded-4xl border border-line grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-[repeat(6),calc(100%/6)] lg:grid-rows-[repeat(3),calc(100%/3)] xl:grid-rows-[repeat(2),50%] gap-2.5">
                {features.map(feature => {
                    return (
                        <div key={feature.id}
                             className="w-full h-full p-5 grid grid-rows-subgrid row-span-3 bg-white dark:bg-neutral-900/70 rounded-3xl border border-line shadow-lg shadow-neutral-200 dark:shadow-transparent">
                            <div className="h-10 w-10 rounded-xl border border-line"></div>
                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                            <p className="dark:text-neutral-400">{feature.summary}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
};

export default FeatureGrid