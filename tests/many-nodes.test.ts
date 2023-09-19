import { it, expect } from "vitest";
import { runSimulation } from "../src/index";
import defaultOptions from "../src/options";
import { nodes, links, groups } from "./fixtures/many-nodes";

it("runs a simulation with many linked nodes", () => {
	const currentFilter = "all";
	const {
		nodes: graphNodes,
	} = runSimulation({
		nodes,
		links,
		groups,
		options: defaultOptions,
		currentFilter,
	});

	expect(graphNodes).toEqual(expect.arrayContaining([
		expect.objectContaining({
			id: "Quality",
			x: -12,
			y: 23,
		}), expect.objectContaining({
			id: "Naming",
			x: -6,
			y: 20.25,
		}),
	]));
});
