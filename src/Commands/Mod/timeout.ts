import { User } from "discord.js"
import ms from "ms"
import fetch from "node-fetch"
import { ICommand } from "wokcommands"
import modAction from "../../Module/mod-action"
//

export default{
    names: `timeout`,
    aliases: [`to`],
    category: `Mod`,
    description: `timeout a user`,

    requireRoles: true,

    expectedArgs: '<user> <time> [reason]',

    callback: async ({message, guild, member: staff, client, args}) => {

        if(!guild) return 'Command is only available for guild'
        const user = message.mentions.users.first() as User
        if(!user) {return 'please tag a user'}

        let reason = args.slice(2).join('')
        if(!reason) {reason = 'Not specified'}
        const time = args[1]
        if(!time) {return 'please give a timeout time'}

        const milisec = ms(time)
        if(!milisec || milisec < 10000 || milisec > 2419200000){
            return 'make sure that timeout duration is between 10sec and 28days'
        }

        const timeout = new Date(Date.now() + milisec).toISOString()

        await fetch(`https://discord.com/api/guilds/${guild?.id}/members/${user.id}`,{
            method: 'PATCH',
			body: JSON.stringify({ communication_disabled_until: timeout }),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bot ${client.token}`,
			},
        })
        const action = `${user.tag} timed out for ${time}`

        modAction(action, user, staff, reason, guild)
    }
}as ICommand
