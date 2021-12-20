import {Client, TextChannel} from "discord.js";

import setlogchannel from "../../Module/loging/setlogchannel";

const logchannel = {} as {
    [key: string] : [TextChannel]
}

export default (client: Client) =>{
    client.on('messageUpdate', async (oldMessage,newMessage) =>{

        const {guild, author,} = oldMessage 

        if(newMessage.author?.bot == true) return

        if(!guild) return

        let data = logchannel[guild.id]
        
        if(!data){
            const result = await setlogchannel.findById(guild.id)

            if(!result) return

            const {channelID} = result

            const channel = guild.channels.cache.get(channelID) as TextChannel
    
            data = logchannel[guild.id] = [channel]
        }

        if(!newMessage.content || !oldMessage.content) return
        if(newMessage.content?.length > 1024){newMessage.content = newMessage.content?.slice(0,1021)+'...'}
        if(oldMessage.content?.length > 1024){oldMessage.content = oldMessage.content?.slice(0,1021)+'...'}

        const action = {
            title: `${author?.tag}`,
            color: 0xff0000,
            description: `${author} edited the message in <#${newMessage.channel}>.\n 
                        [Jump to the message!](${newMessage.url})`,
            fields: [
                {
                    name: `Before`,
                    value: `${oldMessage.content}`
                },
                {
                    name: `After`,
                    value: `${newMessage.content}`
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `${guild.name}`,
            },
        }

        data[0].send({ embeds: [action] })
    })
}

    export const config = {

        displayName: 'Message Update Log',
        dbName: 'MSG_UPDATE_LOG'
    }