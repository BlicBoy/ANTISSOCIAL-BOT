const { ChannelType, PermissionsBitField  } = require("discord.js",);
const { dateFormater, openActivityGame } = require("./other")

/**
 * Create channel text name
 * @param {*} gameName 
 * @param {*} userName 
 * @param {*} date 
 */
async function createChannels(interaction,gameName, userName, date, emoji, credits) {
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
        await openActivityGame(channel,interaction,credits,dateFormater(),gameName)
        return channel

      } catch (error) {
        console.log(error);
        return
      }
}

exports.createChannels = createChannels;

