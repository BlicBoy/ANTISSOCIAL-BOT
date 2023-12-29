/** 
 * 
 * Blackjack game
 * 
*/

const { SlashCommandBuilder } = require("discord.js")
const { createChannels } = require("./helpers/createChannel")
const { dateFormater } = require("./helpers/other")


module.exports = {
  cooldown: 60, //seconds
  data:  new SlashCommandBuilder()
        .setName("blackjack")
        .setDescription("Casino game - BlackJack 🃏"),
  async execute(interaction){
    var nameUser = interaction.member.user.username
    let date = dateFormater()
    await createChannels('blackjack', nameUser, date)
    await interaction.reply("pong")
  }
}
