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
}

export default options
