import classNames from "classnames";
import { getLinkLine } from "../graph/generate-mid-points";
import { Link as LinkType, Node } from "../types";
import "./Link.scss"

type Props = {
	source: Node;
	target: Node;
	links: LinkType[];
}

export default function Link({ source, target, links }: Props) {
	const { dx, dy } = getDelta({ source, target })

	const angle = toDegrees(Math.atan2(dy, dx))
	const offset = {
		x: -1,
		y: -1,
	}

	const feederNodes = links
		.filter(link => link.target.id === target.id)
		.map(({ source }) => source)

	type LinkState = "open" | "closed" | "in_progress" | "complete"
	let linkState: LinkState
	if (target.in_progress) {
		linkState = "in_progress"
	} else if (target.complete) {
		linkState = "complete"
	} else if (feederNodes.every(({ complete }) => complete)) {
		linkState = "open"
	} else {
		linkState = "closed"
	}

	return (
		<g
			className={classNames({
				Link: true,
				closed: linkState === "closed",
				open: linkState === "open",
				"in-progress": linkState === "in_progress",
				complete: linkState === "complete",
			})}
		>
			<path
				className="line"
				id={`link-${generateLinkId({ source, target })}`}
				d={generateLinkLine({ source, target })}
			/>
			{(linkState === "open") &&
				<use
					width="2"
					height="2"
					href="#arrow"
					className="ant"
					transform={
						`rotate(${angle}) translate(${offset.x}, ${offset.y})`
					}
				>
					<animateMotion
						dur="0.5s"
						repeatCount="indefinite"
					>
						<mpath href={`#link-${generateLinkId({ source, target })}`} />
					</animateMotion>
				</use>
			}
		</g >
	)
}

export function generateLinkPath({ source, target }: { source: Node; target: Node; }) {
	return `M${source.x},${source.y} L${target.x},${target.y}`
}

function getDelta({ source, target }: { source: Node; target: Node; }) {
	return {
		dx: target.x - source.x,
		dy: target.y - source.y,
	}
}

function generateLinkId({ source, target }: { source: Node; target: Node; }) {
	return `${source.id}-${target.id}`.replaceAll(" ", "").trim()
}

function toDegrees(radians: number) {
	return radians * (180 / Math.PI)
}

function generateLinkLine({ source, target }: LinkType) {
	return getLinkLine({ source, target })
		.reduce((path, point, index) => (
			index % 2 === 0
				? `${path} ${point}`
				: `${path},${point}`
		), "M")
}
