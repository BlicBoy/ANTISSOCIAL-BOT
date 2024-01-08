const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const GameResumes = sequelize.define('game-resumes',{
    id_player:{
        type: Sequelize.STRING,
        allowNull: false
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
    channel:{
        type: Sequelize.STRING,
        allowNull: true
    },
    reason_close:{
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = GameResumes