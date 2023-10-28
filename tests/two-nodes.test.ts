import { it, expect } from "vitest";
import { runSimulation } from "../src//index";
import defaultOptions from "../src/options";
import { nodes, links, groups } from "./fixtures/two-nodes";

it("runs a simulation with 2 linked nodes", () => {
  const currentFilter = "all";
  const { nodes: graphNodes, groups: graphGroups } = runSimulation({
    nodes,
    links,
    groups,
    options: defaultOptions,
    currentFilter,
  });

  expect(graphGroups).toMatchObject([
    {
      active: true,
      "background-color": "hsla(120, 50%, 50%, 0.1)",
      center: [0, 1],
      "foreground-color": "hsla(120, 50%, 50%, 0.4)",
      hull: `M -28.849242404917494 5.121320343559642
C -30.17506761964227,-4.159456159513791,27.523417190192717,-12.402096846633075,28.849242404917494,-3.1213203435596424
S -27.523417190192717,14.402096846633075,-28.849242404917494,5.121320343559642
Z`,

      id: "quality",
      label: "Quality Concepts",
      points: [
        [-14, 3],
        [14, -1],
      ],
    },
  ]);

  expect(graphNodes).toMatchObject([
    {
      id: "Quality",
      x: -14,
      y: 3,
    },
    {
      id: "Naming",
      x: 14,
      y: -1,
    },
  ]);
});
