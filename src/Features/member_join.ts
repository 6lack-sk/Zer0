import {Client, TextChannel} from "discord.js";
import autorole_schema from "../Module/autorole_schema";

import welcomeSchema  from '../Module/Welcome-Schema';

const welcomeData = {} as {
    [key: string] : [TextChannel, string]
}

export default (client: Client) =>{
    client.on('guildMemberAdd', async member =>{

        const {guild, id} = member
        
        const result = await welcomeSchema.findById(guild.id)

        if(!result) {return}

        const {channelID, text} = result

        const channel = guild.channels.cache.get(channelID) as TextChannel
    
        let data = welcomeData[guild.id] = [channel, text]

        data[0].send({
            content: data[1]
            .replace(/{user}/g, `<@${id}>`)
            .replace(/{server}/g, `${guild.name}`)
            .replace(/{username}/g, `${member.user.username}`)
        })


        const autorole = await autorole_schema.findById(guild.id)

        if(!autorole) {return}

        const {autoroleID} = autorole

        const role = guild.roles.cache.get(autoroleID)

        if(!role) {return}

        member.roles.add(role)

        const autoroledm = {
            color: 0x00ff00,
            title: `Jion Role`,
            description: `You have been given the role **${role.name}** to the server **${guild.name}**`,
            timestamp: `${new Date()}`,
            footer: {
              text: `${guild.name}`
            },
          }

        member.send({embeds: [autoroledm]})
        .catch((error) => {
            return
        })
    })


}

    export const config = {

        displayName: 'Welcome Channel',
        dbName: 'WELCOME_CHANNEL'
    }