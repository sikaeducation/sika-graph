import { Simulation } from 'd3-force';
import Arrow from './elements/Arrow';
import Circle from './elements/Circle';
import Node from './elements/Node';
import './Graph.scss';
import { Node as NodeType, RawLink, Group as GroupType, RawNode } from './types';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useState } from 'react';
import NodeDetails from './NodeDetails';
import classNames from 'classnames';
import Link from './elements/Link';
import Group from './elements/Group';
import OutlinedCircle from './elements/OutlinedCircle';
import ArrowHead from './elements/ArrowHead';

const options = {
	chart: {
		height: Math.ceil(window.innerHeight * 0.8),
		width: Math.ceil(window.innerWidth * 0.8),
		boundary: Math.ceil(window.innerWidth * 0.7),
		resetScalingFactor: 4,
		transitionRate: 250,
		hullPadding: 5,
		nodeDiameter: 4,
	},
	zoom: {
		minimum: 4,
		maximum: 30,
		defaultScale: 5,
		constraintFactor: 7,
	},
	focus: {
		duration: 500,
		scale: 18,
	},
} as const


type Props = {
	filter: string;
	simulation: Simulation<NodeType, RawLink>;
	groups: GroupType[];
	links: RawLink[];
}

function Graph({ filter, groups, links, simulation }: Props) {
	const nodes = simulation.nodes()
	const [open, setOpen] = useState(false)
	const [currentNode, setCurrentNode] = useState<RawNode | null>(null)

	const nodeMap = nodes.reduce<Record<string, NodeType>>((nodeMap, node) => {
		return {
			...nodeMap,
			[node.id]: node,
		}
	}, {})

	const hydratedLinks = links.map(({ source, target }) => {
		return {
			id: `${source}-${target}`,
			source: nodeMap[source],
			target: nodeMap[target],
		}
	})

	const zoomTo = (zoomToElement: (id: string) => void) => (node: RawNode) => {
		const formattedId = node.id.replace(/\s/g, "-")
		setCurrentNode(node)
		setOpen(true)
		zoomToElement(formattedId)
	}

	const resetZoom = (resetTransform: () => void) => () => {
		setCurrentNode(null)
		setOpen(false)
		resetTransform()
	}

	return (
		<div className="Graph">
			<TransformWrapper
				initialScale={4}
				initialPositionX={Math.round(options.chart.width * -1.5)}
				initialPositionY={Math.round(options.chart.height * -1.5)}
				minPositionX={Math.round(options.chart.width / 2)}
				maxPositionX={Math.round(options.chart.width / -2)}
				minPositionY={Math.round(options.chart.height / 2)}
				maxPositionY={Math.round(options.chart.height / -2)}
				minScale={options.zoom.minimum}
				maxScale={options.zoom.maximum}
				centerZoomedOut={true}
				centerOnInit={true}
				disablePadding={true}
				wheel={{
					step: 0.8,
					smoothStep: 0.04,
				}}
			>
				{({ zoomToElement, resetTransform }) => (
					<div id="container">
						<div
							className={classNames({
								NodeDetails: true,
								details: true,
								open,
							})}
						>
							{currentNode && (
								<NodeDetails
									node={currentNode}
									close={() => setOpen(false)}
								/>
							)}
						</div>
						<TransformComponent>
							<svg
								width={`${options.chart.width}px`}
								height={`${options.chart.height}px`}
								viewBox={`
								${Math.round(options.chart.width / -2)},
								${Math.round(options.chart.height / -2)},
								${options.chart.width},
								${options.chart.height}
							`.replace(/\s/g, "")}
								preserveAspectRatio="xMinYMin meet"
							>
								<defs>
									<Circle />
									<OutlinedCircle />
									<Arrow />
									<ArrowHead />
								</defs>
								<g
									className="bounds"
									width={options.chart.width}
									height={options.chart.height}
								>
									{groups.map((group) => (
										<Group
											key={group.id}
											group={group}
											currentFilter={filter}
										/>
									))}
									{hydratedLinks.map(({ id, source, target }) => (
										<Link
											key={id}
											links={hydratedLinks}
											source={source}
											target={target}
										/>
									))}
									{nodes.map((node) => (
										<Node
											key={node.id}
											node={node}
											links={hydratedLinks}
											zoomTo={zoomTo(zoomToElement)}
										/>
									))}
								</g>
							</svg>
						</TransformComponent>
						<svg
							id="reset"
							width="40px"
							height="40px"
							viewBox="-10 -10 20 20"
						>
							<g>
								<rect
									x={0}
									y={0}
									width={8}
									height={8}
									onClick={resetZoom(resetTransform)}
								/>
							</g>
						</svg>
					</div>
				)}
			</TransformWrapper>
		</div>
	);
}

export default Graph;
