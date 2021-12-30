import { User } from "discord.js"
import ms from "ms"
import fetch from "node-fetch"
import { ICommand } from "wokcommands"
import modAction from "../../Module/mod-action"
//

export default{
    names: `reset-timeout`,
    aliases: [`reset-to`, `rto`],
    category: `Mod`,
    description: `reset user timeout`,

    requireRoles: true,

    expectedArgs: '<user> [reason]',

    callback: async ({message, guild, member: staff, client, args}) => {

        if(!guild) return 'Command is only available for guild'
        const user = message.mentions.users.first() as User
        if(!user) {return 'please tag a user'}

        let reason = args.slice(1).join('')
        if(!reason) {reason = 'Not specified'}

        const timeout = 0

        await fetch(`https://discord.com/api/guilds/${guild?.id}/members/${user.id}`,{
            method: 'PATCH',
			body: JSON.stringify({ communication_disabled_until: timeout }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bot ${client.token}`,
			},
        })
        const action = `${user.tag} timeout has been reset`

        modAction(action, user, staff, reason, guild)
    }
}as ICommand