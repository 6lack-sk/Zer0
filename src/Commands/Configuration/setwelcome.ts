import welcomeSchema from '../../Module/Welcome-Schema';

import { ICommand } from 'wokcommands'

export default {

    name: `setwelcome`,
    aliases: [`setwel`, `sw`],
    category: `Welcome & Leave`,
    description: `Set the welcome message for the server`,

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',

    callback: async({message, args, guild}) => {

        if(!guild) return 'please use a guild for this command'

        const target = message.mentions.channels.first();

        if(!target)
            return 'Please tag a text channel';
        
        let text = ''

        args.shift()
        text = args.join(' ')

        if(!text) return 'please add welcome message'

        await welcomeSchema.findOneAndUpdate({
            _id: guild.id
        },
        {
            _id: guild.id,
            text,
            channelID: target.id,
        },
        {
            upsert: true
        })

        const welmsg = {
            title: `Welcome Message Setup`,
            description: `Setup is succesfully completed`,
            color: 0xff0000,
            fields: [
                {
                    name: `**Welcome Channel**`,
                    value: `${target}`,
                },
                {
                    name: `**Welcome Message**`,
                    value: `${text}`,
                }
            ],
        }

        message.channel.send({ embeds: [welmsg] });
    }
} as ICommand