import welcomeSchema from '../../Module/Welcome-Schema';

import { ICommand } from 'wokcommands'
import { dirname } from 'path';
import { TextChannel } from 'discord.js';

export default {

    name: `setwelcome`,
    aliases: [`setwel`, `sw`],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Set the welcome message for the server
    \`\`\`Example:setwelcome <#channel_id> <text> \nsetwelcome <922798353195089940> <text>\nNB: terms can be used in the text: {user}, {server}, {username}
    {user} = user mention
    {username} = username
    {server} = guild name
    <#channelID> = for mentioning a channel (eg. <#922798353195089940>)
    (you ca get channel id by clicking on the channel/ channel tag. And you needs to have developers mode on from settings)
    \`\`\``,

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',

    callback: async({message, args, guild}) => {

        if(!guild) return 'please use a guild for this command'

        let target = message.mentions.channels.first() as TextChannel;

        if(!target)
        {
            target = guild.channels.cache.get(args[0]) as TextChannel;
            if(!target) return 'please provide a valid channel id or tag a text channel';
        }

        args.shift()
         
        let text = ''
        
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