import { Simulation } from "d3";
import { clampToInteger } from "./utilities";
import { Node, Link } from "./types";

export default function constrainNodes(simulation: Simulation<Node, Link>): void {
	const boundary = 60;

	const nodes = simulation.nodes();
	nodes.forEach((node) => {
		node.x = clampToInteger(
			node.x, -boundary, boundary,
		);
		node.y = clampToInteger(
			node.y, -boundary, boundary,
		);
	});
}
