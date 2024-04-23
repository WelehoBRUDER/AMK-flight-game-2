class Player {
	constructor(player) {
		this.id = !player.id ? null : player.id;
		this.screen_name = player.screen_name;
		this.co2_consumed = parseInt(player.co2_consumed);
		this.location = player.location;
		this.money = player.money;
		this.time = player.time;
		this.real_time_last_check = 0;
		this.real_time = player.real_time;
		this.distance_traveled = player.distance_traveled;
		this.origin_latitude = player.origin_latitude;
		this.origin_longitude = player.origin_longitude;
		this.finished = player.finished;

		// This is advanced promise sorcery
		// I didn't want to move the id generation away from the backend
		// so it's now a route that will be requested when generating player.
		if (this.id === null) {
			// We can't use await inside a construtor because it can't be made an async function.
			// So instead we check if the id is null, and in the case that it is
			// we create a self activating async function that grabs the id.
			(async () => {
				this.id = await this.generateId();
			})();
			// (This isn't really necessary, but oh well)
		}
	}

	async generateId() {
		const id = await routes.createId();
		return id;
	}

	getAll() {
		return this;
	}
}

const testPlayer = new Player({
	screen_name: "Test",
	co2_consumed: 0,
	location: "HS",
	money: 500,
	time: 0,
	real_time_last_check: 0,
	real_time: 0,
	distance_traveled: 0,
	origin_latitude: 0,
	origin_longitude: 0,
	finished: false,
});
