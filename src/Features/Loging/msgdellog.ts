import {Client, Guild, TextChannel} from "discord.js";

import setlogchannel from "../../Module/loging/setlogchannel";

const logchannel = {} as {
    [key: string] : [TextChannel]
}

export default (client: Client) =>{
    client.on('messageDelete', async message =>{

        const {guild, author} = message

        if(message.author?.bot == true) return

        if(!guild) return

        let data = logchannel[guild.id]
        
        if(!data){
            const result = await setlogchannel.findById(guild.id)

            if(!result) return

            const {channelID} = result

            const channel = guild.channels.cache.get(channelID) as TextChannel
    
            data = logchannel[guild.id] = [channel]
        }

        const action = {
            title: `${author?.tag}`,
            color: 0xff0000,
            description: `Message sent by ${author} is deleted <#${message.channel}>\n
                        ${message}`,
            timestamp: new Date(),
            footer: {
                text: `${guild.name}`,
            },
        }

        data[0].send({ embeds: [action] })
    })
}

    export const config = {

        displayName: 'Message Delete Log',
        dbName: 'MSG_DEL_LOG'
    }