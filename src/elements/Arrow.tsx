import "./Arrow.scss"

export default function Arrow() {
	return (
		<symbol
			id="arrow"
			viewBox="0 0 10 10"
		>
			<path
				d={
					`M 0 0
					L 10 5
					L 0 10
					L 5 5
					z`
				}
			/>
		</symbol>
	)
}
