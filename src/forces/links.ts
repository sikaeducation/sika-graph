import { forceLink } from "d3"
import { HydratedLink, RawNode } from "../../types"

type Values = {
	linkDistance: number;
	nonGrouplinkStrength: number;
	groupLinkStrength: number;
}

export default function createLinkForce(
	links: HydratedLink[], {
		linkDistance,
		groupLinkStrength,
		nonGrouplinkStrength
	}: Values) {
	return forceLink<RawNode, HydratedLink>()
		.id(({ id }) => id)
		.distance(linkDistance)
		.strength(({ source, target }) => (
			source.group === target.group
				? groupLinkStrength
				: nonGrouplinkStrength
		)).links(links)
}
