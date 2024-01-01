const { EmbedBuilder } = require("discord.js")
const {getCredits } = require('./credits')

async function messageBet(channel, interaction) {

	let info = await getCredits(interaction.user.id)

	const messageBet = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Roulette Game')
	.setURL('https://github.com/BlicBoy/ANTISSOCIAL-BOT/tree/roulette')
	.setAuthor({ name: 'Anti$$ocial', iconURL: 'https://i.imgur.com/cwYlwJp.jpg', url: 'https://github.com/BlicBoy/ANTISSOCIAL-BOT' })
	.setDescription(`Place your bet ${interaction.user} the game of roulette is very simple you can bet on red, black and green or on the numbers.`)
	.setThumbnail('https://i.imgur.com/cwYlwJp.jpg')
	.addFields(
		{ name: `You have ${info.credits} chips`, value: `\n` },
		{ name: '\\\\red', value: 'Some value here', inline: true },
  		{ name: '\\\\black', value: 'Some value here', inline: true },
  		{ name: '\\\\green', value: 'Some value here', inline: true },
  		{ name: '\\\\number', value: 'Some value here', inline: true },
	)
	.setImage('https://i.makeagif.com/media/11-22-2017/gXYMAo.gif')
	.setTimestamp()
	.setFooter({ text: 'Anti$$ocial - BOT', iconURL: 'https://i.imgur.com/cwYlwJp.jpg' });



     await channel.send({ embeds : [messageBet] })
}

exports.messageBet = messageBet