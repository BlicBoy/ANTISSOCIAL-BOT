const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js")
const { getCredits, giveCreditsWin, removeChipsBet } = require('./credits')
const { closeChannels, deleteChannel } = require('./createChannel')
const { deleteMessage } = require('./other')


let optionBet = null

const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
const greenNumber = [0]
const valueWinNumber = 35 

async function createMessage(channel, name_user, credits) {
		const messageBet = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('Roulette Game')
		.setURL('https://github.com/BlicBoy/ANTISSOCIAL-BOT/tree/roulette')
		.setAuthor({ name: 'Anti$ocial', iconURL: 'https://i.imgur.com/YQQvs4J.jpeg', url: 'https://github.com/BlicBoy/ANTISSOCIAL-BOT' })
		.setDescription(`Place your bet @${name_user} the game of roulette is very simple you can bet on red, black and green or on the numbers.`)
		.setThumbnail('https://i.imgur.com/YQQvs4J.jpeg')
		.addFields(
			{ name: `You have ${credits} chips`, value: `\n` },
		)
		.setImage('https://i.makeagif.com/media/11-22-2017/gXYMAo.gif')
		.setTimestamp()
		.setFooter({ text: 'Anti$$ocial - BOT', iconURL: 'https://i.imgur.com/YQQvs4J.jpeg' });

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

		
	const green = new ButtonBuilder()
		.setLabel('GREEN - 🟢')
		.setStyle(ButtonStyle.Primary)
		.setCustomId('green-button')

	const number = new ButtonBuilder()
		.setLabel('Number - 🔢')
		.setStyle(ButtonStyle.Primary)
		.setCustomId('number-button')

	const buttonRow = new ActionRowBuilder().addComponents(red, black, green, number, closeGame)

	return await channel.send({ embeds: [messageBet], components: [buttonRow] })
}

async function messageBet(channel, interaction) {
	let info = await getCredits(interaction.user.id)
	const reply = await createMessage(channel, interaction.user.username, info.credits);
	const filter = (i) => i.user.id === interaction.user.id
	const collector = reply.createMessageComponentCollector({
		componentType: ComponentType.Button,
		filter
	})

	collector.on('collect', async (interaction) => {
		switch (interaction.customId) {
			case 'close-button':
				await closeChannels(interaction.channelId, 'Player close the game', 'roullete', interaction.user.id, interaction, '/roulette', info.credits)
				await deleteChannel(interaction);
				break;
			case 'red-button':
				optionBet = 'red'
				await BetInOption('RED - 🔴',interaction)
				break;
			case 'black-button':
				optionBet = 'black'
				await BetInOption('BLACK - ⚫',interaction)
				break;
			case 'number-button':
				optionBet = 'number'
				await BetInOption('Number - 🔢',interaction)
				break;
			case 'green-button':
					optionBet = 'green'
					await BetInOption('GREEN - 🟢',interaction)
					break;
			default:
				break;
		}
	})
}

async function BetInOption(option, interaction) {
	const modal = new ModalBuilder()
		.setCustomId(`${interaction.user.id}_roulette`)
		.setTitle(option);
	if (optionBet == 'number') {
		const chips = new TextInputBuilder()
		.setCustomId('chips')
		.setLabel("How much do you want to bet?")
		.setStyle(TextInputStyle.Short);

		const number = new TextInputBuilder()
		.setCustomId('number')
		.setLabel("Your number")
		.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const chipsrow = new ActionRowBuilder().addComponents(chips);
		const numberRow = new ActionRowBuilder().addComponents(number);

		// Add inputs to the modal
		modal.addComponents(numberRow, chipsrow);

	} else {
		const chips = new TextInputBuilder()
		.setCustomId('chips')
		.setLabel("How much do you want to bet?")
		.setStyle(TextInputStyle.Short);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(chips);

		// Add inputs to the modal
		modal.addComponents(firstActionRow);
	}

	await interaction.showModal(modal)
}


async function confirmBet(interaction) {
	const channel = interaction.guild.channels.cache.get(interaction.channelId)
	await deleteMessage(interaction)
	await new Promise(resolve => setTimeout(resolve, 1000));
	var chips = interaction.fields.getTextInputValue('chips')
	interaction.reply({content: `Confirming your bet...`});
	await new Promise(resolve => setTimeout(resolve, 1000));
	var info = await getCredits(interaction.user.id)
	if(info.credits < chips){
		channel.send({content: `You don't have credits for that bet! Try again!`});
		channel.send({content: `You only have ${info.credits} credits. Your bet was ${chips} credits.`});
		await new Promise(resolve => setTimeout(resolve, 1000));
		messageBet(channel, interaction)
		return
	} 

	if(optionBet == 'number'){
		var yourNumber = interaction.fields.getTextInputValue('number')
		if(yourNumber <= 0 || yourNumber > 35){
			channel.send({content: `This number is not valid! Try again!`});
			await new Promise(resolve => setTimeout(resolve, 1000));
			messageBet(channel, interaction)
			return
		}
	}
		const retry = new ButtonBuilder()
		.setLabel('Retry - 🔁')
		.setStyle(ButtonStyle.Danger)
		.setCustomId('retry-button')

		const roll = new ButtonBuilder()
			.setLabel('YES - 🎰')
			.setStyle(ButtonStyle.Primary)
			.setCustomId('confirm-button')

		const retrycomponent = new ActionRowBuilder().addComponents(retry)
		const rollcomponent = new ActionRowBuilder().addComponents(roll)

		const reply = optionBet == 'number' ?  await channel.send({content: `Confirm your bet! ${chips} chips on number ${yourNumber}`, components: [retrycomponent, rollcomponent]}) 
		: await channel.send({content: `Confirm your bet! ${chips} chips on color ${optionBet}`, components: [retrycomponent, rollcomponent]});
		const filter = (i) => i.user.id === interaction.user.id
		const collector = reply.createMessageComponentCollector({
			componentType: ComponentType.Button,
			filter
		})

		collector.on('collect', async (interaction) => {
			if(interaction.customId == 'confirm-button'){
				await interaction.reply({ content: `🎰 Bet confirmed 🎰`, ephemeral: false})
				await removeChipsBet(interaction, chips)
				await RollWhell(channel)
				await new Promise(resolve => setTimeout(resolve, 3000));
				var resultGame = await game()
				await channel.send(`The number is ${resultGame.number}, color ${resultGame.color}`)

				if(resultGame.number == yourNumber || resultGame.color == optionBet){
					var creditPlayer = 0
					if(optionBet == 'number'){
						creditPlayer = chips * valueWinNumber
					}else if(optionBet == 'green'){
						creditPlayer = chips * 14
					}else{
						creditPlayer = chips * 2
					}
			
					await giveCreditsWin(interaction, creditPlayer)
					await MessagewinningBet(channel, creditPlayer)
					await messageBet(channel, interaction)
				}else{
					await MessageLost(channel, chips)
					let info = await getCredits(interaction.user.id)
					if(info.credits == 0){
						await channel.send(`⚠️ You don't have chips ⚠️`)
						await channel.send(`⚠️ Closing room in 5 seconds ⚠️`)
						await new Promise(resolve => setTimeout(resolve, 5000));
						await closeChannels(interaction.channelId, 'Player dont have chips', 'roullete', interaction.user.id, interaction, '/roulette', info.credits)
						await deleteChannel(interaction);
					}else{
						await messageBet(channel, interaction)
					}
				}
			}else if(interaction.customId == 'retry-button'){
				console.log('CANCEL BET')
				await deleteMessage(interaction)
				messageBet(channel, interaction)
			}
		})
	
	
}

async function game() {
	const result = Math.floor(Math.random() * 37) // generate number 0 to 36

	let resultColor = '';
	if (redNumbers.includes(result)) {
		 resultColor = 'red';
	} else if (blackNumbers.includes(result)) {
		 resultColor = 'black';
	} else {
		 resultColor = 'green';
	}

	return{
		number: result,
		color: resultColor
	}
}

async function MessagewinningBet(channel, credits) {
	await channel.send(`💵 You get ${credits} credits! 💵`)
}
async function MessageLost(channel, credits){
	await channel.send(`😥 You lost ${credits} credits! 😥`)
}

async function RollWhell(channel) {
	await channel.send(`Rolling...`)
	await channel.send(`https://i.makeagif.com/media/11-22-2017/gXYMAo.gif`)
}

module.exports = { messageBet, confirmBet, createMessage }