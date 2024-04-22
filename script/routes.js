// This file contains all requests that can be made to the python backend.
const host = "http://127.0.0.1:5000";

const routes = {
	getAllAirports: async () => {
		await fetch(`${host}/get-all-airports`, { headers: { "Access-Control-Allow-Origin": "*" } }).then((response) => {
			console.log(response);
		});
	},
};
