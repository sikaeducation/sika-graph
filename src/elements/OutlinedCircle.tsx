import "./OutlinedCircle.scss"

export default function OutlinedCircle() {
	return (
		<symbol
			id="outlined-circle"
			viewBox="-5 -5 10 10"
		>
			<circle
				className="inner"
				r="3"
				cx="0"
				cy="0"
			/>
			<circle
				className="outer"
				r="4"
				cx="0"
				cy="0"
			/>
		</symbol>
	)
}
