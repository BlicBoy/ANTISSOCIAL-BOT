const GameResumes = require('../models/game-resumes');
const { log } = require('../utils/winston');

/**
 * Date formater
 * @returns 
 */
function dateFormater() {
    let date_ob = new Date();
    
    let dia = date_ob.getDate();
    let mes = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
    let ano = date_ob.getFullYear();
    let hora = ("0" + date_ob.getHours()).slice(-2);
    let minuto = ("0" + date_ob.getMinutes()).slice(-2);
    let dataFormatada = `${ano}${mes}${dia}T${hora}${minuto}`;

    return dataFormatada
}

/**
 * Save information game in database
 *  
 */
async function openActivityGame(channel, interaction, credits, initDate, game, guildId){
    try {
        let result = GameResumes.create({
                id_player: interaction.user.id,
                game: game,
                init_balance: credits,
                current_balance: credits,
                init_date: initDate,
                finish_date: null,
                channel: channel.id,
                reason_close: null,
                guildId: guildId
            }) 
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        log.error(error)
        return false
    }
   
}

async function checktActivity(interaction, nameGame) {
    try {
       result = await GameResumes.findOne({where: {id_player : interaction.user.id, finish_date: null, game: nameGame }})
       if(result) return result
       return null
    } catch (error) {
        log.error(error)
        return error
    }
}
async function deleteMessage(interaction){
    const channel = interaction.guild.channels.cache.get(interaction.channelId)
	const amount = 10;
	const messages = await channel.messages.fetch({ limit: amount + 1 });
	await channel.bulkDelete(messages);
}

async function sendDM(interaction, message){
    try {
        await interaction.user.send(message)
        return true
    } catch (error) {
        log.error(error)
        return false
    }
}

async function sendDMBot(client, userId, message){
    try {
        const user = await client.users.fetch(userId).catch(() => null);
        if (!user) console.log('User not found');
        await user.send(message).catch(() => {
           log.info("User has DMs closed or has no mutual servers with the bot :(");
        });
    } catch (error) {
        log.error(error)
        return false
    }
    
}

module.exports = { dateFormater, openActivityGame, checktActivity, deleteMessage, sendDM, sendDMBot }