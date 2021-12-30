import setlogchannel from '../../Module/loging/setlogchannel';

import { ICommand } from 'wokcommands'

export default {

    name: `setlog`,
    aliases: [`sl`],
    category: `Admin`,
    description: `Set the log channel for the server`,

    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel>',

    callback: async({message, guild}) => {

        if(!guild) return 'please use a guild for this command'

        const target = message.mentions.channels.first();

        if(!target)
            return 'Please tag a text channel';

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

        message.channel.send(`${target} is seted for Mod log.`);
    }
} as ICommand