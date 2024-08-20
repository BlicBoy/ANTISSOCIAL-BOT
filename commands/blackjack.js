const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ComponentType } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Casino game - BlackJack 🃏"),
  async execute(interaction) {
      console.log(interaction)
  },
}