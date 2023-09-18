import {
	forceSimulation, forceManyBody, forceX, forceY, forceCollide,
} from "d3";
import createLinkForces from "./forces/links";
import { Node, Link, RawLink, RawNode } from "./types";
import options from "./options";
import normalizeLinks from "./data/normalize-links";
import normalizeNodes from "./data/normalize-nodes";
const {
	forces: {
		positional: positionalForce,
		charge: {
			initial: initialCharge,
		},
		collision: {
			initial: initialCollision,
		},
	},
} = options;

export function createSimulation(
	nodes: RawNode[], links: RawLink[], currentFilter = "all",
) {
	const simulation = forceSimulation<Node, Link>()
		.force("x", forceX<RawNode>(positionalForce.x))
		.force("y", forceY<RawNode>(positionalForce.y))
		.force("charge", forceManyBody<RawNode>().strength(initialCharge))
		.force("collision", forceCollide<RawNode>(initialCollision));

	const normalizedLinks = normalizeLinks(
		links, nodes, currentFilter,
	);
	const normalizedNodes = normalizeNodes(nodes, normalizedLinks);
	const { initialLinkForce, finalLinkForce } = createLinkForces(normalizedLinks, normalizedNodes);

	simulation
		.nodes(normalizedNodes as Node[])
		.force("link", initialLinkForce)
		.stop();

	return { simulation, finalLinkForce };
}
