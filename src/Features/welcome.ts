import {Client, TextChannel} from "discord.js";

import welcomeSchema  from '../Module/Welcome-Schema';

const welcomeData = {} as {
    [key: string] : [TextChannel, string]
}

export default (client: Client) =>{
    client.on('guildMemberAdd', async member =>{

        const {guild, id} = member

        let data = welcomeData[guild.id]
        
        if(!data){
            const result = await welcomeSchema.findById(guild.id)

            if(!result) {return}

            const {channelID, text} = result

            const channel = guild.channels.cache.get(channelID) as TextChannel
    
            data = welcomeData[guild.id] = [channel, text]
        }

        data[0].send({
            content: data[1]
            .replace(/@/g, `<@${id}>`)
        })
    })
}

    export const config = {

        displayName: 'Welcome Channel',
        dbName: 'WELCOME_CHANNEL'
    }