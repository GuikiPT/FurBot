const Discord = require('discord.js');
const colors = require('colors/safe');

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('ping')
		.setDescription('Mostra o ping/latência atual do bot.'),
	/**
     * @param {Discord.Interaction} interaction
     */
	async execute(interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });

			const interactionReply = await interaction.fetchReply();

			const ping = interactionReply.createdTimestamp - interaction.createdTimestamp;

			const pingEmbed = new Discord.EmbedBuilder()
				.setColor('Grey')
				.setTitle('🏓 Pong!')
				.setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: false, size: 1024, format: 'png' }))
				.addFields(
					{ name: 'Bot Latency', value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true },
					{ name: 'API Latency', value: `\`\`\`ini\n[ ${Math.round(interaction.client.ws.ping)}ms ]\n\`\`\``, inline: true },
				);

			interaction.editReply({ embeds: [pingEmbed] });
		}
		catch (error) {
			console.error(colors.red(error.stack || error));
		}
	},
};