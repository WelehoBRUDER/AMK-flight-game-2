class Player {
	constructor(player) {
		this.id = !player.id ? generateID() : player.id;
		this.screen_name = player.screen_name;
		this.co2_consumed = player.co2_consumed ?? 0;
		this.home = player.location ?? "EFHK";
		this.location = player.location ?? "EFHK";
		this.location_name = player.location_name ?? "Helsinki Vantaa Airport";
		this.money = player.money ?? 10000;
		this.time = player.time ?? 0;
		this.items = player.items ?? [];
		this.real_time_last_check = 0;
		this.real_time = player.real_time ?? 0;
		this.distance_traveled = player.distance_traveled ?? 0;
		this.finished = player.finished ?? false;
		this.flights = player.flights ?? 0;
		this.score = player.score ?? 0;
	}

	hasLost() {
		if (this.money <= 0) return true;
		return false;
	}

	wonMinigame() {
		this.items.push(game.getItemByPort(this.location));
		game.createItemPopUp();
		game.closeMinigames();
	}

	lostMinigame() {
		this.items.push(game.getItemByPort(this.location));
		this.setMoney(this.money - 3000);
		game.createItemPopUp(false);
		game.closeMinigames();
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
		const stats = document.querySelector(".stats");
		stats.innerHTML = "";
		stats.append(this.getStatsDisplay());
	}

	setMoney(value) {
		this.money = value;
		this.updateStatsScreen();
	}

	setFlights(value) {
		this.flights = value;
		this.updateStatsScreen();
	}

	lose() {
		this.finished = true;
		displayLoseScreen();
	}

	win() {
		displayWinScreen();
		this.finished = true;
		this.calcScore();
		routes.addPlayerToLeaderboards();
	}

	calcScore() {
		let score = 0;
		score += this.money * 2;
		score -= this.co2_consumed * 0.66;
		score += this.distance_traveled * 0.18;
		this.score = Math.floor(score * game.difficulty.scoreMulti);
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
		}, 3150 / settings.animationSpeed);
	}

	winCheck() {
		if (this.items.length === 4 && this.location === this.home) {
			return true;
		}
	}

	getItem(item) {
		return this.items.find((itm) => itm === item);
	}

	setLocation(port) {
		this.location = port.ident;
		this.location_name = port.name;
		const item = game.getItemByPort(this.location);
		if (item) {
			if (this.getItem(item)) return;
			// jotain tapahtuu kun itemi löytyy :o
			const text = document.createElement("div");
			text.textContent = `${item.id} is in this city!`;
			game.startMinigame(item.game, item);
		}
	}
}

const diceRolling = document.querySelector(".dice-rolling");

if (dev.enabled) {
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
	game.addPlayer({
		screen_name: "Best",
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
	game.init();
}

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
