import "./NodeDetails.scss";
import { RawNode } from "./types";

type Props = {
	node: RawNode;
	close: () => void;
}

function NodeDetails({ node, close }: Props) {
	const { id } = node

	return (
		<>
			<div>
				<button onClick={() => close()}>Close</button>
			</div>
			<h2>{id}</h2>
			<p>{id}</p>
		</>
	);
}

export default NodeDetails;
