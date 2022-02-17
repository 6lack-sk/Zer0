import { dirname } from 'path';
import { ICommand } from 'wokcommands'

export default {
    
    name: `avatar`,
    aliases: [`av`],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Shows avatar of user
    \`\`\`Example:avatar [@user]\n(no mention shows the the message author avatar)\`\`\``,

    //hidden: true,

    callback: async({message, member}) => {

        const user = message.mentions.users.first() || member

        const avatar = {
            color: 0xff0000,
            title: `Avatar`,
            url: `${user.displayAvatarURL()}`,
            image: {
                url: `${user.displayAvatarURL()}`,
            },
            timestamp: new Date(),
            footer: {
                text: `${message.author.tag}`,
            },
        };
        
        message.channel.send({ embeds: [avatar] });
    }
} as ICommand