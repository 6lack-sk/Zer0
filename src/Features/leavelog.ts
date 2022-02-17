import {Client, TextChannel} from "discord.js";

import setlogchannel from "../Module/loging/setlogchannel";

const logchannel = {} as {
    [key: string] : [TextChannel]
}

export default (client: Client) =>{
    client.on( 'guildMemberRemove', async member =>{

        const {guild, user} = member

        if(user.bot) return

        let data = logchannel[guild.id]
        
        if(!data){
            const result = await setlogchannel.findById(guild.id)

            if(!result) return

            const {channelID} = result

            const channel = guild.channels.cache.get(channelID) as TextChannel
    
            data = logchannel[guild.id] = [channel]
        }

        const action = {
            title: `${user.tag}`,
            color: 0xff0000,
            description: `${user} has left the server.`,
            thumbnail: {
                url: `${user.displayAvatarURL()}`,
            }, 
            timestamp: new Date(),
            footer: {
                text: `${guild.name}`,
            },
        }

        data[0].send({ embeds: [action] })
    })
}

    export const config = {

        displayName: 'Leave LOG',
        dbName: 'LEAVE_LOG'
    }