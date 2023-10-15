import { forceLink } from "d3";
import { HydratedLink, RawNode, RawLink } from "../types";

type Values = {
  linkDistance: number;
  nonGroupLinkStrength: number;
  groupLinkStrength: number;
};

export default function createLinkForces(
  links: RawLink[],
  normalizedNodes: RawNode[],
  options: {
    initialLinkForce: {
      linkDistance: number;
      groupLinkStrength: number;
      nonGroupLinkStrength: number;
    };
    finalLinkForce: {
      linkDistance: number;
      groupLinkStrength: number;
      nonGroupLinkStrength: number;
    };
  },
) {
  const fullLinks = links.map<HydratedLink>((link) => ({
    source: normalizedNodes.find((node) => node.id === link.source)!,
    target: normalizedNodes.find((node) => node.id === link.target)!,
  }));

  return {
    initialLinkForce: createLinkForce(fullLinks, options.initialLinkForce),
    finalLinkForce: createLinkForce(fullLinks, options.finalLinkForce),
  };
}

function createLinkForce(
  links: HydratedLink[],
  {
    linkDistance,
    groupLinkStrength,
    nonGroupLinkStrength: nonGrouplinkStrength,
  }: Values,
) {
  return forceLink<RawNode, HydratedLink>()
    .id(({ id }) => id)
    .distance(linkDistance)
    .strength(({ source, target }) =>
      source.group === target.group ? groupLinkStrength : nonGrouplinkStrength,
    )
    .links(links);
}
