"use client"

import { useRouter } from "next/navigation";
import ButtonLanding from "../ui/ButtonLanding";

const CallToAction = () => {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <section id="cta" className="h-auto md:h-[50vh] xl:h-[60vh]">
      <div className="container h-full mx-auto py-10 px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-display font-medium mb-8 tracking-tight">
          Ready to focus?
        </h2>
        <p className="text-xl mb-12 max-w-[45ch]">
          Join thousands of developers who have switched to the most versatile note-taking app on the market.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <ButtonLanding className="pl-5 pr-2.5 py-2.5 shadow-xl"
                         intent="primary"
                         size="lg"
                         onClick={() => handleNavigation("/signup")}>
            Get Started Free
          </ButtonLanding>
          <ButtonLanding className="pl-5 pr-2.5 py-2.5"
                         intent="ghost"
                         size="lg">
            Read the Manifesto
          </ButtonLanding>
        </div>
    	</div>
  	</section>
  )
};

export default CallToAction
