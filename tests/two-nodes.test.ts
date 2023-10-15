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
      center: [0, 0.5],
      "foreground-color": "hsla(120, 50%, 50%, 0.4)",
      hull: `M -28.552137502179978 7.638034375544994
C -30.825908986895598,-1.4570515633174912,26.278366017464357,-15.73312031440748,28.552137502179978,-6.638034375544994
S -26.278366017464357,16.73312031440748,-28.552137502179978,7.638034375544994
Z`,
      id: "quality",
      label: "Quality Concepts",
      points: [
        [-14, 4],
        [14, -3],
      ],
    },
  ]);

  expect(graphNodes).toMatchObject([
    {
      id: "Quality",
      x: -14,
      y: 4,
    },
    {
      id: "Naming",
      x: 14,
      y: -3,
    },
  ]);
});
