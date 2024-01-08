const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("close")
        .setDescription("Stop playing game"),
  async execute(interaction){
      console.log(interaction)
      await interaction.reply("pong")
  }
}