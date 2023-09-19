import { it, expect } from "vitest";
import { runSimulation } from "../src//index";
import defaultOptions from "../src/options";
import { nodes, links, groups } from "./fixtures/two-nodes";

it.skip("runs a simulation with 2 linked nodes", () => {
	const currentFilter = "all";
	const {
		nodes: graphNodes,
		groups: graphGroups,
	} = runSimulation({
		nodes,
		links,
		groups,
		options: defaultOptions,
		currentFilter,
	});

	expect(graphGroups).toMatchObject([
		{
			"active": true,
			"background-color": "hsla(120, 50%, 50%, 0.1)",
			"center": [0, 0.5],
			"foreground-color": "hsla(120, 50%, 50%, 0.4)",
			"hull": `M -30.65350026094393 7.2054531820814836
C -32.65690849974486,-1.952984481008472,28.650092022143003,-15.36389084517144,30.65350026094393,-6.2054531820814836
S -28.650092022143003,16.36389084517144,-30.65350026094393,7.2054531820814836
Z`,
			"id": "quality",
			"label": "Quality Concepts",
			"points": [
				[-16, 4],
				[16, -3],
			],
		},
	]);

	expect(graphNodes).toMatchObject([{
		id: "Quality",
		x: -16,
		y: 4,
	}, {
		id: "Naming",
		x: 16,
		y: -3,
	}]);
});