import { RawLink, RawNode, RawGroup } from "./types";
import addCoordinatesToGroup from "./utilities/add-coordinates-to-group";
import constrainNodes from "./utilities/constrain-nodes";
import attractGroups from "./forces/attract-groups";
import shapeLinks from "./forces/shape-links";
import options from "./options";
import { getSimulation } from "./simulation";
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

export default function runSimulation({
	nodes,
	links,
	groups: rawGroups,
	currentFilter,
}: SimulationParameters) {
	const { simulation, finalLinkForce } = getSimulation(
		nodes, links, currentFilter,
	);

	let count = tickCount;
	let groups = addCoordinatesToGroup(simulation, rawGroups);

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
