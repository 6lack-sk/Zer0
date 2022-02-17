import { GuildMember, User } from "discord.js"
import ms from "ms"
import { dirname } from "path"
import { ICommand } from "wokcommands"
import modAction from "../../Module/loging/mod-action"
//

export default{
    names: `timeout`,
    aliases: [`to`],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Timeout a user
    \`\`\`Example:timeout  <user> <time> [reason] \ntime-out @user 1d timeout for spam\`\`\``,

    //permissions:['MODERATE_MEMBERS'],

    expectedArgs: '<user> <time> [reason]',

    callback: async ({message, guild, member: staff, client, args}) => {

        if(!guild) return 'Command is only available for guild'
        const botperm = guild.me?.permissions.has('MODERATE_MEMBERS')
        if(botperm == false) return `I don't have MODERATE_MEMBERS(TIMEOUT_MEMBERS) permission.`

        const staffperm = staff.permissions.has('MODERATE_MEMBERS')
        if(staffperm == false) return `You don't have MODERATE_MEMBERS(TIMEOUT_MEMBERS) permission.`
        
        const user = message.mentions.members?.first() as GuildMember
        if(!user) {return 'please tag a user'}

        const botrole = guild.me?.roles.highest.comparePositionTo(user.roles.highest)
        if(!botrole) return 'please assign me a role'
        if(botrole <= 0 ) return `'Tagged user has a higher or same role as mine. Can't time him out.`

        let reason = args.slice(2).join('')
        if(!reason) {reason = 'Not specified'}
        const time = args[1]
        if(!time) {return 'please give a timeout time'}

        const milisec = ms(time)
        if(!milisec || milisec < 10000 || milisec > 2419200000){
            return 'make sure that timeout duration is between 10sec and 28days'
        }

        try {user.timeout(milisec,reason)

            const action = `${user.displayName} timed out for ${time}`
      
            modAction(action, user, staff, reason, guild)
            
        } catch (error) {
            console.log(error)
        }
    }
}as ICommand