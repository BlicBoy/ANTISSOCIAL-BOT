/**
 * 
 * Roulette
 * 
 */

const { SlashCommandBuilder } = require("discord.js")
const { createChannels, closeChannels } = require("../helpers/createChannel")
const { dateFormater, checktActivity } = require("../helpers/other")
const { giveFirstCredits, getCredits } = require("../helpers/credits")
const { messageBet } = require("../helpers/initGameRoulette")

var timeout = []

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roullete")
    .setDescription("Casino game - Roulette 🎡")
    .setDMPermission(false),
  async execute(interaction) {
    if (timeout.includes(interaction.user.id)) {
      console.log(`User ${interaction.user.username} está a spammar o bot`)
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
    haveGame = await checkRoom(interaction)

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
    console.error('CREATE ROOM: '+ error)
  }

}

/**
 * CHECK IF EXIST ROOM
 * @returns 
 */
async function checkRoom(interaction) {
  try {
    let activity = await checktActivity(interaction, 'roullete')
    if (activity == null) {
      return false //Dont have room
    } else {
      const channel = interaction.guild.channels.cache.get(activity.channel);
      if (channel) {
        await interaction.reply({ content: `🎡 Check out this channel ${channel} to continue playing 🎡`, ephemeral: true })
        await messageBet(channel, interaction)
        return true //User have activity dont create room
      } else {
        await closeChannels(0, 'Force Close - ' + dateFormater(), 'roullete',activity.id_player,interaction)
        return false //Room have problem create another
      }
    }
  } catch (error) {
    await closeChannels(0, 'Force Close - ' + dateFormater(), 'roullete',activity.id_player,interaction)
    console.error('VERIFY ROOM: '+error)
    return false; //Room have problem create another
  }

}