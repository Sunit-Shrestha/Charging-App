import { useEffect, useState } from "react";

let map;
let location = navigator.geolocation;
let stations = [];
let phoneNumbers = [];
function getMarker(color = "blue") {
	color = color.toLowerCase();
	var customMarker = new L.Icon({
		iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});
	return customMarker;
}

function Map() {
	const [pos, setPos] = useState(null);
	function updateLocations() {
		location.getCurrentPosition(
			(position) =>
				setPos([position.coords.latitude, position.coords.longitude]),
			() => setPos([27.6822, 85.323816])
		);

		//get stations from server
		stations = [
			[27.68, 85.323816],
			[27.672, 85.349],
		];
		phoneNumbers = ["1234567890", "0987654321"];
	}

	useEffect(() => {
		map = L.map("map");
		updateLocations();
		setInterval(updateLocations, 10000);
	}, []);

	if (map != null) {
		map.setView(pos, 14);
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
		L.marker(pos, { icon: getMarker("green") }).addTo(map);

		for (let idx in stations) {
			let marker = L.marker(stations[idx], { icon: getMarker() }).addTo(map);
			marker.on("click", function (e) {
				alert(`Station Number ${idx + 1}: ${phoneNumbers[idx]}`);
			});
		}
	}

	return (
		<>
			<div id="map"></div>
		</>
	);
}

export default Map;
