import { Client, Message, TextChannel } from "discord.js"

import binfo from "../Data/info.json"

export default (client: Client) =>{
    client.on('guildCreate',async (guild) => {

        const channel =  client.channels.cache.get(binfo.bot_guilds_log) as TextChannel

        if(!channel) return;

        const joinEmbed = {
            title: `Joined to new server`,
            color: 0x00ff00,
            fields: [
                {
                    name: `Server name`,
                    value: `${guild.name}`,	
                    inline: true
                },
                {
                    name: `Server ID`,
                    value: `${guild.id}`,
                    inline: true
                },
                {
                    name: `Server member count`,
                    value: `${guild.memberCount}`,
                    inline: false
                },
            ]
        }
        channel.send({ embeds: [joinEmbed] })
    })
}

    export const config = {

        displayName: 'Guild Join',
        dbName: 'GUILD_JOIN'
    }