# Sika Graph

Given nodes, links, groups, and an optional filter, return the plottable graph data for a Sika Graph.

## Installation

```bash
npm i @sikaeducation/sika-graph
```

## Usage

```typescript
import { createSimulation } from "@sikaeducation/sika-graph"

const nodes = [{
	"id": "Quality",
	"group": "quality",
	"critical": true,
	"complete": true,
},
{
	"id": "Naming",
	"group": "quality",
	"critical": false,
	"complete": false,
}];
const links = [{
	"source": "Quality",
	"target": "Naming",
}];
const groups = [{
	"id": "quality",
	"label": "Quality Concepts",
	"background-color": "hsla(120, 50%, 50%, 0.1)",
	"foreground-color": "hsla(120, 50%, 50%, 0.4)",
}];
const currentFilter = "all";
const { simulation, groups } = runSimulation({ nodes, links, groups, currentFilter });

/*
// Simulation
{
	groups: [
		{
			"active": true,
			"background-color": "hsla(120, 50%, 50%, 0.1)",
			"center": [ 0, -0.5 ],
			"foreground-color": "hsla(120, 50%, 50%, 0.4)",
			"id": "quality",
			"label": "Quality Concepts",
			"points": [
				[15, -5],
				[-15, 4]
			],
		},
	],
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

* `npm run build`
* `npm test`
* `npm run lint`

## Publishing

Increment the version with `npm version patch|minor|major`, push to GitHub, automatically deploys to npm.
