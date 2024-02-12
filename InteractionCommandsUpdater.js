const Discord = require('discord.js');
const fs = require('node:fs');
const colors = require('colors/safe');

require('dotenv').config();

try {
	const DiscordBotToken = process.env.DiscordBotToken;
	const DiscordBotClientId = process.env.DiscordBotClientId;
	const DiscordBotGuildID = process.env.DiscordBotGuildID;
	if (!DiscordBotToken) {
		console.error(colors.red('Discord Bot Token is not defined or passed incorrectly! Please check your .env file and try again.\n'));
		process.exit();
	}
	if (!DiscordBotClientId) {
		console.error(colors.red('Discord Bot Client Id is not defined or passed incorrectly! Please check your .env file and try again.\n'));
		process.exit();
	}
	if (!DiscordBotGuildID) {
		console.error(colors.red('Discord Bot Guild Id is not defined or passed incorrectly! Please check your .env file and try again.\n'));
		process.exit();
	}

	const commands = [];

	const commandFolders = fs.readdirSync(__dirname + '/commands/slashs/');

	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(__dirname + `/commands/slashs/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			try {
				const command = require(__dirname + `/commands/slashs/${folder}/${file}`);
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
				}
				else {
					console.log(`[WARNING] The command at ${__dirname + `/commands/slashs/${folder}/${file}`} is missing a required "data" or "execute" property.`);
				}
			}
			catch (err) {
				console.error(colors.red(err.stack || err));
			}
		}
	}


	const rest = new Discord.REST().setToken(DiscordBotToken);
	(async () => {
		try {
			console.log(`Started refreshing ${commands.length} application (/) commands.`);
			const data = await rest.put(
				Discord.Routes.applicationGuildCommands(DiscordBotClientId, DiscordBotGuildID),
				{ body: commands },
			);
			console.log(`Successfully reloaded ${data.length} application (/) commands.`);
		}
		catch (error) {
			console.error(error);
		}
	})();
}
catch (error) {
	console.error(colors.red(error.stack || error));
}

