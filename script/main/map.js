const currentCords = { lat: 60.1785553, lon: 24.8786212 };
const plane = document.querySelector(".plane");
let map;

function createMap() {
	map = L.map("map").setView([currentCords.lat, currentCords.lon], 5);
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);
}

async function addMarkers() {
	const ports = await routes.getAirportsAround("EFHK", "large_airport");
	// const ports = await routes.getAllNonSmallAirports();
	for (const port of ports) {
		const marker = L.marker([port.airport.latitude_deg, port.airport.longitude_deg], { icon: mapIcons.port, interactive: true }).addTo(map);
		const tooltip = new Tooltip({ marker, text: port.airport.name });
		tooltip.create();
	}
}

function setup() {
	createMap();
	addMarkers();
}

async function moveMap(lat2, lon2) {
	plane.classList.remove("hide");
	const { lat, lon } = currentCords;
	const bearing = await routes.bearing(lat, lon, lat2, lon2);
	plane.style.setProperty("--angle", `${bearing}deg`);
	map.setView([lat, lon], map.getZoom());
	map.setView([lat2, lon2], map.getZoom(), {
		animate: true,
		pan: {
			duration: 2.5,
		},
	});
	setTimeout(() => {
		plane.classList.add("hide");
		currentCords.lat = lat2;
		currentCords.lon = lon2;
	}, 2700);
}

const mapIcons = {
	port: L.icon({
		iconUrl: "../../images/port.png",
		shadowUrl: "../../images/port_shadow.png",

		iconSize: [60, 60], // size of the icon
		shadowSize: [1, 1], // size of the shadow
		iconAnchor: [30, 30], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62], // the same for the shadow
		popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
	}),
};
