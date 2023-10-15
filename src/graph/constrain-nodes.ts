import { Simulation } from "d3";
import { Node, Link } from "../types";

export default function constrainNodes(
  simulation: Simulation<Node, Link>,
  size: number,
): void {
  const nodes = simulation.nodes();
  nodes.forEach((node) => {
    node.x = clampToInteger(node.x, -size, size);
    node.y = clampToInteger(node.y, -size, size);
  });
}

export function clampToInteger(
  value: number,
  lowerBound: number,
  upperBound: number,
) {
  return Math.round(Math.max(Math.min(value, upperBound), lowerBound));
}
