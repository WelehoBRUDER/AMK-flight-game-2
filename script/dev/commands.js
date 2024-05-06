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
	{
		name: "dev",
		help: "Enable developer mode",
		verboseHelp:
			"dev [enable/disable] [save (optional)] - Developer mode allows the use of cheats and debug info. Parameter save enables developer mode automatically every time.",
		availableParams: [
			[{ id: "y/n - enable or disable developer mode", onSelect: "y" }],
			[{ id: "save dev mode (leave empty to not save)", onSelect: "save" }],
		],
		execute: (args) => {
			const mode = args[0];
			const save = args[1];
			if (mode) {
				let message = "";
				if (mode === "y" || mode === "yes") {
					dev.enabled = true;
					message = "Enabled developer mode.";
				} else if (mode === "n" || mode === "no") {
					dev.enabled = false;
					message = "Disabled developer mode.";
				} else {
					message = `Incorrect argument "${mode}". Expected either y/yes or n/no.`;
				}
				if (save === "save") {
					dev.save();
					devConsole.commandHistory.push(message + " Saved developer mode settings");
				}
			} else {
				devConsole.commandHistory.push("Too few arguments, expected: dev [enable/disable] [save]");
			}
		},
	},
	{
		name: "next",
		help: "Go to next player",
		verboseHelp: "next - Skips to next player's turn.",
		availableParams: [],
		execute: () => {
			game.nextPlayer();
		},
	},
];
