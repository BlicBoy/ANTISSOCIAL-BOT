const { SlashCommandBuilder } = require("discord.js")
const { getCredits } = require ("../helpers/credits")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("chips")
        .setDescription("Your chips💲"),
  async execute(interaction){
    try {
      let chips = await getCredits(interaction.user.id)
      if(chips){
        await interaction.reply({ content: `You have ${chips.credits} chips.💲`, ephemeral: true})
      }else{
        await interaction.reply({ content: `🎰 You've never played casino games! 🎰`, ephemeral: true})
      }
      
    } catch (error) {
        console.error(error)
    }
      
  }
}



