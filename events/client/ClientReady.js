const Discord = require('discord.js');
const colors = require('colors/safe');

module.exports = {
	name: Discord.Events.ClientReady,
	once: true,
	/**
     * @param {Discord.Client} client
     */
	async execute(client) {
		try {
			console.info('Ready as ' + client.user.username);

			await client.user.setPresence({
				activities: [
					{
						name: 'Walking Somehow',
						type: Discord.ActivityType.Watching,
					},
				],
				status: 'dnd',
			});
		}
		catch (error) {
			console.error(colors.red(error.stack || error));
		}
	},
};

