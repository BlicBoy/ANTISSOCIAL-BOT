/** 
 * 
 * Blackjack game
 * 
*/

const { SlashCommandBuilder } = require("discord.js")
const { createChannels } = require("./helpers/createChannel")
const { dateFormater } = require("./helpers/other")

var timeout = []

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("blackjack")
        .setDescription("Casino game - BlackJack 🃏"),
  async execute(interaction){
    if(timeout.includes(interaction.user.id)){
      console.log(`User ${interaction.user.username} está a spammar o bot`)
      await interaction.reply({ content: ' 🛑 You are on cooldown, try again in 1 minute 🛑', ephemeral: true})
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
  var nameUser = interaction.user.username
  let date = dateFormater()
  let channel = await createChannels(interaction,'blackjack', nameUser, date,'🃏')
  if(channel != null){
    await interaction.reply({ content: `🃏 Check out this channel ${channel} to start playing 🃏`, ephemeral: true})
  }else{
    await interaction.reply({ content: `⚠️ Oops, something didn't work. Try again later or contact support. ⚠️`, ephemeral: true})
  }
}