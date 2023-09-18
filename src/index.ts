import { RawLink, RawNode, RawGroup } from "./types";
import addCoordinatesToGroup from "./graph/add-coordinates-to-group";
import constrainNodes from "./graph/constrain-nodes";
import attractGroups from "./forces/attract-groups";
import shapeLinks from "./forces/shape-links";
import defaultOptions from "./options";
import { createSimulation } from "./simulation";
import { merge } from "lodash";

type SimulationParameters = {
	nodes: RawNode[];
	links: RawLink[];
	groups: RawGroup[];
	options: Partial<typeof defaultOptions>;
	currentFilter: string;
}

export function runSimulation({
	nodes,
	links,
	groups: rawGroups,
	options: optionsOverrides = {},
	currentFilter,
}: SimulationParameters) {
	const options = merge(defaultOptions, optionsOverrides);
	const {
		simulation: {
			tickCount,
		},
	} = options;
	const { simulation, finalLinkForce } = createSimulation(
		nodes, links, currentFilter,
	);

	let count = tickCount;
	let groups: ReturnType<typeof addCoordinatesToGroup>;

	do {
		simulation.tick();
		count--;
		constrainNodes(simulation);
		groups = addCoordinatesToGroup(simulation, rawGroups);
		attractGroups(simulation, groups);
		shapeLinks(simulation, finalLinkForce);
	} while (count > 0);

	return {
		nodes: simulation.nodes(),
		groups,
	};
}
