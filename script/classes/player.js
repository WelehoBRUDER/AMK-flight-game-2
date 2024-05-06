class Player {
	constructor(player) {
		this.id = !player.id ? generateID() : player.id;
		this.screen_name = player.screen_name;
		this.co2_consumed = parseInt(player.co2_consumed);
		this.location = player.location;
		this.location_name = player.location_name;
		this.money = player.money ?? 10000;
		this.time = player.time;
		this.real_time_last_check = 0;
		this.real_time = player.real_time;
		this.distance_traveled = player.distance_traveled;
		this.origin_latitude = player.origin_latitude;
		this.origin_longitude = player.origin_longitude;
		this.finished = player.finished;
		this.flights = 0;
	}

	hasLost() {
		let lost = false;
		switch (this) {
			case this.money <= 0:
				lost = true;
				break;
		}
		return lost;
	}

	getAll() {
		return this;
	}

	getViewableStats() {
		return {
			screen_name: this.screen_name,
			co2_consumed: this.co2_consumed,
			location: this.location_name,
			money: this.money,
			time: this.time,
			real_time: this.real_time,
			distance_traveled: this.distance_traveled,
			flights: this.flights,
		};
	}
	// Returns stats as an element that can be embedded anywhere.
	getStatsDisplay() {
		const statsElem = document.createElement("div");
		statsElem.classList.add("player-stats");
		Object.entries(this.getViewableStats()).forEach(([id, value]) => {
			const statContainer = document.createElement("div");
			const statValueText = document.createElement("p");
			const icon = document.createElement("img");
			statContainer.classList.add("stat");
			icon.classList = `stat-icon ${id}`;
			statValueText.classList = `stat-value ${id}`;
			const displayValue = typeof value === "number" && statUnits[id] !== "" ? value.toFixed(2) : value;
			statValueText.innerText = displayValue + statUnits[id];
			icon.src = statIcons[id];

			new Tooltip({ element: statContainer, text: translate(`${id}_tt`) }).create();

			statContainer.append(icon, statValueText);
			statsElem.append(statContainer);
		});
		return statsElem;
	}

	updateStatsScreen() {
		const bottomBar = document.querySelector(".bottom-bar");
		bottomBar.innerHTML = "";
		bottomBar.append(this.getStatsDisplay());
	}

	setMoney(value) {
		this.money = value;
		this.updateStatsScreen();
	}

	setFlights(value) {
		this.flights = value;
		this.updateStatsScreen();
	}

	rollFlights() {
		lockMap();
		diceRolling.innerHTML = "";
		const dice = diceCreation();
		const roll = random(6);
		diceRolling.append(dice);
		displayDiceValues(dice, [roll]);
		setTimeout(() => {
			diceRolling.innerHTML = "";
			this.setFlights(roll);
			unlockMap();
		}, 3000 / settings.animationSpeed);
	}
}

const diceRolling = document.querySelector(".dice-rolling");

game.addPlayer({
	screen_name: "Test",
	co2_consumed: 0,
	location: "EFHK",
	location_name: "Helsinki Vantaa Airport",
	time: 0,
	real_time_last_check: 0,
	real_time: 0,
	distance_traveled: 0,
	origin_latitude: 0,
	origin_longitude: 0,
	finished: false,
});

const statUnits = {
	screen_name: "",
	co2_consumed: "kg",
	location: "",
	money: "€",
	time: "",
	real_time: "",
	distance_traveled: "km",
	flights: "",
};

const statIcons = {
	screen_name: "images/player-time.png",
	co2_consumed: "images/burning-forest.png",
	location: "images/port_icon.png",
	money: "images/money-stack.png",
	time: "images/calendar.png",
	real_time: "images/watch.png",
	distance_traveled: "images/walking-boot.png",
	flights: "images/commercial-airplane.png",
};
