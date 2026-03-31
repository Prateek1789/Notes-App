
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
                 className="w-full h-auto py-0 flex flex-col items-center justify-center bg-transparent gap-px">
            <div className="w-full h-auto px-4 md:px-8 py-16 flex gap-4 items-baseline-last justify-between bg-background [clip-path:var(--clip-bevel-sm)]">
                <h2 className="text-h2 font-medium max-w-[30ch]">
                    Everything you need to capture, organize, and share your best ideas <span className="text-neutral-400">without the friction.</span>
                </h2>
                <span className="font-mono text-sm font-medium hidden lg:inline">
                    <span className="text-foreground">01 </span>
                    <span className="text-neutral-500 tracking-wider">- FEATURES</span>
                </span>
            </div>
            <div className="w-full h-auto px-4 md:px-8 py-16 flex items-center justify-center bg-background [clip-path:var(--clip-bevel-sm)]">
                <div className="w-full h-auto xl:h-[70vh] p-2.5 bg-transparent backdrop-blur-lg border border-line rounded-2xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-[repeat(6),calc(100%/6)] md:grid-rows-[repeat(3),calc(100%/3)] xl:grid-rows-[repeat(2),50%] gap-2.5">
                    {features.map(feature => {
                        return (
                            <div key={feature.id}
                                 className="w-full h-full min-h-50 p-5 grid grid-rows-subgrid row-span-3 bg-white dark:bg-neutral-900/70 border border-line shadow-2xl shadow-neutral-200 rounded-xl dark:shadow-transparent">
                                <div className="h-10 w-10 rounded-xl border border-line"></div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="dark:text-neutral-400">{feature.summary}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
};

export default FeatureGrid

//  gap-2.5