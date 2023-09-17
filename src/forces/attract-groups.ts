import { Simulation } from "d3"
import { Node, RawLink, Group, Coordinate } from "../../types"

const alphaCutoff = 0.3
const attraction = 1 - 0.5
const cutoffTaperRate = 1.1
const cutoffDistance = 27 // Ignore nodes closer than this

// Moves each node closer to the center of its group
export default function attractGroups(simulation: Simulation<Node, RawLink>, groups: Group[]) {
	const nodes = simulation.nodes()
	const alpha = simulation.alpha()
	const groupCenters = groups.reduce<Record<string, { x: number, y: number }>>((centers, group) => {
		centers[group.id] = {
			x: group.center[0],
			y: group.center[1],
		}
		return centers
	}, {})

	nodes.forEach(node => {
		node.groupCenter = {
			x: groupCenters[node.group].x,
			y: groupCenters[node.group].y,
		}

		const distanceToGroup = getDistance(node.groupCenter, { x: node.x, y: node.y })

		const adjustedDistanceCutoff = (alpha < alphaCutoff)
			? cutoffDistance + (cutoffTaperRate * (alphaCutoff - alpha))
			: cutoffDistance

		if (distanceToGroup > adjustedDistanceCutoff) {
			node.x = (node.x * attraction) + (node.groupCenter.x * attraction)
			node.y = (node.y * attraction) + (node.groupCenter.y * attraction)
		}
	})
}

function getDistance({ x: x1, y: y1 }: Coordinate, { x: x2, y: y2 }: Coordinate) {
	const positionDifferential = {
		x: x1 > x2 ? x1 - x2 : x2 - x1,
		y: y1 > y2 ? y1 - y2 : y2 - y1,
	}

	return Math.sqrt(
		positionDifferential.x ** 2
		+ positionDifferential.y ** 2
	)
}
