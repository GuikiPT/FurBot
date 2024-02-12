const Discord = require('discord.js');
const colors = require('colors/safe');

const MessageCreateFunctions = require('../../functions/MessageCreate');

module.exports = {
	name: Discord.Events.MessageCreate,
	once: false,
	/**
        * @param {Discord.Message} message
    */
	async execute(message) {
		try {
			await MessageCreateFunctions.messageFirstHastag(message);
		}
		catch (error) {
			console.error(colors.red(error.stack || error));
		}
	},
};
