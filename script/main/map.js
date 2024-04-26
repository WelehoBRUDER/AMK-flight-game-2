const map = L.map("map").setView([60.1785553, 24.8786212], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const plane = document.querySelector(".plane");

async function addMarkers() {
	const ports = await routes.getAirportsAround("EFHK", "large_airport");
	// const ports = await routes.getAllNonSmallAirports();
	for (const port of ports) {
		console.log(port);
		const marker = L.marker([port.airport.latitude_deg, port.airport.longitude_deg], { icon: mapIcons.port }).addTo(map);
	}
	console.log(ports);
}

function moveMap(lat, lon) {
	plane.classList.remove("hide");
	setTimeout(() => plane.classList.add("hide"), 2700);
	map.setView([lat, lon], map.getZoom(), {
		animate: true,
		pan: {
			duration: 2.5,
		},
	});
}

const mapIcons = {
	port: L.icon({
		iconUrl: "../../images/port.png",
		shadowUrl: "../../images/port_shadow.png",

		iconSize: [60, 60], // size of the icon
		shadowSize: [1, 1], // size of the shadow
		iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62], // the same for the shadow
		popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
	}),
};

addMarkers();
