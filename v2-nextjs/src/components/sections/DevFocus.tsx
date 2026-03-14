
const DevFocus = () => {
	const devFeatures = [
		"Syntax Highlighting",
    "One-click Copy",
    "Markdown Shortcuts",
    "API First Design",
    "JSON Export",
		"Dark Theme"
	];

  return (
		<section id="developer"
             className="h-auto xl:h-[70vh] px-6 md:px-8 py-20 lg:py-30 bg-neutral-900 text-background flex items-center justify-center border border-foreground/1 xl:rounded-4xl shadow-2xl">
      <div className="w-full h-full grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-8">
				<div className="h-full lg:h-auto w-full bg-neutral-800 rounded-2xl border border-background/5">
						<div className="py-4 px-4 border-b border-b-background/5 flex items-center justify-start gap-2">
							<span className="size-3 rounded-full bg-red-500"></span>
							<span className="size-3 rounded-full bg-amber-500"></span>
							<span className="size-3 rounded-full bg-green-500/70"></span>
						</div>
				</div>
        <div className="mt-8 lg:mt-0 xl:pl-4 flex flex-col items-start justify-start gap-6">
        	<span className="font-mono text-sm font-medium">
            <span className="py-0.5 text-xs px-1 bg-primary text-white rounded-sm">03</span>
            &nbsp;Developer Experience
          </span>
          <h2 className="text-h2 font-medium">
						Built for the <span className="text-primary">Builders.</span>
					</h2>
          <p className="max-w-[50ch] text-background/80">
						Don't let your note-taking tool mangle your code. We support all of the most commonly used languages with auto-detection, proper indentation, and monospace fonts that actually look good.
          </p>
          <div className="mt-6 flex flex-col item-start justify-start gap-8">
						<ul className="w-auto h-auto grid grid-cols-2 gap-y-8 gap-x-8">
            {devFeatures.map(feature => {
              return (
                <li key={feature}
										className="flex justify-start items-center gap-4 text-sm font-mono">
										<span className="w-5 h-5 flex justify-center items-center rounded-md border border-primary/60">{'#'}</span>
                  {feature}
                </li>
              )
          	})}
						</ul>
          </div>
        </div>
      </div>
  	</section>
  )
};

export default DevFocus