import { line, curveCatmullRomClosed, polygonHull } from "d3"
import { CoordinatePair, Vector } from "../types";

const hullPadding = 5;

export default function getSmoothHull(rawPoints: CoordinatePair[]) {
	const points = getHullPoints(rawPoints)
	const pointCount = points?.length || 0

	// Handle special cases
	if (!points || pointCount < 1) return ""
	if (pointCount === 1) return createOnePointHull(points[0], hullPadding)
	if (pointCount === 2) return createTwoPointHull(points, hullPadding)

	return createPolyHull(points, hullPadding)
}

function getHullPoints(points: CoordinatePair[]) {
	return points.length < 3 ? points : polygonHull(points)
}

function createOnePointHull(point: CoordinatePair, hullPadding: number) {
	const [x, y] = point
	const p1 = [x, y - hullPadding];
	const p2 = [x, y + hullPadding];

	return `
		M ${p1}
		A ${[hullPadding, hullPadding, '0,0,0', p2].join(',')}
		A ${[hullPadding, hullPadding, '0,0,0', p1].join(',')}
	`.trim()
}

function createTwoPointHull([p1, p2]: CoordinatePair[], hullPadding: number) {
	const vector = createVector(p1, p2, hullPadding);

	const tangentHalfLength = 0.075 * hullPadding
	const controlDelta = scaleVector(
		[-vector[1], vector[0]],
		tangentHalfLength,
	)
	const inverseControlDelta = scaleVector(controlDelta, -1)

	const endPoints = [
		sumVectors(p1, scaleVector(vector, -0.6)),
		sumVectors(p2, scaleVector(vector, 0.6)),
	]
	const controlPoints = [
		sumVectors(endPoints[0], inverseControlDelta),
		sumVectors(endPoints[1], inverseControlDelta),
		sumVectors(endPoints[0], controlDelta),
	]

	return `
		M ${endPoints[0]}
		C ${[controlPoints[0], controlPoints[1], endPoints[1]].join(',')}
		S ${[controlPoints[2], endPoints[0]].join(',')}
		Z
	`.trim()
}

function createVector([x1, y1]: CoordinatePair, [x2, y2]: CoordinatePair, length = 1): CoordinatePair {
	const [x, y] = [x2 - x1, y2 - y1]
	const magnitude = getMagnitude([x, y], length)
	const vector = scaleVector([x, y], magnitude)

	return scaleVector(
		vector,
		length,
	)
}

function scaleVector([x, y]: CoordinatePair, scale: number): CoordinatePair {
	return [scale * x, scale * y]
}

function sumVectors([x1, y1]: CoordinatePair, [x2, y2]: CoordinatePair): CoordinatePair {
	return [x1 + x2, y1 + y2]
}

function getMagnitude([x, y]: CoordinatePair, length: number) {
	return length / Math.sqrt(x ** 2 + y ** 2)
}

function createPolyHull(points: CoordinatePair[], hullPadding: number) {
	const hullPoints = points
		.map((points, index, point) => addVectorToPoint(points, index, point))
		.map(expandPoint(hullPadding))

	return line()
		.curve(curveCatmullRomClosed)
		.x(([x, y]) => x)
		.y(([x, y]) => y)
		(hullPoints) || ""
}

function addVectorToPoint(point: CoordinatePair, index: number, points: CoordinatePair[]): Vector {
	const nextPoint = points[(index + 1) % points.length] // Returns original point at end

	return {
		p: point,
		v: createVector(point, nextPoint)
	}
}

function expandPoint(hullPadding: number) {
	return (point: Vector, index: number, points: Vector[]): CoordinatePair => {
		const previousIndex = (index > 0) ? (index - 1) : (points.length - 1)
		const previousPoint = points[previousIndex]

		const hullVector = sumVectors(
			previousPoint.v,
			scaleVector(point.v, -1),
		)

		return (
			sumVectors(
				point.p,
				scaleVector(hullVector, hullPadding)
			)
		)
	}
}
