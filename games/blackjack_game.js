const { createChannels, closeChannels, deleteChannel } = require("../helpers/createChannel");
const { giveFirstCredits, getCredits } = require("../helpers/credits");
const { checkRoom } = require("../helpers/manageRooms");
const { dateFormater, deleteMessage } = require("../helpers/other");
const { log } = require("../utils/winston");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require("discord.js")

const cardValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11
};
let deck = [];
let playerHand = [];
let dealerHand = [];


//Stupid Logic to generate deck and images

/**
 * Generate random deck
 * @returns 
 */
async function generateDeck() {
    const suits = ['♠️', '♥️', '♣️', '♦️'];
    for (let suit of suits) {
        for (let card in cardValues) {
            deck.push(`${card}${suit}`);
        }
    }
    deck.sort(() => Math.random() - 0.5);
}

function calculateHand(hand) {
    let value = 0;
    let aceCount = 0;
    for (let card of hand) {
        let cardValue = card.slice(0, -1);
        value += cardValues[cardValue];
        if (cardValue === 'A') aceCount++;
    }
    while (value > 21 && aceCount) {
        value -= 10;
        aceCount--;
    }
    return value;
}

function drawCard(deck, hand) {
    hand.push(deck.pop());
}

function drawAsciiCard(card) {
    let rank = card.slice(0, -1);
    let suit = card.slice(-1);
    return `
    +-----+
    |${rank.padEnd(2)}   |
    |  ${suit}  |
    |   ${rank.padStart(2)}|
    +-----+`;
}

//Game logic

/**
 * Init game blackjack
 * @param {*} interaction 
 */
async function initGame(interaction) {
    try {
        haveGame = await checkRoom(interaction, 'blackjack');
        if(!haveGame) {
            await giveFirstCredits(interaction)
            var nameUser = interaction.user.username
            var date = dateFormater()
            let dataCredits = await getCredits(interaction.user.id)
            if(dataCredits.credits > 0) {
                let channel = await createChannels(interaction, 'blackjack', nameUser, date, '🃏', dataCredits.credits)
                if(channel != null) {
                    await messageBet(channel, interaction, dataCredits.credits);
                    await interaction.reply({ content: `🌕 Check out this channel ${channel} to start playing 🃏`, ephemeral: true })
                } else {
                    await interaction.reply({ content: `⚠️ Oops, something didn't work. Try again later or contact support. ⚠️`, ephemeral: true })
                    log.error('Error create channel blackjack.')
                }
            } else {
                await interaction.reply({ content: `⚠️ You don't have chips ⚠️`, ephemeral: true })
            }
        }
    } catch (error) {
        log.error('Error: Init game blackjack - ' + error)
    }
}

async function messageBet(channel, interaction, credits) {
    await generateDeck();
    const triggers = await createMessage(channel, interaction, credits);
    const filter = (i) => i.user.id === interaction.user.id
	const collector = triggers.createMessageComponentCollector({
		componentType: ComponentType.Button,
		filter
	});

    collector.on('collect', async (interaction) => {
		switch (interaction.customId) {
			case 'close-button':
				await closeChannels(interaction.channelId, 'Player close the game', 'blackjack', interaction.user.id, interaction, '/blackjack', credits)
				await deleteChannel(interaction);
				break;
			case 'play-button':
				await playGame(channel, interaction)
				break;
		}
	});
}


async function createMessage(channel, interaction, credits) {
        const messageBet = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('BlackJack Game')
        .setAuthor({ name: 'Anti$ocial', iconURL: 'https://i.imgur.com/YQQvs4J.jpeg', url: 'https://github.com/BlicBoy/ANTISSOCIAL-BOT' })
        .setDescription(`Place your bet @${interaction.user.username} the game of BlackJack`)
        .setThumbnail('https://i.imgur.com/YQQvs4J.jpeg')
        .addFields(
            { name: `You have ${credits} chips`, value: `\n` },
        )
        .setImage('https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmtyN2lqdGV1NGlxaHgzeGpxMGNhM3BzbHliMGUwb3Bkc3gyd3h0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Sq2mPVJr4tfk436/giphy.gif')
        .setTimestamp()
        .setFooter({ text: 'Anti$$ocial - BOT', iconURL: 'https://i.imgur.com/YQQvs4J.jpeg' });

    const closeGame = new ButtonBuilder()
        .setLabel('Close Game')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('close-button')

    const go = new ButtonBuilder()
        .setLabel('PLAY - 🃏')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('play-button')

    const buttonRow = new ActionRowBuilder().addComponents(go, closeGame)

    return await channel.send({ embeds: [messageBet], components: [buttonRow] })
}


async function playGame(channel, interaction) {
    await deleteMessage(interaction);
    drawCard(deck, playerHand)
    drawCard(deck, dealerHand);
    drawCard(deck, playerHand);
    drawCard(deck, dealerHand);

    channel.send({content: `**Your hand:**\n${playerHand.map(drawAsciiCard).join('\t')}\n**Dealer's hand:**\n${drawAsciiCard(dealerHand[0])}\n\nType \`!hit\` to draw a card or \`!stand\` to hold your hand.`});
}


module.exports = { initGame }