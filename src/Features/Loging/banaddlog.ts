import {Client, TextChannel} from "discord.js";

import setlogchannel from "../../Module/loging/setlogchannel";

const logchannel = {} as {
    [key: string] : [TextChannel]
}

export default (client: Client) =>{
    client.on('guildBanAdd', async member =>{

        const {guild, user, reason} = member

        let data = logchannel[guild.id]
        
        if(!data){
            const result = await setlogchannel.findById(guild.id)

            if(!result) return

            const {channelID} = result

            const channel = guild.channels.cache.get(channelID) as TextChannel
    
            data = logchannel[guild.id] = [channel]
        }

        let cause = reason

        console.log(cause)
        if(!cause){
            cause = "Not specified"
        }

        const action = {
            title: `${user.tag} is banned`,
            color: 0xff0000,
            description: `${user} is banned from the server.\n
                        Reason: ${cause}`,
            timestamp: new Date(),
            footer: {
                text: `${guild.name}`,
            },
        }

        data[0].send({ embeds: [action] })
    })
}

    export const config = {

        displayName: 'Ban Log',
        dbName: 'BAN_LOG'
    }