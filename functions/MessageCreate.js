const Discord = require('discord.js');
const colors = require('colors/safe');

module.exports = {
	/**
        * @param {Discord.Message} message
    */
	messageFirstHastag : async function(message) {
		if (message.author.bot || !message.content.startsWith('# ')) return;

		try {
			const member = await message.guild.members.fetch(message.author.id);

			if (!member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
				const notificationEmbed = new Discord.EmbedBuilder()
					.setColor('Yellow')
					.setTitle('Aviso!')
					.setDescription('Não permitimos envio de mensagens com `# <mensagem>` para evitar spam no chat!');

				try {
					await message.author.send({ embeds: [notificationEmbed] });
				}
				catch (error) {
					if (error.code === 50007) {
						console.error(colors.red('Cannot send DM to user - ' + message.author.id));
						const tempMessage = await message.channel.send({ content: `<@!${message.author.id}>`, embeds: [notificationEmbed] });
						setTimeout(() => tempMessage.delete(), 15000);
					}
					else {
						console.error(colors.red(`An error occurred: ${error}`));
					}
				}
				await message.delete();
			}
		}
		catch (error) {
			if (error.code === 10008) {
				console.warn('Attempted to delete a message that no longer exists.');
			}
			else {
				console.error(colors.red(`An error occurred: ${error.stack || error}`));
			}
		}
	},
};