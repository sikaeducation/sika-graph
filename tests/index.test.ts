import { it, expect } from "vitest";
import { runSimulation } from "../src/index";

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
	} = runSimulation({ nodes, links, groups, currentFilter });
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
