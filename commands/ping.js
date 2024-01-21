const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ComponentType } = require("discord.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("testing")
    .setDescription("teste comando"),
  async execute(interaction) {
  
      const modal = new ModalBuilder()
      .setCustomId('myModal')
      .setTitle('BET IN');
    
      // Create the text input components
      const chips = new TextInputBuilder()
        .setCustomId('chips')
        .setLabel("How much do you want to bet?")
        .setStyle(TextInputStyle.Short);
    
      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(chips);
    
      // Add inputs to the modal
      modal.addComponents(firstActionRow);

      await interaction.showModal(modal);
      
  },
}

/* 
⚠️THIS IS JUST A TEST COMMAND, WHEN YOU PUT THE BOT ON YOUR SERVER YOU CAN USE IT TO SEE IF EVERYTHING IS WORKING ⚠️
  
data: SlashCommandBuilder {
  options: [],
  name: 'ping',
  name_localizations: undefined,
  description: 'Bot say pong',
  description_localizations: undefined,
  default_permission: undefined,
  default_member_permissions: undefined,
  dm_permission: undefined,
  nsfw: undefined
},
execute: [AsyncFunction: execute]
  
*/

