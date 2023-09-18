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
	const { simulation } = runSimulation({ nodes, links, groups, currentFilter });
	expect(simulation.nodes()).toMatchObject([{
		id: "Quality",
		x: 15,
		y: -5,
	}, {
		id: "Naming",
		x: -15,
		y: 4,
	}]);
});
