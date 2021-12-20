import { ICommand } from 'wokcommands'

export default {
    
    name: `avatar`,
    aliases: [`av`],
    category: `Info`,
    description: `Shows avatar of user`,

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