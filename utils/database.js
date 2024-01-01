const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'user', 'password',{
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    //SQlite Only
    storage: 'database.sqlite'
})

module.exports = sequelize