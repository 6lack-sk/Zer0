import setlogchannel from '../../Module/loging/setlogchannel';

import { ICommand } from 'wokcommands'
import { dirname } from 'path';
import { TextChannel } from 'discord.js';

export default {

    name: `setlog`,
    aliases: [`sl`],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Set the log channel for the server
    \'\'\'Exaple:setlog <#channel_id> \n setlog <922798353195089940>\'\'\'`,

    permissions: ['ADMINISTRATOR'],

    slash: "both",

    testOnly: true,

    minArgs: 1,
    expectedArgs: '<channel>',

    callback: async({message, guild, args, interaction}) => {

        const type = message ? message : interaction

        if(!guild) return 'please use a guild for this command'

        let target  

        if(message){
            target = message.mentions.channels.first() as TextChannel
            if(!target)
            {
                target = guild.channels.cache.get(args[0]) as TextChannel
                if(!target) return 'please provide a valid channel id or tag a text channel'
            }
        }

        if(interaction){
            target = interaction.options.getChannel('channel', true)
            if(!target) return 'please provide a valid channel id or tag a text channel'
        }
        
        if(!target) return 'please provide a valid channel id or tag a text channel'

        await setlogchannel.findOneAndUpdate({
            _id: guild.id
        },
        {
            _id: guild.id,
            channelID: target.id,
        },
        {
            upsert: true
        })

        type.reply(`:white_check_mark: Successfully set the log channel to ${target}`)
    }
} as ICommand