
const FooterBranding = () => {
    return (
        <div className="w-full h-auto max-h-52 py-2 flex flex-col items-start justify-between md:flex-row md:items-baseline-last gap-4 md:gap-0">
            <span className="font-grotesk uppercase text-branding font-extrabold text-5xl md:text-footer-logo flex items-baseline-last gap-1 mask-b-from-5%">
                NoteFLow
                <span className="size-4 md:size-8 rounded-full bg-primary"></span>
            </span>
            <span className="pr-2.5 font-mono text-xs text-foreground/50">
                © 2026 NoteFlow Inc.
            </span>
        </div>
    )
};

export default FooterBranding