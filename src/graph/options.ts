// Make links loose at the beginning with groups strong, then flip

const options = {
	simulation: {
		tickCount: 300,
		alphaCutoff: 0.1,
	},
	forces: {
		positional: {
			x: 0,
			y: 0,
		},
		charge: { // Attraction, -100 is repel, 100 is stacked
			initial: -100,
			final: -30,
		},
		collision: {
			initial: 0,
			final: 0,
		},
		link: { // Nodes pushed together or pulled apart
			distance: { // How far apart to target, ~30
				initial: 300,
				final: 30,
			},
			strength: { // 0-1, how aggressive
				initial: 0.2,
				final: 0.5,
			},
		},
		group: {
			charge: { // how attracted nodes are to group center, -1 is repulsion, 0 is no attraction, 1 is pinned to center
				initial: 1,
				final: 0.5,
			},
			link: { // Used for link force nodes pre alpha cutoff
				strength: { // -1 - 1: Positive is attraction, negative is repulsion
					initial: 0.9,
				},
			},
			distance: {
				cutoff: 300, // Distance to ignore this force after
				rate: 100, // Factor
			},
		},
	},
} as const

export default options
