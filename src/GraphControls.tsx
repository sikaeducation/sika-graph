import { ChangeEvent } from "react";
import './GraphControls.scss';

import { Group } from "./types";

type Props = {
	currentFilter: string;
	setCurrentFilter: (newFilter: string) => void;
	groups: Group[];
}

function GraphControls({ groups, currentFilter, setCurrentFilter }: Props) {

	const resetFilter = () => {
		setCurrentFilter("all")
	}

	const changeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
		setCurrentFilter(event.target.value)
	}

	return (
		<form id="node-filters">
			<label htmlFor="node-filters-list">Filters:</label>
			<select id="node-filters-list" value={currentFilter} onInput={changeFilter}>
				{groups.map(({ id, label }) => (
					<option key={id} value={id}>{label}</option>
				))}
				<option value="all">All</option>
			</select>

			<button type="button" id="reset-filters" onClick={resetFilter}>Clear filters</button>
		</form>
	);
}

export default GraphControls;
