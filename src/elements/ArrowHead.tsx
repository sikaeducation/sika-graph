import "./Arrowhead.scss"

export default function ArrowHead() {
	return (
		<marker
			id="arrowhead"
			viewBox="0 0 10 10"
			orient="auto-start-reverse"
			markerHeight="4"
			markerWidth="4"
			refX={5}
			refY={5}
		>
			<path
				d={
					`M 0 0
					L 10 5
					L 0 10
					z`
				}
			/>
		</marker>
	)
}
