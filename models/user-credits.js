/**
 * Create table user credits
 */

const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const UserCredits = sequelize.define('user-credits',{
    id_player:{
        type: Sequelize.STRING,
        unique: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    credits:{
        type: Sequelize.DOUBLE,
        defaultValue: 0,
        allowNull:false
    }
})

module.exports = UserCredits