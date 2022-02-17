import binfo from"../../Data/info.json";

import { ICommand } from 'wokcommands'
import { dirname } from "path";

export default {
    
    name: `serverinfo`,
    aliases: ['server','sinfo'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Shaows server details
    \`\`\`Example:serverinfo\`\`\``,

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
                    name: `» Server Name`,
                    value: `> ${guild.name}`,
                    inline: false,
                },
                {
                    name: `» Server ID`,
                    value: `> ${guild.id}`,
                    inline: false,
                },
                {
                    name: `» Server Created on`,
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