const { SlashCommandBuilder } = require("discord.js")
const { giveCredits } = require ("../helpers/credits")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('give-chips')
        .setDescription('Give Chips')
        .addMentionableOption(option => 
        option.setName('user')
        .setDescription('Select @user')
        .setRequired(true)
        )
        .addNumberOption(
            option => option.setName('chips')
            .setDescription('Number Chips')
            .setRequired(true)
        ), 
    async execute(interaction) {
         await giveCredits(interaction)
    }
}