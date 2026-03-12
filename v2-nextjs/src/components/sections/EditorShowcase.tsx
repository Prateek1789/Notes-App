
const EditorShowcase = () => {
  const editorFeatures = [
    { title: "Slash Commands", desc: "Just type '/' to summon the menu." },
    { title: "Markdown Support", desc: "Write faster with familiar syntax." },
    { title: "Block-based", desc: "Drag, drop, and rearrange ideas." }
  ];

  return (
    <section id="showcase"
             className="h-auto px-6 py-20 lg:py-30 flex items-center justify-center">
      <div className="w-full h-auto grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-4">
        <div className="h-full w-full flex flex-col items-start justify-start gap-6">
        	<span className="font-mono text-sm font-medium">
            <span className="py-0.5 text-xs px-1 bg-primary text-white rounded-sm">02</span>
            &nbsp;The Editor
          </span>
          <h2 className="text-h2 font-medium">Writing, Reimagined.</h2>
          <p className="max-w-[50ch] text-foreground/60">
            A canvas that disappears when you type and appears when you need it. Powered by TipTap, it brings structure to chaos with slash commands and drag-and-drop media
          </p>
          <div className="mt-6 flex flex-col item-start justify-start gap-8">
            {editorFeatures.map(feature => {
              return (
                <div key={feature.title}
										 className="pl-6 pr-2 flex flex-col justify-between items-start gap-2 border-l border-l-foreground/10 hover:border-l-foreground transition-colors duration-240 select-none group">
                  <h3 className="text-xl font-semibold group-hover:translate-x-1.5 transition-transform duration-240">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 text-sm">{feature.desc}</p>
                </div>
              )
          	})}
          </div>
        </div>
        <div className="h-auto xl:h-[65vh] w-full mt-8 xl:mt-0 bg-white rounded-2xl md:rounded-4xl border border-neutral-200/70 shadow-xl shadow-neutral-200">
						
        </div>
      </div>
  	</section>
  )
};

export default EditorShowcase