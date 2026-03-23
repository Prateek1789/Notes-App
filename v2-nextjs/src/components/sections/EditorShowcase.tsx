
const EditorShowcase = () => {
  const editorFeatures = [
    { title: "Slash Commands", desc: "Never take your hands off the keyboard. Type '/' to summon the menu and format text at the speed of thought." },
    { title: "Markdown Support", desc: "Write with the syntax you already know. NoteFlow instantly renders markdown into rich text as you type." },
    { title: "Block-based", desc: "Every paragraph, image, and list is a block. Drag, drop, and rearrange your ideas with unprecedented fluidity." },
  ];

  return (
    <section id="showcase"
             className="h-auto py-0 flex items-center justify-center bg-transparent">
      <div className="w-full h-full flex flex-col gap-px">
        
        {/* Section Heading */}
        <div className="w-full h-auto px-6 md:px-8 py-15 flex flex-col md:flex-row items-end justify-center md:items-baseline-last md:justify-between gap-4 bg-background [clip-path:var(--clip-bevel-sm)]">
          <div className="flex flex-col items-start justify-center gap-4">
            <span className="font-mono text-sm font-medium hidden lg:inline">
              <span className="text-foreground">02 </span>
              <span className="text-neutral-500 tracking-wider">- THE EDITOR</span>
            </span>
            <h2 className="text-h2 font-medium">A canvas that thinks with you.</h2>
          </div>
          <p className="max-w-[50ch] text-neutral-500 dark:text-neutral-400">
            A canvas that disappears when you type and appears when you need it. Powered by TipTap, it brings structure to chaos with slash commands and drag-and-drop media.
          </p>
        </div>

        {/* The Editor Window */}
        <div className="w-full h-auto py-15 flex items-center justify-center bg-background [clip-path:var(--clip-bevel-sm)]">
          <div className="editor w-full md:w-2xl xl:w-5xl max-w-5xl h-[500px] rounded-lg bg-white dark:bg-neutral-900 border border-line shadow-xl shadow-line dark:shadow-neutral-900">
          </div>
        </div>

        {/* Feature List */}
        <div className="w-full h-auto flex flex-col lg:flex-row items-center justify-center gap-px [clip-path:var(--clip-bevel-sm)]">
          {editorFeatures.map((feature, idx) => {
            return (
              <div key={feature.title} 
                   className="w-full h-100 xl:h-140 px-4 py-4 flex flex-col items-start justify-between bg-background">
                <span className="font-mono">{`${idx < 10 && 0}${idx + 1}`}</span>
                <div className="w-[70%] h-30 bg-white dark:bg-neutral-900 rounded-lg mx-auto flex items-center justify-center">
                  <span className="w-20 h-auto text-sm bg-neutral-100 dark:bg-neutral-800 shadow-xl shadow-neutral-100 dark:shadow-neutral-950 py-1 px-2 rounded-lg">
                    <span className="">/</span>
                    <span className="text-neutral-500">Filter...</span>
                  </span>
                </div>
                <h3 className="text-lg">
                    {feature.desc}
                  </h3>
              </div>
            )
          })}
        </div>

        {/* Spacer */}
        <div className="w-full h-20 bg-background [clip-path:var(--clip-bevel-sm)]"></div>
      </div>
  	</section>
  )
};

export default EditorShowcase