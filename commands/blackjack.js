const { SlashCommandBuilder } = require("discord.js")
const { cooldown } = require('../helpers/other')
const  { initGame } = require('../games/blackjack_game')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Casino game - BlackJack 🃏"),
  async execute(interaction) {
      let playerInCooldown = await cooldown(interaction);
      if (playerInCooldown) return
      await initGame(interaction)
  },
}