import { useState } from "react";
import "./App.scss";
import data from "./data";
import Graph from './Graph';

import runSimulation from "./graph/simulation"
import GraphControls from "./GraphControls";

const { nodes, links, groups: rawGroups } = data

function App() {
	const [currentFilter, setCurrentFilter] = useState("all")

	const { simulation, groups } = runSimulation({
		nodes: deepClone(nodes),
		links: deepClone(links),
		groups: deepClone(rawGroups),
		currentFilter,
	})

	return (
		<div className="App">
			<h1>Graph</h1>
			<GraphControls
				currentFilter={currentFilter}
				setCurrentFilter={setCurrentFilter}
				groups={groups}
			/>
			<Graph
				filter={currentFilter}
				simulation={simulation}
				links={links}
				groups={groups}
			/>
		</div>
	);
}

export default App;

function deepClone<T>(object: T) {
	return JSON.parse(JSON.stringify(object)) as T
}
