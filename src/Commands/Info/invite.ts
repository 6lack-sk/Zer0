import { Permissions } from 'discord.js';
import { dirname } from 'path';
import { ICommand } from 'wokcommands'
import binfo from '../../Data/info.json'

export default {
    
    name: `invite`,
    aliases: [``],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Generate a default invite link for the bot
    \`\`\`Example:invite\`\`\``,

    callback: async({message, client,member}) => {

        const link = client.generateInvite({
            permissions:[
                Permissions.FLAGS.SEND_MESSAGES,
                Permissions.FLAGS.ADMINISTRATOR,
            ],
            scopes: ['bot'],
          });
        
        const invite = {
            title: `Invite ${binfo.bot_name} to the server`,
            url: link,
            color: member.displayHexColor,
            thumbnail: {
                url: binfo.bot_logo
            },
            description: `${binfo.bot_description}\n\nNB:You can also go to my profile and press the button **Add to Server** to add me in a server.`
        }
        
        message.channel.send({ embeds: [invite] })
    }
} as ICommand