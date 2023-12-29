const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("coffee")
        .setDescription("Buy me coffe ☕"),
  async execute(interaction){
        const button = new ButtonBuilder()
        .setLabel('Buy me Coffe ☕')
        .setURL('https://www.buymeacoffee.com/blicboy')
        .setStyle(ButtonStyle.Link);

        interaction.reply(button)
  }
}
