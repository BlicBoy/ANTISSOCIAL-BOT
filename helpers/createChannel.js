const { ChannelType, PermissionsBitField  } = require("discord.js",);
const { dateFormater, openActivityGame, checktActivity } = require("./other")
const GameResumes = require("../models/game-resumes")


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
        console.log(error);
        return
      }
}

async function closeChannels(idroom, reason, gameName, id_player){
  
  try {
    if(idroom == 0){
      await GameResumes.update( { reason_close: reason, finish_date: dateFormater() }, { where: { id_player: id_player, game: gameName, reason_close: null} });
      console.log('Close Room Force')
    }else{
      await GameResumes.update({ reason_close: reason, finish_date: dateFormater() }, { where: { id_player: id_player, reason_close: null, channel: idroom, game: gameName}});
      console.log('Close Room Not force')
    }
   
  } catch (error) {
    console.error('Error close channel '+ error)
  }
 
}

exports.createChannels = createChannels;
exports.closeChannels = closeChannels

