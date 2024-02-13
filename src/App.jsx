import Map from "./Map";
import Sidebar from "./Sidebar";

function App() {
	let stations = [
		[27.68, 85.323816],
		[27.672, 85.349],
	];
	console.log("App rendered");

	return (
		<>
			<Sidebar />
			<Map stations={stations} />
		</>
	);
}

export default App;
