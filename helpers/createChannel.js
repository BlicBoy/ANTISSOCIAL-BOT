const { ChannelType, PermissionsBitField  } = require("discord.js",);
const { dateFormater, openActivityGame, sendDM } = require("./other")
const GameResumes = require("../models/game-resumes");
const { log } = require("../utils/winston");


/**
 * Create channel text name
 * @param {*} gameName 
 * @param {*} userName 
 * @param {*} date 
 */
async function createChannels(interaction,gameName, userName, date, emoji, credits) {
    try {
        var name =  emoji + gameName
        var channel = await interaction.guild.channels.create({
            name: name, 
            type: ChannelType.GuildText, 
            permissionOverwrites: [
              {
                  id: interaction.user.id,
                  allow: [PermissionsBitField.Flags.ViewChannel],
                  deny: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.CreateInstantInvite]
              },
              {
                  id: interaction.guild.id,
                  deny: [PermissionsBitField.Flags.ViewChannel], 
              },
          ],
          });
        await openActivityGame(channel,interaction,credits,dateFormater(),gameName,interaction.guild.id)
        return channel

      } catch (error) {
        log.error(error);
        return
      }
}

async function closeChannels(idroom, reason, gameName, id_player,interaction, game_command, credits) {
  try {
    if(idroom == 0){
      await GameResumes.update( { reason_close: reason, finish_date: dateFormater(), current_balance: credits }, { where: { id_player: id_player, game: gameName, reason_close: null} });
      log.info('Close Room Force id_player ' + id_player);
    }else{
      await GameResumes.update({ reason_close: reason, finish_date: dateFormater(), current_balance: credits }, { where: { id_player: id_player, reason_close: null, channel: idroom, game: gameName}});
      await sendDM(interaction, `🎡Thanks for playing! You can always play again just do ${game_command} in ${interaction.guild.name}! You currently have ${credits} credits.🎡`);
      log.info('Close Room Not force');
    }  
  } catch (error) {
    log.error('Error close channel '+ error);
  } 
}

async function deleteChannel(interaction) {
  const fetchedChannel = interaction.guild.channels.cache.get(interaction.channelId);
	fetchedChannel.delete(); 
}

module.exports = { createChannels, closeChannels, deleteChannel }