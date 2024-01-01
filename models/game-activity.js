const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const UserCredits = sequelize.define('game-activity',{
    id_player:{
        type: Sequelize.STRING,
        unique: true,
    },
    game:{
        type: Sequelize.STRING,
        allowNull:false
    },
    init_balance:{
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull:false
    },
    current_balance:{
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull:false
    },
    init_date:{
        type: Sequelize.STRING,
        allowNull:false
    },
    finish_date:{
        type: Sequelize.STRING,
        allowNull: true
    },
    channel_id:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = UserCredits