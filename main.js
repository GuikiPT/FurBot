const Discord = require('discord.js');
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

client.once(Discord.Events.ClientReady, async (clientReady) => {
	console.log('Ready as ' + clientReady.user.username);
});

client.login(process.env.DiscordBotToken);