const GameResumes = require('../models/game-resumes')
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
                credits: 100.0
            })
            console.log('A dar as primeiras fichas ao ' + interaction.user.id)
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
            const updatedCredits =  await UserCredits.update({ credits: (parseFloat(info.credits) + parseFloat(interaction.options.get('chips').value)) }, { where: { id_player: interaction.options.get('user').user.id } });
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

async function giveCreditsWin(interaction, chips){
    try {
        let info = await getCredits(interaction.user.id)
        if(info){
            let calculateChips = parseFloat(chips) + parseFloat(info.credits)
            const updatedCredits =  await UserCredits.update({ credits: calculateChips }, { where: { id_player: interaction.user.id} });
            
            if(updatedCredits){
              console.log('Fichas atribuidas')
              await updateChipsInDBRoom(calculateChips, interaction);
            }else{
              console.log('Não atribuiu fichas ao jogador')
            }
        }
    } catch (error) {
        console.error(error)
    }
}

async function removeChipsBet(interaction, chips) {
    try {
        let info = await getCredits(interaction.user.id);
        if (info) {
            let chipsToRemove = parseFloat(chips);
            let currentCredits = parseFloat(info.credits);

        
            let calculateChips = currentCredits - chipsToRemove;
            await UserCredits.update({ credits: calculateChips }, { where: { id_player: interaction.user.id} });
           await updateChipsInDBRoom(calculateChips, interaction);
            
        }
    } catch (error) {
        console.error(error);
    }
}

async function updateChipsInDBRoom(calculateChips, interaction) {
    await GameResumes.update({ current_balance: calculateChips }, { where: { id_player: interaction.user.id, finish_date: null, reason_close: null } });
}

exports.giveFirstCredits = giveFirstCredits
exports.getCredits = getCredits
exports.giveCredits = giveCredits
exports.giveCreditsWin = giveCreditsWin
exports.removeChipsBet = removeChipsBet