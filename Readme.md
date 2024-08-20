# 🌕 ANTI$$OCIAL 🌕

This project is a discord bot that is open source and anyone can use it as a base for other bots. This project was created with the aim of learning more about javascript and node.js. In the future I'll set up a server for you to test the most stable version of the bot. For now, the only way to test the bot is to run it locally on your computer.

## Installation

The entire node.js installation and bot creation can be found in the [discord.js guide](https://discordjs.guide/preparations/#installing-node-js).

## Create .env

```bash
npm install dotenv
```
Create an .env file with the following credentials and which environment you are developing in - production (prod) or development (dev).

```dotenv
TOKEN = ********
CLIENT_ID = *******
GUILD_ID = ******
AMBIENT = dev 
DELETE_COMMANDS = false
```

## Update command list
Whenever a command is added to the bot, it is necessary to run the deploy-comands.js file in the main directory.

```bash
node .\deploy-commands.js
```

## Create Database

```bash
npm i sequelize sqlite3
```

## Create Logs File

```bash
npm i winston
```
For the bot logs in production we use an external service called betterstack. If you want to use it, you'll need to create a betterstack account and configure your .env as follows

```bash
npm i @logtail/winston @logtail/node
```

```dotenv
TOKEN = ********
CLIENT_ID = *******
GUILD_ID = ******
AMBIENT = dev 
DELETE_COMMANDS = false
BETTER_STACK_TOKEN = ******
```

If you don't want to use it, you have to comment out or delete 2 lines from the winston.js file, which are line 8 and 21.