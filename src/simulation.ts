import { cloneDeep, uniq } from "lodash";
import {
	forceSimulation, forceManyBody, forceX, forceY, forceCollide, Simulation,
} from "d3";
import createLinkForces from "./forces/links";
import { Node, RawLink, Link, RawNode } from "./types";
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


export function createSimulation(
	nodes: RawNode[], links: RawLink[], currentFilter = "all",
) {
	const simulation = initializeSimulation();

	const normalizedLinks = getNormalizedLinks(
		links, nodes, currentFilter,
	);
	const normalizedNodes = getNormalizedNodes(normalizedLinks, nodes);
	const { initialLinkForce, finalLinkForce } = createLinkForces(normalizedLinks, normalizedNodes);


	simulation
		.nodes(normalizedNodes)
		.stop()
		.force("link", initialLinkForce);

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
		? cloneDeep(links)
		: cloneDeep(links)
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

	return uniq(linkedNodeIds)
		.map<RawNode>((nodeId) => {
			const found = nodes
				.find(({ id }) => id === nodeId) || nodes[0];
			return found;
		});
}

function initializeSimulation() {
	return forceSimulation<RawNode>()
		.force("x", forceX<RawNode>(positionalForce.x))
		.force("y", forceY<RawNode>(positionalForce.y))
		.force("charge", forceManyBody<RawNode>().strength(initialCharge))
		.force("collision", forceCollide<RawNode>(initialCollision));
}
