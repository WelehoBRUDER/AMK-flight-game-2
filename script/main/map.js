const map = L.map("map").setView([60.1785553, 24.8786212], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

async function addMarkers() {
	const ports = await routes.getAirportsAround("EFHK", "large_airport");
	// const ports = await routes.getAllNonSmallAirports();
	for (const port of ports) {
		console.log(port);
		const marker = L.marker([port.airport.latitude_deg, port.airport.longitude_deg]).addTo(map);
	}
	console.log(ports);
}

addMarkers();
