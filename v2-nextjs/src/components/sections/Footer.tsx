import FooterBranding from "../ui/FooterBranding";

type Link = {
	name: string,
	href: string,
};

type FooterLinksObj = {
	heading: string,
	links: Link[],
};

const Footer = () => {
	const footerLinkGroups: FooterLinksObj[] = [
		{
			heading: 'resources',
			links: [{	name: 'Documentation', href: '#'	}, {	name: 'GitHub', href: '#'	}],
		},
		{ 
			heading: 'socials',
			links: [{ name: ' X / Twitter', href: '#' }, { name: 'LinkedIn', href: '#' }],
		 },
		{
			heading: 'legal',
			links: [{ name: 'Pivacy', href: '#' }, {name: 'Terms', href: '#' }],
		},
	];

  return (
    <footer className="w-full h-auto flex justify-center bg-line p-px pt-0">
			<div className="h-full w-full flex flex-col gap-px rounded-[6px]">
				<div className="w-full h-auto md:h-[40vh] xl:h-[50vh] grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-1 md:grid-cols-2 gap-px">
					<div className="w-full h-full px-6 bg-white dark:bg-neutral-900 xl:px-8 py-8 flex flex-col items-start justify-center gap-4 rounded-[6px]">
						<div className="flex items-baseline-last justify-center gap-0.5">
							<span className="text-xl md:text-2xl font-grotesk font-semibold uppercase">
								NoteFlow
							</span>
							<span className="w-2 h-2 rounded-full bg-primary"></span>
						</div>
						<h2 className="text-h2 font-medium max-w-[20ch]">
							The last note-taking app you'll ever need.
						</h2>
					</div>
					<div className="w-full h-full px-6 xl:px-8 bg-white dark:bg-neutral-900 flex items-center justify-start md:justify-center rounded-[6px]">
						<nav className="w-auto h-auto py-10 md:py-0 text-sm md:text-base flex items-center justify-center gap-8 lg:gap-20" 
								 aria-label="Footer navigation">
							{footerLinkGroups.map((group, idx) => {
								return (
									<div key={group.heading} className={``}>
										<h4 className="font-mono text-foreground/50 dark:text-foreground/70 mb-4 uppercase">
											{group.heading}
										</h4>
										<ul className="flex flex-col items-start justify-center gap-2">
											{group.links.map(link => {
												return (
													<li key={link.name}>
														<a href={link.href}>{link.name}</a>
													</li>
												)
											})}
										</ul>
									</div>
								)
							})}
						</nav>
					</div>
				</div>
				<div className="w-full h-auto p-4 bg-white rounded-[6px] dark:bg-neutral-900">
      		<FooterBranding />
				</div>
			</div>
    </footer>
  )
};

export default Footer