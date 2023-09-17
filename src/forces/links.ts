import { forceLink } from "d3";
import { HydratedLink, RawNode, RawLink } from "../types";

type Values = {
	linkDistance: number;
	nonGrouplinkStrength: number;
	groupLinkStrength: number;
}

export default function createLinkForces(links: RawLink[], normalizedNodes: RawNode[]) {
	const fullLinks = links.map<HydratedLink>((link) => ({
		source: normalizedNodes.find((node) => node.id === link.source)!,
		target: normalizedNodes.find((node) => node.id === link.target)!,
	}));

	const initialLinkForce = createLinkForce(fullLinks, {
		linkDistance: 1,
		groupLinkStrength: 1,
		nonGrouplinkStrength: 0,
	});

	const finalLinkForce = createLinkForce(fullLinks, {
		linkDistance: 30,
		groupLinkStrength: 1,
		nonGrouplinkStrength: 0.1,
	});

	return { initialLinkForce, finalLinkForce };
}


function createLinkForce(links: HydratedLink[], {
	linkDistance,
	groupLinkStrength,
	nonGrouplinkStrength,
}: Values) {
	return forceLink<RawNode, HydratedLink>()
		.id(({ id }) => id)
		.distance(linkDistance)
		.strength(({ source, target }) => (
			source.group === target.group
				? groupLinkStrength
				: nonGrouplinkStrength
		))
		.links(links);
}
