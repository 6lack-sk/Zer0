
import binfo from"../../Data/info.json";

import { ICommand } from 'wokcommands'

export default {
    
    name: `serverinfo`,
    aliases: ['server','sinfo'],
    category: `Info`,
    description: `Shaows server details`,

    callback: async({message, guild}) => {

        if(!guild) return 
        
        const userinfo = {
            color: 0xff0000,
            title: `Server Information`,
            thumbnail: {
                url: `${guild.iconURL()}`,
            },
            fields: [
                {
                    name: `:busts_in_silhouette: **Server Name**`,
                    value: `> ${guild.name}`,
                    inline: true,
                },
                {
                    name: `:id: **Server ID**`,
                    value: `> ${guild.id}`,
                    inline: true,
                },
                {
                    name: `:knot: **Joined on Discord**`,
                    value: `> ${new Date(guild.createdTimestamp).toLocaleDateString()}`,
                    inline: false,
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