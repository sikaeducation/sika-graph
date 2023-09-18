import { it, expect } from "vitest";
import { runSimulation } from "./index";

const defaultOptions = {
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
			initial: -90,
			final: -30,
		},
		collision: {
			initial: 30,
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
} as const;

it("runs a simulation with 2 linked nodes", () => {
	const nodes = [{
		"id": "Quality",
		"group": "quality",
		"critical": true,
		"complete": true,
	},
	{
		"id": "Naming",
		"group": "quality",
		"critical": false,
		"complete": false,
	}];
	const links = [{
		"source": "Quality",
		"target": "Naming",
	}];
	const groups = [{
		"id": "quality",
		"label": "Quality Concepts",
		"background-color": "hsla(120, 50%, 50%, 0.1)",
		"foreground-color": "hsla(120, 50%, 50%, 0.4)",
	}];
	const currentFilter = "all";
	const {
		nodes: graphNodes,
		groups: graphGroups,
	} = runSimulation({ nodes, links, groups, options: defaultOptions, currentFilter });

	expect(graphGroups).toMatchObject([
		{
			"active": true,
			"background-color": "hsla(120, 50%, 50%, 0.1)",
			"center": [0, -0.5],
			"foreground-color": "hsla(120, 50%, 50%, 0.4)",
			"id": "quality",
			"label": "Quality Concepts",
			"points": [
				[15, -5],
				[-15, 4],
			],
		},
	]);

	expect(graphNodes).toMatchObject([{
		id: "Quality",
		x: 15,
		y: -5,
	}, {
		id: "Naming",
		x: -15,
		y: 4,
	}]);
});
