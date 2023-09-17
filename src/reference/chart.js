import { select } from "d3"
import { addArrow, addCircle } from "./elements/icons.js"
import options from "./options.js"
import {
	attachZoomListener,
	zoom,
	resetZoom,
} from "./zoom.js"

const {
	chart: { width, height },
} = options

const svg = select("#container")
	.append("svg")
	.attr("preserveAspectRatio", "xMinYMin meet")
	.attr("viewBox", [
		Math.round(width / -2),
		Math.round(height / -2),
		width,
		height,
	]).call(attachResetFocus)
	.call(zoom)
	.append("g")
	.classed("bounds", true)
	.attr("width", `${width}`)
	.attr("height", `${height}`)
	.call(attachZoomListener, zoom)

svg.append("defs")
	.call(addArrow)
	.call(addCircle)

svg.call(resetZoom, zoom)

window.addEventListener("resize", () => {
	resetZoom(select("#container svg"), zoom)
})

function attachResetFocus(svg) {
	svg.on("click", (event) => {
		if (event.target.tagName !== "use") {
			select("#container .details")
				.classed("open", false)
		}
	})
}
