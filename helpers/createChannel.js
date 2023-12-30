const { ChannelType, PermissionsBitField  } = require("discord.js",);
/**
 * Create channel text name
 * @param {*} gameName 
 * @param {*} userName 
 * @param {*} date 
 */
async function createChannels(interaction,gameName, userName, date, emoji) {
    try {
        var name =  emoji + gameName + '-' + userName + '-' + date
        var channel = await interaction.guild.channels.create({
            name: name, 
            type: ChannelType.GuildText, 
            permissionOverwrites: [
              {
                  id: interaction.user.id,
                  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
              },
              {
                  id: interaction.guild.id,
                  deny: [PermissionsBitField.Flags.ViewChannel], 
              },
          ],
          });
        await callPlayer(channel, interaction.user, gameName)
        return channel

      } catch (error) {
        console.log(error);
        return
      }
}

async function callPlayer(channel, user, game) {
   await channel.send(`Hello ${user} , let's start playing ${game}!`)
}

exports.createChannels = createChannels;

