import {
	forceSimulation, forceManyBody, forceX, forceY, forceCollide, Simulation,
} from "d3";
import createLinkForces from "./forces/links";
import { Node, RawLink, Link, RawNode } from "./types";
import { deepClone, getUnique } from "./utilities/math";
import options from "./options";
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


export function getSimulation(
	nodes: RawNode[], links: RawLink[], currentFilter = "",
) {
	const simulation = initializeSimulation();

	const normalizedLinks = getNormalizedLinks(
		links, nodes, currentFilter,
	);
	const normalizedNodes = getNormalizedNodes(normalizedLinks, nodes);
	const { initialLinkForce, finalLinkForce } = createLinkForces(normalizedLinks, normalizedNodes);

	simulation
		.nodes(normalizedNodes)
		.force("link", initialLinkForce)
		.stop();
	simulation.alpha(1);

	// Casting to include coordinates from simulation
	return {
		simulation: simulation as Simulation<Node, Link>,
		finalLinkForce,
	};
}

function getNormalizedLinks(
	links: RawLink[], nodes: RawNode[], currentFilter = "",
) {
	const currentNodeIds = nodes
		.filter((node) => (
			currentFilter === "all"
			|| node.group === currentFilter
		)).map(({ id }) => id);

	return currentFilter === "all"
		? deepClone<RawLink[]>(links)
		: deepClone<RawLink[]>(links)
			.filter(({ source, target }) => {
				return [
					source,
					target,
				].some((node) => currentNodeIds.includes(node));
			});
}

function getNormalizedNodes(normalizedLinks: RawLink[], nodes: RawNode[]) {
	const linkedNodeIds = normalizedLinks
		.flatMap(({ source, target }) => {
			return ([
				source,
				target,
			]);
		});

	return getUnique(linkedNodeIds)
		.map((nodeId) => nodes
			.find(({ id }) => id === nodeId) || nodes[0]);
}

function initializeSimulation() {
	return forceSimulation<RawNode>()
		.force("x", forceX<RawNode>(positionalForce.x))
		.force("y", forceY<RawNode>(positionalForce.y))
		.force("charge", forceManyBody<RawNode>().strength(initialCharge))
		.force("collision", forceCollide<RawNode>(initialCollision));
}
