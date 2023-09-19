/* eslint-disable max-len */
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

	expect(false).toBe(true);
	// expect(graphNodes).toMatchObject([{
	// 	id: "Quality",
	// 	x: -16,
	// 	y: 4,
	// }, {
	// 	id: "Naming",
	// 	x: 16,
	// 	y: -3,
	// }]);
});
