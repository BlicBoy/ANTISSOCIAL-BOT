//discord js
const { Client, Events, GatewayIntentBits, Collection, ActivityType, User } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

//dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN } = process.env

//SQLITE - sequelize
const UserCredits = require('./models/user-credits')
const GameActivity = require('./models/game-activity')


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

//Login bot
let status = [
    {
      name: '💲ANTI$$OCIAL',
      type: ActivityType.Streaming,
      url: 'https://www.youtube.com/watch?v=lKgIaH45ijc&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲AO TEU LADO',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=zyQLxBiPqc4&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲NÃO OS VEJO',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=vcXu21yTmIc&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲DIAMANTE',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=gO94m7bBNSc&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲UH LA LA LA',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=M4sg_9vwLTg&ab_channel=LON3RJOHNY',
    },
    {
        name: '💲PIÑA COLADA',
        type: ActivityType.Streaming,
        url: 'https://www.youtube.com/watch?v=ZcmgI-R-9W0&ab_channel=FiltrPortugal',
    },
  ];
client.once(Events.ClientReady, readyClient => {
    UserCredits.sync()
    GameActivity.sync()
    console.log(`✅ ${readyClient.user.tag} is online.`);
    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
      }, 10000);
});
client.login(TOKEN);

//listener interect
client.on(Events.InteractionCreate, async interaction => {
    try {
        if (!interaction.isChatInputCommand()) return
        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply('Error commad')
    }
})