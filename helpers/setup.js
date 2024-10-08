const { ActivityType } = require('discord.js')
const UserCredits = require('../models/user-credits')
const GameResumes = require('../models/game-resumes')
const { verifyOpenRooms } = require('./manageRooms');
const { log } = require('../utils/winston');
const { confirmBet } = require('./initGameRoulette');

//Login bot
let status = [
    {
      name: '💲ANTI$$OCIAL',
      type: ActivityType.Streaming,
      url: 'https://www.youtube.com/watch?v=lKgIaH45ijc&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲AO TEU LADO',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=zyQLxBiPqc4&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲NÃO OS VEJO',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=vcXu21yTmIc&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲DIAMANTE',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=gO94m7bBNSc&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲UH LA LA LA',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=M4sg_9vwLTg&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲PIÑA COLADA',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=ZcmgI-R-9W0&ab_channel=FiltrPortugal',
    },
  ];

async function setupBot(client, readyClient) {
    UserCredits.sync()
    GameResumes.sync()
    log.info(`✅ ${readyClient.user.tag} is online.`);
    await verifyOpenRooms(client)
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
      }, 10000);
}

async function manageModals(interaction) {
    try {
        if (interaction.isModalSubmit() && interaction.fields.getTextInputValue('chips') != null) {
            await confirmBet(interaction)
        }
        // else { for future
        //     console.log(interaction)
        // }
        if (!interaction.isChatInputCommand()) return
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return
        await command.execute(interaction)
    } catch (error) {
        log.error(error)
        await interaction.reply('Error commad')
    }
}

module.exports = { setupBot , manageModals }