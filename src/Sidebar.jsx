import { useState } from "react";

function Sidebar() {
	let [show, setShow] = useState(true);
	console.log("Sidebar rendered");

	return (
		<>
			<span
				className="material-symbols-outlined sidebar-toggle"
				onClick={() => setShow(!show)}
			>
				close
			</span>
			<div className="sidebar" style={{ left: show ? "0vw" : "-10vw" }}>
				sample text
			</div>
		</>
	);
}

export default Sidebar;
