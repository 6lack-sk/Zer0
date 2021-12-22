
import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'
import { GuildMember } from "discord.js";

export default {
    
    name: `userinfo`,
    aliases: ['user','uinfo'],
    category: `Info`,
    description: `Shaows user details`,

    callback: async({message, member, guild}) => {

        if(!guild) return 'Run this command in a server'

        const user = message.mentions.users.first() || message.author

        if(!member.joinedTimestamp) return 'Is it a guild. I have doubt. Please try in a guild channel.'

        const userinfo = {
            color: 0xff0000,
            title: `Information about ${user.username}`,
            thumbnail: {
                url: `${user.displayAvatarURL()}`,
            },
            fields: [
                {
                    name: `» Server Nickname`,
                    value: `> ${user.toString()}`,
                    inline: false
                },
                {
                    name: `» User Tag`,
                    value: `> ${user.tag}`,
                    inline: false,
                },
                {
                    name: `» User ID`,
                    value: `> ${user.id}`,
                    inline: false,
                },
                {
                    name: `» Joined on Discord`,
                    value: `> ${new Date(user.createdTimestamp).toLocaleDateString()}`,
                    inline: false,
                },
                //{
                //    name: `:knot: **Joined on Server**`,
                  //  value: `**> ${new Date().toLocaleDateString()}**`,
                    //inline: true,
                //},
            ],
            timestamp: new Date(),
            footer: {
                text: `${message.author.tag}`,
            },
        };
        
        message.channel.send({ embeds: [userinfo] });
        
    }
} as ICommand