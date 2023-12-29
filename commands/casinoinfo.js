/**
 * 
 * All information about casino games
 * it´s not a real casino
 * 
 * 
 */
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("info-casino")
        .setDescription("Information about casino games 🎰"),
  async execute(interaction){
    const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Casino Games')
	.setURL('https://github.com/BlicBoy/ANTISSOCIAL-BO')
	.setAuthor({ name: 'Anti$$ocial', iconURL: 'https://i.imgur.com/cwYlwJp.jpg', url: 'https://discord.js.org' })
	.setDescription("Every time you start playing you'll be given 100 casino chips and every 10 days you'll receive 100 more.All implemented games are obliged to follow the rules of the original casino games. So all the games work on the basis of random numbers. Whenever you start a game, a discord room will be created in which you can play the games you have chosen. Whenever you want to stop, you can stop and the chips you win will stay with them.")
	.setThumbnail('https://i.imgur.com/cwYlwJp.jpg')
	.setTimestamp()
	.setFooter({ text: 'Anti$$ocial - BOT', iconURL: 'https://i.imgur.com/cwYlwJp.jpg' });

    await interaction.reply({ embeds: [exampleEmbed] });
  }
}

