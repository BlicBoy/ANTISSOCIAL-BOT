const { SlashCommandBuilder } = require("discord.js")
const { getCredits } = require ("../helpers/credits")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("chips")
        .setDescription("Your chips💲"),
  async execute(interaction){
      let chips = await getCredits(interaction.user.id)
      await interaction.reply({ content: `You have ${chips.credits} chips.💲`, ephemeral: true})
  }
}



