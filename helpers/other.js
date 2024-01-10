const GameResumes = require('../models/game-resumes')

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
async function openActivityGame(channel, interaction, credits, initDate, game){
    try {
        let result = GameResumes.create({
                id_player: interaction.user.id,
                game: game,
                init_balance: credits,
                current_balance: credits,
                init_date: initDate,
                finish_date: null,
                channel: channel.id,
                reason_close: null
            }) 
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
   
}

async function checktActivity(interaction, nameGame) {
    try {
       result = await GameResumes.findOne({where: {id_player : interaction.user.id, finish_date: null, game: nameGame }})
       if(result) return result
       return null
    } catch (error) {
        console.error(error)
        return error
    }
}
async function deleteMessage(interaction){
    const channel = interaction.guild.channels.cache.get(interaction.channelId)
	const amount = 10;
	const messages = await channel.messages.fetch({ limit: amount + 1 });
	await channel.bulkDelete(messages);

}


exports.dateFormater = dateFormater
exports.openActivityGame = openActivityGame
exports.checktActivity = checktActivity
exports.deleteMessage = deleteMessage