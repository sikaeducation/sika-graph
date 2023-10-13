# Sika Graph

[![CI](https://github.com/sikaeducation/sika-graph/actions/workflows/main.yml/badge.svg)](https://github.com/sikaeducation/sika-graph/actions/workflows/main.yml)

Given nodes, links, groups, an optional options object, and an optional filter, return the plottable graph data for a Sika Graph. The filter needs to be a part of this (instead of the data being passed in) to prevent the graph thrashing when all of the plot points for the data change.

## Installation

```bash
npm i @sikaeducation/sika-graph
```

## Usage

```typescript
import { createSimulation } from "@sikaeducation/sika-graph";

const nodes = [
  {
    id: "Quality",
    group: "quality",
    critical: true,
    complete: true,
  },
  {
    id: "Naming",
    group: "quality",
    critical: false,
    complete: false,
  },
];
const links = [
  {
    source: "Quality",
    target: "Naming",
  },
];
const groups = [
  {
    id: "quality",
    label: "Quality Concepts",
    "background-color": "hsla(120, 50%, 50%, 0.1)",
    "foreground-color": "hsla(120, 50%, 50%, 0.4)",
  },
];
const options = {
  simulation: {
    tickCount: 300,
    alphaCutoff: 0.1,
    size: 60, // y/x/-y/-x
    hullPadding: 5,
  },
  forces: {
    positional: {
      x: 0,
      y: 0,
    },
    charge: {
      // Attraction, -100 is repel, 100 is stacked
      initial: -90,
      final: -30,
    },
    collision: {
      initial: 30,
      final: 0,
    },
    link: {
      // Nodes pushed together or pulled apart
      distance: {
        // How far apart to target, ~30
        initial: 300,
        final: 30,
      },
      strength: {
        // 0-1, how aggressive
        initial: 0.2,
        final: 0.5,
      },
    },
    group: {
      charge: {
        // how attracted nodes are to group center, -1 is repulsion, 0 is no attraction, 1 is pinned to center
        initial: 1,
        final: 0.5,
      },
      link: {
        // Used for link force nodes pre alpha cutoff
        strength: {
          // -1 - 1: Positive is attraction, negative is repulsion
          initial: 0.9,
        },
      },
      distance: {
        cutoff: 300, // Distance to ignore this force after
        rate: 100, // Factor
      },
    },
  },
};
const currentFilter = "all";
const { simulation, groups } = runSimulation({
  nodes,
  links,
  groups,
  currentFilter,
});

/*
// Simulation
{
	groups: [{
		"active": true,
		"background-color": "hsla(120, 50%, 50%, 0.1)",
		"center": [ 0, -0.5 ],
		"foreground-color": "hsla(120, 50%, 50%, 0.4)",
		"hull": `
		M 29.36739427831727 -9.310218283495182
		C 32.06128070550176,-0.3305968595468869,-26.673507851132783,17.289839707443477,-29.36739427831727,8.310218283495182
		S 26.673507851132783,-18.289839707443477,29.36739427831727,-9.310218283495182
		Z
		`,
		"id": "quality",
		"label": "Quality Concepts",
		"points": [
			[15, -5],
			[-15, 4]
		],
	}],
	nodes: [{
    "complete": true,
    "critical": true,
    "group": "quality",
    "groupCenter": Object {
      "x": 0,
      "y": -0.5,
    },
    "id": "Quality",
    "index": 0,
    "vx": 0.00048553240216897976,
    "vy": -0.00006794438663780661,
    "x": 15,
    "y": -5,
  }, {
    "complete": false,
    "critical": false,
    "group": "quality",
    "groupCenter": Object {
      "x": 0,
      "y": -0.5,
    },
    "id": "Naming",
    "index": 1,
    "vx": -0.00048553240216897976,
    "vy": 0.0002233750546635813,
    "x": -15,
    "y": 4,
  }])
*/
```

## Scripts

- `npm run build`
- `npm test`
- `npm run lint`

## Publishing

Increment the version with `npm version patch|minor|major`, push to GitHub, automatically deploys to npm.
