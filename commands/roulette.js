/**
 * 
 * Roulette
 * 
 */

const { SlashCommandBuilder } = require("discord.js")
const { createChannels } = require("../helpers/createChannel")
const { dateFormater } = require("../helpers/other")
const { giveFirstCredits, getCredits } = require("../helpers/credits")
const { messageBet } = require("../helpers/initGameRoulette")
const { log } = require("../utils/winston")
const { checkRoom } = require("../helpers/manageRooms")

var timeout = []

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roullete")
    .setDescription("Casino game - Roulette 🎡")
    .setDMPermission(false),
  async execute(interaction) {
    if (timeout.includes(interaction.user.id)) {
      log.info(`User ${interaction.user.username} está a spammar o bot`)
      await interaction.reply({ content: ' 🛑 You are on cooldown, try again in 1 minute 🛑', ephemeral: true })
      return
    }
    await initGame(interaction)

    timeout.push(interaction.user.id)
    setTimeout(() => {
      timeout.shift()
    }, 60000)
  }
}

async function initGame(interaction) {

  try {
    haveGame = await checkRoom(interaction, 'roullete')

    if (!haveGame) {
      await giveFirstCredits(interaction)
      var nameUser = interaction.user.username
      let date = dateFormater()
      let credits = await getCredits(interaction.user.id)
      if (credits.credits > 0) {
        let channel = await createChannels(interaction, 'roullete', nameUser, date, '🎡', credits.credits)
        if (channel != null) {
          await messageBet(channel, interaction)
          await interaction.reply({ content: `🎡 Check out this channel ${channel} to start playing 🎡`, ephemeral: true })
        } else {
          await interaction.reply({ content: `⚠️ Oops, something didn't work. Try again later or contact support. ⚠️`, ephemeral: true })
        }
      } else {
        await interaction.reply({ content: `⚠️ You don't have chips ⚠️`, ephemeral: true })
      }
    }
  } catch (error) {
    log.error('CREATE ROOM: '+ error)
  }

}

