import {Client, TextChannel} from "discord.js";

import setlogchannel from "../Module/loging/setlogchannel";
import modAction from "../Module/loging/mod-action";

const logchannel = {} as {
    [key: string] : [TextChannel]
}

export default (client: Client) =>{
    client.on('guildBanAdd', async member =>{

        let {guild, user, reason} = member

        if(!reason) {reason = 'Not specified'}

        const action = `${user.tag} has been warned}`

        const staff = undefined

        modAction(action, user, staff, reason, guild)
    })
}

    export const config = {

        displayName: 'Ban Log',
        dbName: 'BAN_LOG'
    }