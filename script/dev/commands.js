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
		verboseHelp: "fly [lat] [lon] [speed] - flies to latitude and longitude specified at set speed.",
		availableParams: [
			[{ id: "latitude coordinate", onSelect: 50 }],
			[{ id: "longitude coordinate", onSelect: 50 }],
			[{ id: "flight time in ms", onSelect: 1000 }],
		],
		execute: (args) => {
			const lat = parseFloat(args[0]);
			const lon = parseFloat(args[1]);
			const spd = parseInt(args[2]);
			if (lat && lon && spd) {
				moveMap(lat, lon, spd / 2);
				devConsole.commandHistory.push(`Flying to (${lat},${lon}) in ${spd}ms`);
			} else {
				devConsole.commandHistory.push("Too few arguments, expected: fly [lat] [lon] [speed]");
			}
		},
	},
];
