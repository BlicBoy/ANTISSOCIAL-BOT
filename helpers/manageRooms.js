const GameResumes = require('../models/game-resumes');
const { log } = require('../utils/winston');
const { closeChannels } = require('./createChannel');
const { sendDMBot, checktActivity } = require('./other');
const { messageBet } = require('./initGameRoulette')

async function verifyOpenRooms(client) {
    try {
        let data = await GameResumes.findAll({ where: { finish_date: null, reason_close: null } });

        // Process each element by extracting dataValues
        if (Array.isArray(data)) {
            data.forEach(async element => {
                const { guildId, channel, game, id_player } = element.dataValues;
                const guild = client.guilds.cache.get(guildId); // Access the guild using guildId
                if (guild) {
                    const channelObj = guild.channels.cache.get(channel); // Access the channel using channelId
                    if (!channelObj) {
                        await closeChannels(0, 'Channel not found', game, id_player, client, '/' + game, 0);
                    } else {
                        log.info('Channel found delete channel');
                        await closeChannels(0, 'Channel found and deleted', game, id_player, client, '/' + game, 0);
                        channelObj.delete();
                        await sendDMBot(client, id_player, `🎡Your session has been closed! You can always play again just do /${game} in ${guild.name}!🎡`);
                    }
                } else {
                    log.info(`Guild not found for guildId: ${guildId}`);
                }
            });
        } else {
            log.info('Data is not an array');
        }
    } catch (error) {
        log.error('Error verifying open rooms:', error);
    }
}

/**
 * CHECK IF EXIST ROOM
 * @returns 
 */
async function checkRoom(interaction, game) {
    try {
      let activity = await checktActivity(interaction, game)
      if (activity == null) {
        return false //Dont have room
      } else {
        const channel = interaction.guild.channels.cache.get(activity.channel);
        if (channel) {
          await interaction.reply({ content: `🌕 Check out this channel ${channel} to continue playing 🤑`, ephemeral: true })
          await messageBet(channel, interaction)
          return true //User have activity dont create room
        } else {
          let data = await getCredits(activity.id_player)
          await closeChannels(0, 'Force Close - ' + dateFormater(), game,activity.id_player,interaction, `/${game}`, data.credits)
          return false //Room have problem create another
        }
      }
    } catch (error) {
      await closeChannels(0, 'ERROR TO VERIFY ROOM', 'roullete',activity.id_player,interaction, `/${game}`, null)
      log.error('VERIFY ROOM: '+error)
      return false; //Room have problem create another
    }
  }

module.exports = { verifyOpenRooms , checkRoom }