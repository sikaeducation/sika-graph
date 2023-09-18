import { forceManyBody, forceCollide, Simulation, ForceLink } from "d3";
import { HydratedLink, Link, Node, RawNode } from "../types";

type Options = Readonly<{
	alphaCutoff: number;
	charge: number;
	collision: number;
	forceBoundaries: [number, number];
}>

// Normal state after alpha cutoff
export default function shapeLinks(
	simulation: Simulation<Node, Link>,
	linkForce: ForceLink<RawNode, HydratedLink>,
	{
		alphaCutoff,
		charge,
		collision,
		forceBoundaries,
	}: Options,
) {
	const alpha = simulation.alpha();

	if (alpha < alphaCutoff) {
		simulation
			.force("charge", forceManyBody()
				.strength(charge)
				.distanceMin(forceBoundaries[0])
				.distanceMax(forceBoundaries[1]))
			.force("link", linkForce)
			.force("collision", forceCollide(collision));
	}
}
