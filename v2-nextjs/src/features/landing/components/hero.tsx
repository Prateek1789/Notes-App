"use client"

import { useRouter } from "next/navigation";
import ButtonHero from "@/components/ui/button-hero";

const Hero = () => {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href)
  };

  return (
    <section id="hero" className="h-auto pt-30 xl:pt-38 bg-neutral-300">
      <header className="relative w-full h-full px-6 md:px-8 flex flex-col items-center justify-center gap-8 xl:gap-10">
        <div className="h-9 w-32.5 bg-white dark:bg-neutral-900 rounded-full shadow-md shadow-line flex items-center justify-center gap-2">
          <span className="size-3.5 rounded-full relative flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-ping-pulse"></span>
          	<span className="size-1.5 rounded-full relative inline-flex bg-ping"></span>
          </span>
          <span className="font-mono text-sm font-medium">v2 is Live</span>
        </div>
        <h1 className="text-h1 text-center font-bold">The Best Way To<br/>Organize Thoughts</h1>
        <p className="max-w-[50ch] md:max-w-[40ch] text-center lg:text-lg xl:max-w-[50ch] dark:text-neutral-300">
          Experience the power of TipTap in a dashboard designed for clarity. Seamless organization for the modern developer.
        </p>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-6">
          <ButtonHero
            className="shadow-xl" 
            variant="default"
            size="sm"
            onClick={() => handleNavigation("./signup")}>
            Start Writing Free
          </ButtonHero>
          <ButtonHero
            variant="outline"
            size="sm"
            onClick={() => handleNavigation("/dashboard")}>
            View Demo
          </ButtonHero>
        </div>
        <div className="w-full h-[70vh] p-2 mt-8 bg-transparent backdrop-blur-xl rounded-2xl border border-line drop-shadow-2xl drop-shadow-neutral-300 dark:drop-shadow-neutral-800/70">
          <div className="w-full h-full rounded-lg bg-white border border-line dark:bg-neutral-900">
          </div>
        </div>
      </header>
    </section>
  )
};

export default Hero