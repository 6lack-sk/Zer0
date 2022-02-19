import DiscordJS  from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'

import mongoose from 'mongoose'

import config from './Data/config.json'

import binfo from './Data/info.json'
import { Intents } from 'discord.js'

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS
  ],
})

client.on('ready', () => {

  const wok = new WOKCommands(client, {
    // The name of the local folder for your command files
    commandsDir: path.join(__dirname, 'Commands'),
    featuresDir: path.join(__dirname, 'Features'),
    //typeScript: true,
    testServers: binfo.testserver,
    botOwners: binfo.owner,
    mongoUri: process.env.database,
    dbOptions: {
      keepAlive: true
    }
  })
})

client.login(config.token);
