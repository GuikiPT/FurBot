// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const fs = require('fs');
const colors = require('colors/safe');

/**
     * @param {Discord.Client} client
     */
module.exports = async function(client) {
	const commandFolders = fs.readdirSync(__dirname + '/../commands/slashs/');

	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(__dirname + `/../commands/slashs/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			try {
				const command = require(__dirname + `/../commands/slashs/${folder}/${file}`);
				client.SlashCommands.set(command.data.name, command);
			}
			catch (err) {
				console.error(colors.red(err.stack || err));
			}
		}
	}
};