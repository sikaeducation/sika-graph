import { max, min } from "d3"
import { Coordinate, Link, Node } from "../types"

export function getLinkLine({ source, target }: Link) {
	const segmentCount = getSegmentCount(4, { source: source, target: target })
	const segments = generateMidPoints(
		clampToLowerBound(1, segmentCount - 1),
		{
			source: source,
			target: target,
		},
	)

	return [
		source.x, source.y,
		...segments,
		target.x, target.y,
	]
}

export function getDistance({ x: x1 = 0, y: y1 = 0 }: Coordinate, { x: x2 = 0, y: y2 = 0 }: Coordinate) {
	const positionDifferential = {
		x: x1 > x2 ? x1 - x2 : x2 - x1,
		y: y1 > y2 ? y1 - y2 : y2 - y1,
	}

	return Math.sqrt(
		positionDifferential.x ** 2
		+ positionDifferential.y ** 2
	)
}

export function getSegmentCount(segmentLength: number, { source, target }: Link) {
	const distance = getDistance(source as Coordinate, target as Coordinate)
	return Math.ceil(distance / segmentLength)
}

export function clampToLowerBound(limit: number, value: number) {
	return (value < limit) ? limit : value
}

export function centerToRadius(radius: number, { source, target }: Link) {
	const { sine, cosine } = getSine(radius, { target, source })

	return {
		source: Object.assign(source, {
			x: source.x! + cosine,
			y: source.y! + sine,
		}), target: Object.assign({
			x: target.x! - cosine,
			y: target.y! - sine,
		})
	}
}

export function getMidPoint({ source, target }: Link, proportion = 2) {
	return [
		((target.x! - source.x!) * (1 / proportion)) + source.x!,
		((target.y! - source.y!) * (1 / proportion)) + source.y!,
	]
}

export function getSine(nodeRadius: number, { target, source }: Link) {
	const angle = Math.atan2(target.y! - source.y!, target.x! - source.x!)
	const cosine = Math.cos(angle) * nodeRadius
	const sine = Math.sin(angle) * nodeRadius

	return { sine, cosine }
}

export function generateMidPoints(count: number, { source, target }: Link) {
	const dx = target.x! - source.x!
	const dy = target.y! - source.y!

	const segmentLengthX = dx / count
	const segmentLengthY = dy / count

	const midPoints = []
	for (let iteration = 1; iteration <= count - 1; iteration++) {
		midPoints.push(
			source.x! + (segmentLengthX * iteration),
			source.y! + (segmentLengthY * iteration),
		)
	}

	return midPoints
}

export function clampToBoundary(nodes: Node[], size: number) {
	nodes.forEach(d => {
		d.x = max([d.x, -size]) || 0
		d.y = max([d.y, -size]) || 0
		d.x = min([d.x, size]) || 0
		d.y = min([d.y, size]) || 0
	})
}
