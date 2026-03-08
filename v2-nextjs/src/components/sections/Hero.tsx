import Button from "../ui/Button";

const Hero = () => {
    return (
        <section id="hero" className="h-auto pt-30 xl:pt-38 bg-neutral-300">
            <header className="relative w-full h-full px-4 flex flex-col items-center justify-center gap-8 xl:gap-10">
                <div className="h-9 w-32.5 bg-white rounded-full flex items-center justify-center gap-2">
                    <span className="size-3.5 rounded-full relative flex items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-ping-pulse">
                        </span>
                        <span className="size-1.5 rounded-full relative inline-flex bg-ping"></span>
                    </span>
                    <span className="font-mono text-sm font-medium">v2 is Live</span>
                </div>
                <h1 className="text-h1 text-center font-bold">The Best Way To<br/>Organize Thoughts</h1>
                <p className="max-w-[50ch] md:max-w-[40ch] text-center lg:text-lg xl:max-w-[50ch]">
                    Experience the power of TipTap in a dashboard designed for clarity. Seamless organization for the modern developer.
                </p>
                <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-6">
                    <Button className="pr-2 pl-6 shadow-xl"
                            intent="primary"
                            size="md">
                        Start Writting Free
                        <span className="h-full w-14 py-0.5 flex place-content-center rounded-full border border-blue-300/60 bg-blue-300/20">
                            <span className="text-inheret group-hover/btn:translate-x-2.5 transition-transform duration-400">
                                {"->"}
                            </span>
                        </span>
                    </Button>
                    <Button className="pr-2 pl-6"
                            intent="ghost"
                            size="md">
                        View Demo
                        <span className="h-full w-14 py-0.5 flex place-content-center rounded-full border border-primary-ghost bg-white/85">
                            <span className="text-inheret group-hover/btn:translate-x-2.5 transition-transform duration-400">
                                {"->"}
                            </span>
                        </span>
                    </Button>
                </div>
                <div className="w-full h-[70vh] p-2.5 mt-8 bg-white rounded-4xl border border-neutral-100 shadow-xl shadow-neutral-200">
                    <div className="w-full h-full rounded-3xl bg-blue-200">

                    </div>
                </div>
            </header>
        </section>
    )
};

export default Hero