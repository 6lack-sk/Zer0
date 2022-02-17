import { dirname } from "path";
import { ICommand } from "wokcommands";

import modAction from "../../Module/loging/mod-action";

export default {
    names: `ban`,
    aliases: ``,
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Ban a member from the server
    \`\`\`Example:ban <@member> [reason]\nban <922798353195089940> [reason]\`\`\``,

    permissions: [`BAN_MEMBERS`],

    minArgs: 1,
    expectedArgs: `<user> [reason]`,
    expectedArgsTypes: [`USER`, `STRING`],

    callback: async({message, args, member: staff,guild, channel}) => {

        if(!guild) return 'This command is only available in Server.'

        if(!message.guild?.me?.permissions.has('BAN_MEMBERS')){
            const error = {
                color: 0xff0000,
                description: `:x: Error | I don't have **BAN_MEMBERS** permission`,
            };

            message.channel.send({ embeds: [error] });

            return
        }

        let user = message.mentions.members?.first()

        if(!user) {
            user = guild.members.cache.get(args[0])

            if(!user) return 'Please mention a user or provide id.'
        }

        if(user == staff){
            const error = {
                color: 0xff0000,
                title: `:x: Oh really :bangbang: `,
                description: `Nope, you can't ban yourself`,
            };

            message.channel.send({ embeds: [error] });

            return
        }

        if(!user.bannable) {
            const error = {
                color: 0xff0000,
                title: `:x: Error | Unable to ban`,
                description: `Please make sure that ${user} has lower roles than me. \n
                            Dragging me to the top in role window can be a possible fix`,
            };
            message.channel.send({embeds: [error]});
            return;
        }

        args.shift()
        let reason = args.join(' ')
        if(!reason){ reason =  "None"}

        if(reason.length > 1024){reason = args.slice(1, 1021)+'...'}

        await user.ban({reason: `${reason}`})

        message.channel.send(`${user} is banned from the server`)

        const action = `${user.displayName} banned`

        modAction(action, user, staff, reason, guild)
    
    }
} as ICommand