import { GuildMember, User } from "discord.js"
import { dirname } from "path"
import { ICommand } from "wokcommands"
import modAction from "../../Module/loging/mod-action"
//

export default{
    names: `reset-timeout`,
    aliases: [`reset-to`, `rto`],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Reset user timeout
    \`\`\`Example:reset-timeout  <user> [reason] \nreset-timeout @user timeout waived\`\`\``,

    //permissions: ['MODERATE_MEMBERS'],

    expectedArgs: '<user> [reason]',

    callback: async ({message, guild, member: staff, client, args}) => {

        if(!guild) return 'Command is only available for guild'
        const botperm = guild.me?.permissions.has('MODERATE_MEMBERS')
        if(botperm == false) return `I don't have MODERATE_MEMBERS(TIMEOUT_MEMBERS) permission.`

        const staffperm = staff.permissions.has('MODERATE_MEMBERS')
        if(staffperm == false) return `You don't have MODERATE_MEMBERS(TIMEOUT_MEMBERS) permission.`

        const user = message.mentions.members?.first() as GuildMember
        if(!user) {return 'please tag a user'}

        const botrole = guild.me?.roles.highest.comparePositionTo(user.roles.highest)
        console.log(botrole)
        if(!botrole || botrole <= 0 ) return `'Tagged user has a higher or same role as mine. Can't time him out.`

        let reason = args.slice(1).join('')
        if(!reason) {reason = 'Not specified'}

        const time = 0

        user.timeout(time, reason)

        const action = `${user.displayName} timeout has been revoked`

        modAction(action, user, staff, reason, guild)
    }
}as ICommand