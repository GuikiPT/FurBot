const Discord = require('discord.js');
const colors = require('colors/safe');
const moment = require('moment');

require('better-logging')(console, {
	format: (ctx) => `${ctx.time} ${ctx.date} ${ctx.type} >>> ${ctx.msg}`,
	color: {
		base: colors.gray,
		type: {
			debug: colors.green,
			info: colors.white,
			log: colors.gray,
			error: colors.red,
			warn: colors.yellow,
		},
	},
	saveToFile: `./logs/${moment().format('YYYY')}/${moment().format('MM')}/${moment().format('DD')}.log`,
});
require('dotenv').config();

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.AutoModerationConfiguration,
		Discord.GatewayIntentBits.AutoModerationConfiguration,
		Discord.GatewayIntentBits.DirectMessageReactions,
		Discord.GatewayIntentBits.DirectMessageTyping,
		Discord.GatewayIntentBits.DirectMessages,
		Discord.GatewayIntentBits.GuildEmojisAndStickers,
		Discord.GatewayIntentBits.GuildIntegrations,
		Discord.GatewayIntentBits.GuildInvites,
		Discord.GatewayIntentBits.GuildMembers,
		Discord.GatewayIntentBits.GuildMessageReactions,
		Discord.GatewayIntentBits.GuildMessageTyping,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildModeration,
		Discord.GatewayIntentBits.GuildPresences,
		Discord.GatewayIntentBits.GuildScheduledEvents,
		Discord.GatewayIntentBits.GuildVoiceStates,
		Discord.GatewayIntentBits.GuildWebhooks,
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.MessageContent,
	],
	partials: [
		Discord.Partials.Channel,
		Discord.Partials.GuildMember,
		Discord.Partials.GuildScheduledEvent,
		Discord.Partials.Message,
		Discord.Partials.Reaction,
		Discord.Partials.ThreadMember,
		Discord.Partials.User,
	],
});
client.SlashCommands = new Discord.Collection();

(async () => {
	try {
		const DiscordBotToken = process.env.DiscordBotToken;
		if (!DiscordBotToken) {
			console.error(colors.red('Discord Bot Token is not defined or passed incorrectly! Please check your .env file and try again.\n'));
			process.exit();
		}

		const handlers = ['events', 'interactionCommands'];
		for (const handler of handlers) {
			await require('./handlers/' + handler)(client);
		}

		await client.login(DiscordBotToken);
	}
	catch (error) {
		console.error(colors.red(error.stack || error));
	}
})();