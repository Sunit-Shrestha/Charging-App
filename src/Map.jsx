import { useEffect, memo } from "react";

let map;
let location = navigator.geolocation;
let selfMarker;
let stationMarkers = [];

//Returns marker icon with specified color
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

//Updates the position marker
function updatePosition(latitude, longitude) {
	selfMarker = L.marker([latitude, longitude], {
		icon: getMarker("green"),
	});
	selfMarker.addTo(map);
}

//Loads the map centered at the specified latitude and longitude
function initializeMap(latitude, longitude) {
	map.setView([latitude, longitude], 14);
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
	L.control
		.zoom({
			position: "bottomright",
		})
		.addTo(map);
	updatePosition(latitude, longitude);
}

function Map(props) {
	//Creates the map, initializes it using gps location and updates the current position at an interval
	useEffect(() => {
		map = L.map("map", {
			zoomControl: false,
		});
		location.getCurrentPosition(
			(position) =>
				initializeMap(position.coords.latitude, position.coords.longitude),
			() => initializeMap(27.672, 85.323816)
		);
		setInterval(() => {
			location.getCurrentPosition((position) => {
				map.removeLayer(selfMarker);
				updatePosition(position.coords.latitude, position.coords.longitude);
			});
		}, 10000);
	}, []);

	//Plots the station markers on the map. Removes and re-adds the markers on every re-render
	useEffect(() => {
		for (let marker of stationMarkers) {
			map.removeLayer(marker);
		}

		for (let station of props.stations) {
			let marker = L.marker(station, { icon: getMarker() }).addTo(map);
			marker.on("click", function (e) {
				alert(`Station Number ...`);
			});
		}
	});

	console.log("Map rendered");

	return (
		<>
			<div id="map"></div>
		</>
	);
}

export default memo(Map);
