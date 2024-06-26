const currentCords = { lat: 60.1785553, lon: 24.8786212 };
const plane = document.querySelector(".plane");
let map;

async function createMap() {
	map = L.map("map").setView([currentCords.lat, currentCords.lon], 5);
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: 3,
		maxZoom: 12,
		noWrap: true,
	}).addTo(map);
	document.querySelector("#map").style.zIndex = "1";
}

/**
 * Returns an element that has an icon, a name and a value element.
 * @param {string} icon - ID of the icon
 * @param {string} name - Name of the icon value pair (id corresponding to language)
 * @param {any} value - Actual value of the pair
 */
function iconNameValue(icon, name, value, appendix = "") {
	const container = document.createElement("div");
	const iconAndName = document.createElement("div");
	const iconImage = document.createElement("img");
	const nameText = document.createElement("p");
	const valueText = document.createElement("span");
	container.classList.add("iconNameValue");
	iconImage.src = statIcons[icon];
	nameText.textContent = translate(name);
	valueText.textContent = typeof value === "number" ? value.toFixed(2) : value;
	valueText.textContent += appendix;
	iconAndName.append(iconImage, nameText);
	container.append(iconAndName, valueText);
	return container;
}

function airportInfo(port, marker) {
	const info = document.createElement("div");
	info.classList.add("airport-info");
	const airportName = document.createElement("h2");
	airportName.classList.add("airport-name");
	airportName.textContent = port.name;
	const price = port.distance * 0.17;
	info.append(airportName);
	info.append(iconNameValue("distance_traveled", "distance", port.distance, "km"));
	info.append(iconNameValue("money", "flight_cost", price, "€"));
	const buttons = document.createElement("div");
	const flyToButton = document.createElement("button");
	buttons.classList.add("buttons");
	flyToButton.classList.add("fly");
	flyToButton.textContent = translate("fly_to_airport");
	flyToButton.addEventListener("click", () => {
		game.removeAllWindows();
		if (canClick(marker)) {
			moveMap(port.latitude_deg, port.longitude_deg, port.distance, port, marker._icon);
		} else {
			floatingText(marker._icon, translate("too_far"), 2);
		}
	});
	buttons.append(flyToButton);
	info.append(buttons);
	game.createWindow(info);
}

function canClick(marker) {
	return map.dragging._enabled && !marker._icon.classList.contains("greyed-out") && !marker._icon.classList.contains("gold-shine");
}

async function addMarkers() {
	clearMarkers();
	const ports = await routes.getAirportsAround(game.currentPlayer().location, "large_airport");
	const markers = [];
	for (const port of ports) {
		const marker = L.marker([port.latitude_deg, port.longitude_deg], { icon: mapIcons.port, interactive: true }).addTo(map);
		marker.distance = port.distance;
		marker.ident = port.ident;
		let hoverText = port.name;

		if (port.ident === game.currentPlayer().location) {
			marker._icon.classList.add("gold-shine");
			hoverText += " (currently here)";
		}
		const tooltip = new Tooltip({ marker, text: hoverText });
		tooltip.create();

		if (marker.distance > 4300) {
			marker._icon.classList.add("greyed-out");
		}

		marker.on("click", () => {
			airportInfo(port, marker);
		});

		markers.push(marker);
	}
}

function clearMarkers() {
	map.eachLayer((layer) => {
		if (layer instanceof L.Marker) {
			layer.remove();
		}
	});
}

function setup() {
	createMap();
	addMarkers();
	setTimeout(createHints, 1000);
	game.currentPlayer().updateStatsScreen();
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
function resetToPlayer() {
	port = Object.values(map._layers).find((marker) => {
		if (marker.ident === game.currentPlayer().location) {
			return marker;
		}
	});
	if (port) {
		const lat = port._latlng.lat;
		const lon = port._latlng.lng;
		currentCords.lat = lat;
		currentCords.lon = lon;
		map.setView([lat, lon], 6, {
			animate: false,
		});
	}
}

async function moveMap(lat2, lon2, dist, port, marker) {
	const price = dist * 0.17;
	if (game.currentPlayer().flights < 1) {
		floatingText(marker, translate("not_enough_flight_points"), 2);
		return;
	}
	if (game.currentPlayer().money < price) {
		floatingText(marker, translate("too_poor"), 2);
		return;
	}
	soundController.playSound("flying");
	const { lat, lon } = currentCords;
	map.setView([lat, lon], 6, {
		animate: false,
	});
	lockMap();
	plane.classList.remove("hide");

	const duration = dist / settings.flightSpeed;
	const bearing = await routes.bearing(lat, lon, lat2, lon2);
	plane.style.setProperty("--angle", `${bearing}deg`);
	game.currentPlayer().setMoney(game.currentPlayer().money - price);
	game.currentPlayer().setFlights(game.currentPlayer().flights - 1);
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
		game.currentPlayer().setLocation(port);
		addMarkers();
		game.currentPlayer().distance_traveled += dist;
		game.currentPlayer().co2_consumed += (157 * dist) / 1000;
		game.currentPlayer().updateStatsScreen();
	}, duration + 25);
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

/**
 * Spawns a text element that slowly floats up and fades away.
 * Text supports parseTextFast meaning that color and variable syntax can be used
 * @param {HTMLElement} origin - element the text should spawn from
 * @param {string} text - text displayed. Run through translate() before giving to this function.
 * @param {number} size - font size in rem
 */
function floatingText(origin, text, size) {
	const textContainer = document.createElement("pre");
	textContainer.append(dialog.parseTextFast(text));
	textContainer.classList.add("floating-text");
	textContainer.style.left = `${origin.getBoundingClientRect().x}px`;
	textContainer.style.top = `${origin.getBoundingClientRect().y}px`;
	textContainer.style.fontSize = `${size}rem`;
	document.body.append(textContainer);
	setTimeout(() => {
		document.body.removeChild(textContainer);
	}, 2500);
}

// 😎
/**
 * Creates text that swoops from both sides of the screen, leaves the other way and then disappears.
 * Supports parseTextFast meaning that color and variable syntax can be used
 * @param {string} title - Massive title text that is displayed in the center
 * @param {string} bottom - Smaller text that is displayed below the title
 */
function badassText(title, bottom) {
	const titleText = document.createElement("pre");
	const bottomText = document.createElement("pre");
	titleText.classList.add("badass-title");
	bottomText.classList.add("badass-bottom-text");
	titleText.append(dialog.parseTextFast(title));
	bottomText.append(dialog.parseTextFast(bottom));
	titleText.style.animationDuration = `${5.5 / settings.animationSpeed}s`;
	bottomText.style.animationDuration = `${5.5 / settings.animationSpeed}s`;
	document.body.append(titleText, bottomText);
	soundController.playSound("newarea");
	setTimeout(() => {
		titleText.remove();
		bottomText.remove();
	}, 5500 / settings.animationSpeed);
}
