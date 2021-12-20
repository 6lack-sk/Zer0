
import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'

export default {
    
    name: `userinfo`,
    aliases: ['user','uinfo'],
    category: `Info`,
    description: `Shaows user details`,

    callback: async({message, member}) => {

        const user = message.mentions.users.first() || member

        if(!member.joinedTimestamp) return 'Is it a guild. I have doubt. Please try in a guild channel.'

        const userinfo = {
            color: 0xff0000,
            title: `User Information`,
            thumbnail: {
                url: `${user.displayAvatarURL()}`,
            },
            fields: [
                {
                    name: `:busts_in_silhouette: **User Tag**`,
                    value: `> ${user}`,
                    inline: true,
                },
                {
                    name: `:id: **User ID**`,
                    value: `> ${user.id}`,
                    inline: true,
                },
                {
                    name: `:busts_in_silhouette: **Server Nickname**`,
                    value: `> ${member.nickname}`,
                    inline: true,
                },
                {
                    name: `:robot: **Bot**`,
                    value: `> ${user}`,
                    inline: true
                },
                {
                    name: `:knot: **Joined on Server**`,
                    value: `**> ${new Date(member.joinedTimestamp).toLocaleDateString()}**`,
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: `${message.author.tag}`,
            },
        };
        
        message.channel.send({ embeds: [userinfo] });
        
    }
} as ICommand