import { cloneDeep, uniq } from "lodash";
import {
	forceSimulation, forceManyBody, forceX, forceY, forceCollide, Simulation,
} from "d3";
import createLinkForces from "./forces/links";
import { Node, RawLink, Link, RawNode } from "./types";
import options from "./options";
import { log } from "console";
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

	console.log(
		"4l", links, nodes, currentFilter,
	);
	const normalizedLinks = getNormalizedLinks(
		links, nodes, currentFilter,
	);
	console.log("5l", normalizedLinks);
	const normalizedNodes = getNormalizedNodes(normalizedLinks, nodes);
	const { initialLinkForce, finalLinkForce } = createLinkForces(normalizedLinks, normalizedNodes);

	console.log("n1", normalizedNodes);

	simulation
		.nodes(normalizedNodes)
		.stop()
		.force("link", initialLinkForce);

	// Casting to include coordinates from simulation
	console.log("n2", simulation.nodes());
	return {
		simulation: simulation as Simulation<Node, Link>,
		finalLinkForce,
	};
}

function getNormalizedLinks(
	links: RawLink[], nodes: RawNode[], currentFilter = "",
) {
	log(
		"3n0", nodes, currentFilter,
	);
	const currentNodeIds = nodes
		.filter((node) => (
			currentFilter === "all"
			|| node.group === currentFilter
		)).map(({ id }) => id);
	log("3n", currentNodeIds);

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
	console.log("n0", nodes);
	console.log("l0", normalizedLinks);

	const linkedNodeIds = normalizedLinks
		.flatMap(({ source, target }) => {
			return ([
				source,
				target,
			]);
		});

	console.log("l0.25", linkedNodeIds);
	let nodes2 = uniq(linkedNodeIds);
	console.log("n0.3", nodes2);

	let nodes3 = nodes2.map<RawNode>((nodeId) => {
		console.log("i", nodeId);

		const found = nodes
			.find(({ id }) => id === nodeId) || nodes[0];
		console.log("f", found);
		return found;
	});
	console.log("n0.5", nodes3);
	return nodes3;
}

function initializeSimulation() {
	return forceSimulation<RawNode>()
		.force("x", forceX<RawNode>(positionalForce.x))
		.force("y", forceY<RawNode>(positionalForce.y))
		.force("charge", forceManyBody<RawNode>().strength(initialCharge))
		.force("collision", forceCollide<RawNode>(initialCollision));
}
