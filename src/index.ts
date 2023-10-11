import { RawLink, RawNode, RawGroup } from "./types";
import addCoordinatesToGroup from "./graph/add-coordinates-to-group";
import constrainNodes from "./graph/constrain-nodes";
import attractGroups from "./forces/attract-groups";
import shapeLinks from "./forces/shape-links";
import defaultOptions from "./options";
import { createSimulation } from "./simulation";
import { defaultsDeep } from "lodash";

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
	const options = defaultsDeep(defaultOptions, optionsOverrides) as typeof defaultOptions;
	const { simulation, finalLinkForce } = createSimulation({
		nodes, links, options, currentFilter,
	});

	let count = options.simulation.tickCount;
	simulation.tick();
	let groups = addCoordinatesToGroup(
		simulation, rawGroups, options.simulation.hullPadding,
	);

	do {
		simulation.tick();

		constrainNodes(simulation, options.simulation.size);
		groups = addCoordinatesToGroup(
			simulation, groups, options.simulation.hullPadding,
		);
		attractGroups(
			simulation,
			groups,
			{
				alphaCutoff: options.simulation.alphaCutoff,
				attraction: options.forces.charge.final,
				cutoffTaperRate: options.forces.group.distance.rate,
				cutoffDistance: options.forces.group.distance.cutoff,
			},
		);
		shapeLinks(
			simulation,
			finalLinkForce,
			{
				alphaCutoff: options.simulation.alphaCutoff,
				charge: options.forces.charge.final,
				collision: options.forces.collision.final,
				forceBoundaries: options.forces.boundaries as [number, number],
			},
		);

		count--;
	} while (count > 0);

	return {
		nodes: simulation.nodes(),
		groups,
	};
}
