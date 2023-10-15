import { cloneDeep } from "lodash";
import { RawLink, RawNode } from "../types";

export default function getNormalizedLinks(
  links: RawLink[],
  nodes: RawNode[],
  currentFilter = "all",
) {
  const currentNodeIds = nodes
    .filter((node) => currentFilter === "all" || node.group === currentFilter)
    .map(({ id }) => id);

  return currentFilter === "all"
    ? cloneDeep(links)
    : cloneDeep(links).filter(({ source, target }) => {
        return [source, target].some((node) => currentNodeIds.includes(node));
      });
}
