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
		marker.distance = port.distance;
		const tooltip = new Tooltip({ marker, text: port.airport.name });
		tooltip.create();

		marker.on("click", (e) => {
			if (map.dragging._enabled) {
				moveMap(e.latlng.lat, e.latlng.lng, marker.distance);
			}
		});
	}
}

function setup() {
	createMap();
	addMarkers();
}

function lockMap() {
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	map.dragging.disable();
	document.querySelector(".leaflet-control-zoom").style.display = "none";
}

function unlockMap() {
	map.touchZoom.enable();
	map.doubleClickZoom.enable();
	map.scrollWheelZoom.enable();
	map.boxZoom.enable();
	map.keyboard.enable();
	map.dragging.enable();
	document.querySelector(".leaflet-control-zoom").style.display = "block";
}

async function moveMap(lat2, lon2, dist) {
	const { lat, lon } = currentCords;
	map.setView([lat, lon], 8, {
		animate: false,
	});
	lockMap();
	plane.classList.remove("hide");

	const duration = dist * 2;
	const bearing = await routes.bearing(lat, lon, lat2, lon2);
	plane.style.setProperty("--angle", `${bearing}deg`);
	//map.setView([lat, lon], 8);
	console.log(lat, lon, lat2, lon2);
	console.log(dist);
	setTimeout(() => {
		map.setView([lat2, lon2], map.getZoom(), {
			animate: true,
			pan: {
				duration: duration / 1000,
			},
		});
	}, 100);

	setTimeout(() => {
		plane.classList.add("hide");
		currentCords.lat = lat2;
		currentCords.lon = lon2;
		unlockMap();
	}, duration + 200);
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
