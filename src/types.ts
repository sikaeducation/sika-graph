import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

export type RawGroup = {
	id: string;
	label: string;
	"background-color": string;
	"foreground-color": string;
}

export type Group = RawGroup & {
	points: CoordinatePair[];
	center: CoordinatePair;
	active: boolean;
}

export type RawNode = {
	id: string;
	group: string;
	critical?: boolean;
	complete?: boolean;
	in_progress?: boolean;
} & SimulationNodeDatum

export type Node = RawNode & Coordinate & {
	groupCenter?: Coordinate;
} & SimulationNodeDatum

export type RawLink = {
	source: string;
	target: string;
} & SimulationLinkDatum<RawNode>

export type HydratedLink = {
	source: RawNode;
	target: RawNode;
}

export type Link = HydratedLink & SimulationLinkDatum<Node>

export type Coordinate = {
	x: number;
	y: number;
}

export type Vector = {
	p: CoordinatePair;
	v: CoordinatePair;
}

export type CoordinatePair = [number, number]
