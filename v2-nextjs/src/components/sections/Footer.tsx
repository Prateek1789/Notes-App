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
    <footer className="w-screen h-auto pb-4 px-4 xl:pb-8 flex justify-center">
			<div className="h-full w-full max-w-7xl p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/70 dark:border-line">
				<div className="w-full h-auto md:h-[40vh] xl:h-[50vh] px-2.5 grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-1 md:grid-cols-2 gap-2 rounded-3xl">
					<div className="w-full h-full flex flex-col items-start justify-center gap-4 rounded-3xl">
						<div className="flex items-baseline-last justify-center gap-0.5">
							<span className="text-xl md:text-2xl font-grotesk font-semibold uppercase">
								NoteFlow
							</span>
							<span className="w-2 h-2 rounded-full bg-primary"></span>
						</div>
						<p className="text-sm md:text-base font-base max-w-[30ch] text-start">
							The last note-taking app you'll ever need.
						</p>
					</div>
					<div className="w-full h-full md:px-2.5 flex items-center justify-start md:justify-center rounded-3xl">
						<nav className="w-auto h-auto py-10 md:py-0 text-sm md:text-base flex items-start justify-center gap-8 lg:gap-20" 
								 aria-label="Footer navigation">
							{footerLinkGroups.map(group => {
								return (
									<div key={group.heading}>
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
      	<FooterBranding />
			</div>
    </footer>
  )
};

export default Footer