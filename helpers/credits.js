const UserCredits = require('../models/user-credits')

async function getCredits(id_player) {
    try {
        let credits = await UserCredits.findOne({where: {id_player : id_player }})

        if (credits) {
            return credits
        }
        return null
        
    } catch (error) {
        console.error(error)
    }
}

async function giveFirstCredits(interaction){
    try {
       let info = await getCredits(interaction.user.id)
       if(info == null){
            const credits = await UserCredits.create({
                id_player: interaction.user.id,
                name: interaction.user.username,
                credits: 100
            })
            return credits
       }
       return null
    } catch (error) {
        console.error(error)      
    }
}

async function giveCredits(interaction){
    try {
        let info = await getCredits
        if(info){
            
        }
    } catch (error) {
        console.error(error)
    }
}

exports.giveFirstCredits = giveFirstCredits
exports.getCredits = getCredits