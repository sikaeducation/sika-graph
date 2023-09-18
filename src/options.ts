const options = {
	simulation: {
		tickCount: 300,
		alphaCutoff: 0.3,
		size: 60, // y/x/-y/-x
		hullPadding: 5,
	},
	forces: {
		positional: {
			x: 0,
			y: 0,
		},
		charge: { // Attraction, -100 is repel, 100 is stacked
			initial: 1 - 0.5,
			final: -80,
		},
		collision: {
			initial: 30,
			final: 10,
		},
		link: { // Nodes pushed together or pulled apart
			distance: { // How far apart to target, ~30
				initial: 1,
				final: 30,
			},
			strength: { // 0-1, how aggressive, non-group link strength
				initial: 0.0,
				final: 0.1,
			},
		},
		boundaries: [1, 1000],
		group: {
			charge: { // how attracted nodes are to group center, -1 is repulsion, 0 is no attraction, 1 is pinned to center
				initial: 1,
				final: 0.5,
			},
			link: { // Used for link force nodes pre alpha cutoff
				strength: { // -1 - 1: Positive is attraction, negative is repulsion
					initial: 1,
				},
			},
			distance: {
				cutoff: 27, // Distance to ignore this force after / Ignore ndoes closer than this
				rate: 1.1, // Factor
			},
		},
	},
} as const;

export default options;
