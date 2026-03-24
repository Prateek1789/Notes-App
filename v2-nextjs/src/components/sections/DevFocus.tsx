
const DevFocus = () => {
	const devFeatures = [
		{ 
      icon: "",
      title: "Syntax Highlighting",
      desc: 'Auto-detects over 100+ languages and applies beautiful, accurate syntax highlighting automatically.'
    },
    { 
      icon: "",
      title: "One-click Copy",
      desc: "Grab code snippets instantly with a single click. No more messy manual highlighting and copying."
    },
    {
      icon: "",
      title: "JSON Export",
      desc: "Export your code blocks and their metadata directly to structured JSON for use in other tools."
    },
    {
      icon: "",
      title: "Markdown",
      desc: "Export your code blocks and their metadata directly to structured JSON for use in other tools."
    }
	];

  const bgGridStyles = {
    background: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
    backgroundSize: '4rem 4rem',
    maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
  };

  //linear-gradient(to bottom, #ffffff 1px, transparent 1px)

  return (
		<section id="developer"
             className="relative w-full h-auto py-0 text-white bg-line-dark flex items-center justify-center">
      {/* Main Content */}
      <div className="relative w-full h-auto flex flex-col items-center justify-center gap-px">
        <div className="w-full h-auto bg-primary flex justify-between items-baseline-last px-6 md:px-8 py-15 [clip-path:var(--clip-bevel-sm)]">
          <span className="font-mono text-white text-sm font-medium">
            <span>03</span> - <span className="tracking-wider">DEVELOPER EXPERIENCE</span>
          </span>
          <h2 className="text-h1 max-w-[20ch] text-white font-medium">
						Code blocks that actually <span className="">understands</span> your Code.
					</h2>
        </div>
        <div className="w-full h-[70vh] px-6 md:px-8 pt-6 pb-15 bg-neutral-900 text-white flex items-start justify-center [clip-path:var(--clip-bevel-sm)]">
          <div className="w-full h-full flex item-center justify-start">
						<ul className="w-auto h-auto flex flex-col">
            {devFeatures.map((feature, idx) => {
              return (
                <li key={feature.title}
										className={`w-auto h-full px-6 md:px-8 py-4 text-sm font-mono flex justify-between gap-4 backdrop-blur-lg`}>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="max-w-[45ch]">{feature.desc}</p>
                </li>
              )
          	})}
						</ul>
          </div>
        </div>

        {/* Spacer */}
        <div className="w-full h-20 bg-neutral-900 [clip-path:var(--clip-bevel-sm)]"></div>
      </div>
  	</section>
  )
};

export default DevFocus

{/* Background gradient */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        Tech Grid
        <div className="absolute inset-0 opacity-4" style={bgGridStyles}></div>
        
        Glowing Orbs
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[oklch(58.25%_0.245_262.881)]/15 blur-[120px] rounded-full mix-blend-screen translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[oklch(58.25%_0.245_262.881)]/10 blur-[100px] rounded-full mix-blend-screen -translate-x-1/3 translate-y-1/3"></div>
      </div> */}

{/* <span className="w-5 h-5 flex justify-center items-center rounded-md border border-primary/60">{'#'}</span> */}
{/* <span className="font-mono text-sm font-medium">
            <span className="py-0.5 text-xs px-1 bg-primary text-white">03</span>
            &nbsp;Developer Experience
          </span>
          <h2 className="text-h2 font-medium">
						Built for the <span className="text-primary">Builders.</span>
					</h2> */}

// grid grid-rows-2 grid-cols-1 gap-8 lg:grid-rows-1 lg:grid-cols-2

{/* <div className="h-full lg:h-auto w-full bg-neutral-900 rounded-xl border border-neutral-700">
						<div className="py-4 px-4 border-b border-neutral-700 flex items-center justify-start gap-2">
							<span className="size-3 rounded-full bg-red-400"></span>
							<span className="size-3 rounded-full bg-amber-400"></span>
							<span className="size-3 rounded-full bg-green-400/70"></span>
						</div>
				</div> */}