//discord js
const { Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

//dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

//import commands
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
client.commands = new Collection()
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em ${filePath} está com data ou execute ausentes.`)
    }
}

//import helpers
const { confirmBet } = require('./helpers/initGameRoulette')
const { setupBot } = require('./helpers/setup')

//listener ready
client.once(Events.ClientReady, async readyClient => {
   await setupBot(client, readyClient)
});

//login bot
client.login(TOKEN);

//listener interect
client.on(Events.InteractionCreate, async interaction => {
    try {
        if(interaction.isModalSubmit()){
            await confirmBet(interaction)
        }
        if (!interaction.isChatInputCommand()) return
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply('Error commad')
    }
})

