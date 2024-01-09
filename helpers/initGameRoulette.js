const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, Message } = require("discord.js")
const {getCredits } = require('./credits')
const {closeChannels} = require('./createChannel')

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
	)
	.setImage('https://i.makeagif.com/media/11-22-2017/gXYMAo.gif')
	.setTimestamp()
	.setFooter({ text: 'Anti$$ocial - BOT', iconURL: 'https://i.imgur.com/cwYlwJp.jpg' });
	
	const closeGame = new ButtonBuilder()
	.setLabel('Close Game')
	.setStyle(ButtonStyle.Danger)
	.setCustomId('close-button')

	const red = new ButtonBuilder()
	.setLabel('RED - 🔴')
	.setStyle(ButtonStyle.Primary)
	.setCustomId('red-button')

	const black = new ButtonBuilder()
	.setLabel('BLACK - ⚫')
	.setStyle(ButtonStyle.Primary)
	.setCustomId('black-button')

	const number = new ButtonBuilder()
	.setLabel('Number - 🔢')
	.setStyle(ButtonStyle.Primary)
	.setCustomId('number-button')
	
	const buttonRow = new ActionRowBuilder().addComponents(red, black,number, closeGame)

     const reply = await channel.send({ embeds : [messageBet], components: [buttonRow] })
	 
	 const filter = (i) => i.user.id === interaction.user.id

	 const collector = reply.createMessageComponentCollector({
		componentType: ComponentType.Button,
		filter
	 })

	 collector.on('collect',async (interaction) =>{
		if(interaction.customId == 'close-button'){	
			await closeChannels(interaction.channelId, 'Player close the game', 'roullete', interaction.user.id)
			const fetchedChannel = interaction.guild.channels.cache.get(interaction.channelId);
			fetchedChannel.delete();
		}
	 })
}

exports.messageBet = messageBet