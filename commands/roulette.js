/**
 * 
 * Roulette
 * 
 */

const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("roullete")
        .setDescription("Casino game - Roulette 🎡"),
  async execute(interaction){
      await interaction.reply("pong")
  }
}
