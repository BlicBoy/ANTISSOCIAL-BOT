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
        let info = await getCredits(interaction.options.get('user').user.id)
        if(info){
            const updatedCredits =  await UserCredits.update({ credits: (info.credits + interaction.options.get('chips').value) }, { where: { id_player: interaction.options.get('user').user.id } });
            if(updatedCredits){
                await interaction.reply({ content: `${interaction.options.get('user').user} received  ${interaction.options.get('chips').value} chips`, ephemeral: false})
            }else{
                await interaction.reply({ content: `Error could not assign chips to ${interaction.options.get('user').user}`, ephemeral: false})
            }
        }else{
            const usercredits = await UserCredits.create({
                id_player: interaction.options.get('user').user.id,
                name: interaction.options.get('user').user.username,
                credits: interaction.options.get('chips').value
            })

            if(usercredits){
                await interaction.reply({ content: `${interaction.options.get('user').user} received  ${interaction.options.get('chips').value} chips`, ephemeral: false})
            }else{
                await interaction.reply({ content: `Error could not assign chips to ${interaction.options.get('user').user}`, ephemeral: false})
            }
        }
    } catch (error) {
        console.error(error)
    }
}

exports.giveFirstCredits = giveFirstCredits
exports.getCredits = getCredits
exports.giveCredits = giveCredits