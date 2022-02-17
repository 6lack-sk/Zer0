
import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'
import { GuildMember } from "discord.js";
import { dirname } from "path";

export default {
    
    name: `userinfo`,
    aliases: ['user','uinfo'],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Shaows user details
    \`\`\`Example:userinfo [@user]\`\`\``,

    expectedArgs: '[user]',
    expectedArgsTypes: ['USER'],

    callback: async({message, member, guild}) => {

        if(!guild) return 'Run this command in a server'

        const user = message.mentions.members?.first() || member
        const user2 = message.mentions.users.first() || message.author

        if(!user.joinedTimestamp) return 'Is it a guild? I have doubt. Please try in a guild channel.'

        const userinfo = {
            color: user.displayHexColor,
            title: `Information about ${user2.username}`,
            thumbnail: {
                url: `${user.displayAvatarURL()}`,
            },
            fields: [
                {
                    name: `» Server Nickname`,
                    value: `> ${user.displayName}`,
                    inline: false
                },
                {
                    name: `» User Tag`,
                    value: `> ${user2.tag}`,
                    inline: false,
                },
                {
                    name: `» User ID`,
                    value: `> ${user.id}`,
                    inline: false,
                },
                {
                    name: `» Joined on Discord`,
                    value: `> ${new Date(user2.createdTimestamp).toLocaleDateString()}`,
                    inline: true,
                },
                {
                    name: `» Joined on Server`,
                    value: `> ${new Date(user.joinedTimestamp).toLocaleDateString()}`,
                    inline: true,
                },
                {
                    name: `» Highest Role`,
                    value: `> ${user.roles.highest}`,
                    inline: false
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `${message.author.tag}`,
            },
        };
        
        message.channel.send({ embeds: [userinfo] });
        
    }
} as ICommand