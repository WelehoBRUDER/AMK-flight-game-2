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
];
