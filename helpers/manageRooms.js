const GameResumes = require('../models/game-resumes')
const { closeChannels } = require('./createChannel');
const { getCredits } = require('./credits');
const {createMessage} = require('./initGameRoulette')

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
                        console.log('Channel found');
                        sendMessageToChannel(channelObj, game, id_player);
                    }
                } else {
                    console.log(`Guild not found for guildId: ${guildId}`);
                }
            });
        } else {
            console.log('Data is not an array');
        }
    } catch (error) {
        console.error('Error verifying open rooms:', error);
    }
}

async function sendMessageToChannel (channel, game, id_player) {
    try {
        let data = await getCredits(id_player);
        switch (game) {
            case 'roullete':
                await createMessage(channel, data.name, data.credits);
                break;
        }
    } catch (error) {
        console.error('Error sending message to channel:', error);
    }
}

exports.verifyOpenRooms = verifyOpenRooms