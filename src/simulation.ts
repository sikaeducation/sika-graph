import {
  forceSimulation,
  forceManyBody,
  forceX,
  forceY,
  forceCollide,
} from "d3";
import createLinkForces from "./forces/links";
import { Node, Link, RawLink, RawNode } from "./types";
import options from "./options";
import normalizeLinks from "./data/normalize-links";
import normalizeNodes from "./data/normalize-nodes";

type Options = typeof options;

export function createSimulation({
  nodes,
  links,
  options,
  currentFilter = "all",
}: {
  nodes: RawNode[];
  links: RawLink[];
  options: Options;
  currentFilter: string;
}) {
  const {
    forces: {
      positional: positionalForce,
      charge: { initial: initialCharge },
      collision: { initial: initialCollision },
      link: {
        distance: { initial: initialLinkDistance, final: finalLinkDistance },
        strength: {
          initial: initialNonGroupLinkStrength,
          final: finalNonGrouplinkStrength,
        },
      },
      group: {
        link: {
          strength: { initial: initialGroupLinkStrength },
        },
      },
    },
  } = options;
  const simulation = forceSimulation<Node, Link>()
    .force("x", forceX<RawNode>(positionalForce.x))
    .force("y", forceY<RawNode>(positionalForce.y))
    .force("charge", forceManyBody<RawNode>().strength(initialCharge))
    .force("collision", forceCollide<RawNode>(initialCollision));

  const normalizedLinks = normalizeLinks(links, nodes, currentFilter);
  const normalizedNodes = normalizeNodes(nodes, normalizedLinks);
  const { initialLinkForce, finalLinkForce } = createLinkForces(
    normalizedLinks,
    normalizedNodes,
    {
      initialLinkForce: {
        linkDistance: initialLinkDistance,
        groupLinkStrength: initialGroupLinkStrength,
        nonGroupLinkStrength: initialNonGroupLinkStrength,
      },
      finalLinkForce: {
        linkDistance: finalLinkDistance,
        groupLinkStrength: initialGroupLinkStrength,
        nonGroupLinkStrength: finalNonGrouplinkStrength,
      },
    },
  );

  simulation
    .nodes(normalizedNodes as Node[])
    .force("link", initialLinkForce)
    .stop();

  return { simulation, finalLinkForce };
}
