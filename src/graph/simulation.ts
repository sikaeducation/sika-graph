import {
	forceSimulation, forceManyBody, forceX, forceY, forceCollide, Simulation
} from "d3"
import addCoordinatesToGroup from "./add-coordinates-to-group"
import attractGroups from "./forces/attract-groups"
import shapeLinks from "./forces/shape-links"
import createLinkForce from "./forces/links"
import { Node, RawLink, HydratedLink, Link, RawNode, RawGroup, Group } from "../types"

const tickCount = 300
const positionalForce = {
	x: 0,
	y: 0,
}
const initialCharge = -90
const initialCollision = 30

type SimulationParameters = {
	nodes: RawNode[];
	links: RawLink[];
	groups: RawGroup[];
	currentFilter: string;
}

export default function runSimulation({
	nodes,
	links,
	groups: rawGroups,
	currentFilter,
}: SimulationParameters) {
	const simulation = initializeSimulation()

	const currentNodeIds = nodes
		.filter(node => (
			currentFilter === "all"
			|| node.group === currentFilter
		)).map(({ id }) => id)

	const normalizedLinks = currentFilter === "all"
		? deepClone<RawLink[]>(links)
		: deepClone<RawLink[]>(links)
			.filter(({ source, target }) => {
				return [
					source,
					target,
				].some(node => currentNodeIds.includes(node))
			})

	const linkedNodeIds = normalizedLinks
		.flatMap(({ source, target }) => {
			return ([
				source,
				target,
			])
		})
	const normalizedNodes = getUnique(linkedNodeIds)
		.map(nodeId => nodes
			.find(({ id }) => id === nodeId) || nodes[0]
		)

	// Make this more efficient
	const fullLinks = links.map<HydratedLink>(link => ({
		source: normalizedNodes.find(node => node.id === link.source)!,
		target: normalizedNodes.find(node => node.id === link.target)!,
	}))

	const initialLinkForce = createLinkForce(fullLinks, {
		linkDistance: 1,
		groupLinkStrength: 1,
		nonGrouplinkStrength: 0,
	})

	const finalLinkForce = createLinkForce(fullLinks, {
		linkDistance: 30,
		groupLinkStrength: 1,
		nonGrouplinkStrength: 0.1,
	})

	simulation
		.nodes(normalizedNodes)
		.force("link", initialLinkForce)
		.stop()
	let count = tickCount
	simulation.alpha(1)

	// Casting to include coordinates from simulation
	const tickedSimulation = simulation as Simulation<Node, Link>
	let groups: Group[]

	do {
		simulation.tick()
		count--
		constrainNodes(tickedSimulation)
		groups = addCoordinatesToGroup(tickedSimulation, rawGroups)
		attractGroups(tickedSimulation, groups)
		shapeLinks(tickedSimulation, finalLinkForce)
	} while (count > 0)

	return {
		simulation: simulation as Simulation<Node, Link>,
		groups,
	}
}

function constrainNodes(simulation: Simulation<Node, Link>) {
	const boundary = 60

	const nodes = simulation.nodes()
	nodes.forEach(node => {
		node.x = clampToInteger(node.x, -boundary, boundary)
		node.y = clampToInteger(node.y, -boundary, boundary)
	})
}

function initializeSimulation() {
	return forceSimulation<RawNode>()
		.force("x", forceX<RawNode>(positionalForce.x))
		.force("y", forceY<RawNode>(positionalForce.y))
		.force("charge", forceManyBody<RawNode>().strength(initialCharge))
		.force("collision", forceCollide<RawNode>(initialCollision))
}

function getUnique(array: unknown[]) {
	return Array.from((new Set(array)))
}

function deepClone<T>(object: T) {
	return JSON.parse(JSON.stringify(object)) as T
}

function clampToInteger(value: number, lowerBound: number, upperBound: number) {
	return Math.round(
		Math.max(
			Math.min(
				value,
				upperBound,
			),
			lowerBound,
		)
	)
}
