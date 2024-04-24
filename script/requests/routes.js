// This file contains all requests that can be made to the python backend.
const host = "http://127.0.0.1:5000";

// These routes must be called in async functions with await
// Example:
//   async function getAllPlayers() {
//     const players = await routes.getAllPlayers();
//     return players;
//   }
// If they are used without await, all that will be returned is a promise.
const routes = {
	getAllAirports: async () => {
		try {
			const response = await fetch(`${host}/get-all-airports`);
			if (response.status === 200) {
				const data = await response.json();
				return data;
			}
		} catch (err) {
			console.warn(`getAllAirports request failed: ${err}. Most likely backend server is off.`);
		}
	},
	getAllPlayers: async () => {
		try {
			const response = await fetch(`${host}/get-all-players`);
			if (response.status === 200) {
				const data = await response.json();
				return data;
			}
		} catch (err) {
			console.warn(`getAllPlayers request failed: ${err}. Most likely backend server is off.`);
		}
	},
	getCountry: async (code) => {
		try {
			const response = await fetch(`${host}/get-country/${code}`);
			if (response.status === 200) {
				const data = await response.json();
				return data;
			}
		} catch (err) {
			console.warn(`getCountry request failed: ${err}. Most likely backend server is off.`);
		}
	},
	createId: async () => {
		try {
			const response = await fetch(`${host}/create-id`);
			if (response.status === 200) {
				const data = await response.json();
				return data;
			}
		} catch (err) {
			console.warn(`createId request failed: ${err}. Most likely backend server is off.`);
		}
	},
};
