import { Simulation } from "d3";
import { Node, Link } from "../types";

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

export function clampToInteger(
	value: number, lowerBound: number, upperBound: number,
) {
	return Math.round(Math.max(Math.min(value, upperBound),
		lowerBound));
}
