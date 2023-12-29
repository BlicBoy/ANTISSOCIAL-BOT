const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder   } = require("discord.js")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("coffee")
        .setDescription("Buy me coffe ☕"),
    async execute(interaction) {
        const button = new ButtonBuilder()
            .setLabel('Buy me Coffee ☕')
            .setURL('https://www.buymeacoffee.com/blicboy')
            .setStyle(ButtonStyle.Link);

            const rowcomponent = new ActionRowBuilder() 
            .addComponents(button)

        interaction.reply({
            content: 'Support my creators, buy them a coffee ☕',
            components: [rowcomponent] // Adiciona o botão à resposta
        });
    }
}
