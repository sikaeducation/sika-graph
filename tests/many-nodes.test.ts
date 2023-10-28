import { it, expect } from "vitest";
import { runSimulation } from "../src/index";
import defaultOptions from "../src/options";
import { nodes, links, groups } from "./fixtures/many-nodes";

it("runs a simulation with many linked nodes", () => {
  const currentFilter = "all";
  const { nodes: graphNodes } = runSimulation({
    nodes,
    links,
    groups,
    options: defaultOptions,
    currentFilter,
  });

  expect(graphNodes).toMatchObject(
    expect.arrayContaining([
      expect.objectContaining({
        id: "Jest Time",
        x: -12,
        y: 25,
      }),
      expect.objectContaining({
        id: "TypeScript Generic Types",
        x: -6,
        y: 16,
      }),
    ]),
  );
});
