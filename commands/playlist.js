const { SlashCommandBuilder } = require("discord.js")

module.exports = {
  data:  new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Playlist ANTI$$OCIAL Spotify"),
  async execute(interaction){
      await interaction.reply("https://open.spotify.com/intl-pt/album/3FIMB4lpk1qQnGhXx0aARf?si=f53iYUvRQp-fZMFxL-tk4g")
  }
}