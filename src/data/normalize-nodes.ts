import { uniq } from "lodash";
import { RawLink, RawNode } from "../types";

export default function getNormalizedNodes(
  nodes: RawNode[],
  normalizedLinks: RawLink[],
) {
  const linkedNodeIds = normalizedLinks.flatMap(({ source, target }) => {
    return [source, target];
  });

  return uniq(linkedNodeIds).map<RawNode>((nodeId) => {
    const found = nodes.find(({ id }) => id === nodeId) || nodes[0];
    return found;
  });
}
