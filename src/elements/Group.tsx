import classNames from "classnames";
import { Group as GroupType } from "../types";
import "./Group.scss"
import getSmoothHull from "../graph/hull"

type Props = {
	currentFilter: string;
	group: GroupType;
}

export default function Group({ group, currentFilter }: Props) {
	const {
		id,
		label,
		"background-color": backgroundColor,
		"foreground-color": foregroundColor,
		points,
		center,
		active,
	} = group
	const hullPoints = getSmoothHull(points)
	const fillColor = (id === currentFilter || currentFilter === "all")
		? backgroundColor
		: "none"

	return (
		<g
			className={classNames({
				Group: true,
				"inactive": !active,
			})}
		>
			<path
				d={hullPoints}
				fill={fillColor}
			/>
			<text
				className={classNames({
					"group-label": true,
				})}
				fill={foregroundColor}
				textAnchor="middle"
				x={center[0]}
				y={center[1]}
			>
				{label}
			</text>
		</g >
	)
}
