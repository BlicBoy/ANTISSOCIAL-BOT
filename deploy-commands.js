const { REST, Routes } = require("discord.js");
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, AMBIENT, GUILD_ID } = process.env;

// Importar comandos
const fs = require("fs");
const path = require("path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function loadCommands() {
    try {
        console.log(commands)
        console.log('Started refreshing application (/) commands.');
        if(AMBIENT == 'prod'){
            console.log('IN PROD')
            await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        }else if(AMBIENT == 'dev'){
            console.log('IN DEV')
            await rest.put(Routes.applicationCommands(CLIENT_ID, GUILD_ID), { body: commands });
        }
        
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}


loadCommands()