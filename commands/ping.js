const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Bot say pong"),
  async execute(interaction){
      await interaction.reply("pong")
  }
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

