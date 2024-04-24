class Game {
	constructor() {
		this.players = [];
		this.turn = 0;
		this.round = 0;
		this.last_player_index = 0;
		this.flights = [];
		this.difficulty = null;
	}

	setDifficulty(difficulty) {
		this.difficulty = difficulty;
	}

	get_players_stills_playing() {
		return this.players.filter((p) => {
			p.hasLost() || p.finished;
		});
	}

	// Creates player using Player class and adds to the list
	addPlayer(i, start) {
		player_name = `${i}Player`;
		clear_and_exit_check(player_name);
		player_location = start["ident"];
		player_money = this.difficulty["money"].players.append(
			Player(i, player_name, 0, player_location, player_money, 0, 0, 0, start["latitude_deg"], start["longitude_deg"])
		);
	}

	getCurrentPlayers() {
		_players = this.get_players_stills_playing();
		if (_players.length === 0) {
			return this.players[this.last_player_index];
		}
		player = _players[this.turn].last_player_index = player.id - 1;
		return player;
	}

	advanceTurn() {
		this.turn += 1;
	}

	resetTurns() {
		this.turn = 0;
	}

	playersAmount() {
		return this.get_players_stills_playing().length;
	}

	// This function gets all flights available to the requested player.
	// The flights are based on the airport,
	// if two players are in the same place, they get the same flights.
	get_flights(playerId) {
		port = this.players[playerId].location;
		for (flight in this.flights) {
			if (flight["from"]["ident"] === port) {
				return flight["flights"];
			}
		}
	}

	// This function creates 16 flights for each player.
	//  generate_flights():
	//     // Gets all airports based on where the players are currently.
	//     // If all are at the same port, this list will have a length of 1.
	//     airport_codes = [player.location for player in .get_players_stills_playing()]
	//     // Gets airport data using the codes ined above
	//     airports = get_multiple_airports(airport_codes)
	//     for airport in airports:
	//         lat, lon, port_type = airport["latitude_deg"], airport["longitude_deg"], airport["type"]
	//         // Draw flights based on the current location
	//         flights_from_airport = draw_airports_from_origin(lat, lon, port_type)
	//         for flight in flights_from_airport:
	//             flight["cost"] = calc_cost(flight["distance"])
	//             flight["emissions"] = calc_co2(flight["distance"])
	//             flight["flight_time"] = calc_flight_time(flight["distance"])
	//         // Adds the flights and the origin.
	//         .flights.append({"flights": flights_from_airport, "from": airport})
}

const game = new Game();
