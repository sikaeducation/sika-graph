import { RawLink, RawNode, RawGroup } from "./types";
import addCoordinatesToGroup from "./graph/add-coordinates-to-group";
import constrainNodes from "./graph/constrain-nodes";
import attractGroups from "./forces/attract-groups";
import shapeLinks from "./forces/shape-links";
import options from "./options";
import { createSimulation } from "./simulation";
const {
	simulation: {
		tickCount,
	},
} = options;

type SimulationParameters = {
	nodes: RawNode[];
	links: RawLink[];
	groups: RawGroup[];
	currentFilter: string;
}

export function runSimulation({
	nodes,
	links,
	groups: rawGroups,
	currentFilter,
}: SimulationParameters) {
	console.log("c", currentFilter);
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
		simulation: simulation,
		groups,
	};
}
