import { ICommand } from "wokcommands";

import modAction from "../../Module/mod-action";

export default {
    names: `unban`,
    aliases: ``,
    category: `Admin`,
    description: `Unban a banned member`,

    permissions: [`ADMINISTRATOR`],

    minArgs: 1,
    expectedArgs: `<user_id> [reason]\n(don't know how to get the id, run the command getid)`,
    expectedArgsTypes: [`NUMBER`, 'STRING'],

    callback: async({message, args, member: staff, guild, client}) => {

        if(!guild) return 'This command is only available in Server.'

        if(!message.guild?.me?.permissions.has('BAN_MEMBERS')){
            const error = {
                color: 0xff0000,
                description: `:x: Error | I don't have **BAN_MEMBERS** permission`,
            };

            message.channel.send({ embeds: [error] });

            return
        }

        if (args[0] == staff.id) 
        return 'It looks like you have droped your own user id and obviously you are not banned.'

        const user =  client.users.cache.get(args[0])

        if(!user) return `A user with id of \`${args[0]}\` was not found. Please check the user id`

        let reason = args.slice(1).join(' ')
        if(!reason) {reason = 'Not Specified'}

        message.guild.members.unban(user)
        .then(async done => {
            message.channel.send(`${user} is unbanned from the server`)

            const action = `${user.tag} unbanned`

            modAction(action, user, staff, reason, guild)
        })
        .catch(failed =>{ return 'That user is not banned from the server'})
        
        
    }
} as ICommand