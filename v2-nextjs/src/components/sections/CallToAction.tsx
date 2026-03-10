import Button from "../ui/Button";

const CallToAction = () => {
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
        	<Button className="pl-6 pr-2.5 py-2.5 shadow-xl"
									intent="primary"
									size="lg">
            Get Started Free
						<span className="h-full w-16 py-1.5 flex place-content-center rounded-full border border-blue-300/60 bg-blue-300/20">
              <span className="text-inheret group-hover/btn:translate-x-2.5 transition-transform duration-400">
                {"->"}
              </span>
            </span>
          </Button>
					<Button className="pl-6 pr-2.5 py-2.5"
									intent="ghost"
									size="lg">
            Read the Manifesto
						<span className="h-full w-16 py-1.5 flex place-content-center rounded-full border border-primary-ghost bg-white/85">
              <span className="text-inheret group-hover/btn:translate-x-2.5 transition-transform duration-400">
                {"->"}
              </span>
            </span>
          </Button>
        </div>
    	</div>
  	</section>
  )
};

export default CallToAction
