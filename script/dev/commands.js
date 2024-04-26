const developerCommands = [
	{
		name: "help",
		help: "List all available commands",
		verboseHelp:
			"help [command] - List all available commands. If a command is specified, the help text for that command will be displayed.",
		availableParams: [],
		execute: (args) => {
			const command = args[0];
			if (command) {
				const commandObject = developerCommands.find((c) => c.name === command);
				if (commandObject) {
					devConsole.commandHistory.push(commandObject.verboseHelp);
					return;
				}
				devConsole.commandHistory.push(`Command ${command} not found, type "help" to see all available commands`);
				return;
			} else {
				let text = "Available commands:";
				developerCommands.forEach((command) => {
					text += `<br>${command.name}: ${command.help}`;
				});
				devConsole.commandHistory.push(text);
			}
		},
	},
	{
		name: "fly",
		help: "Fly to target cords",
		verboseHelp: "fly [lat] [lon] - flies to latitude and longitude specified.",
		availableParams: [[{ id: "latitude coordinate", onSelect: 50 }], [{ id: "longitude coordinate", onSelect: 50 }]],
		execute: (args) => {
			const lat = parseFloat(args[0]);
			const lon = parseFloat(args[1]);
			if (lat && lon) {
				moveMap(lat, lon);
				devConsole.commandHistory.push(`Flying to (${lat},${lon})`);
			} else {
				devConsole.commandHistory.push("Too few arguments, expected: fly [lat] [lon]");
			}
		},
	},
];
