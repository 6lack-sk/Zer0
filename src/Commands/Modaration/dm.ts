import { error } from "console";
import { GuildMember } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import modAction2 from "../../Module/loging/mod-action 2";

export default{
    names: 'dm',
    aliases: [''],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Sends dm to a specific user
    \`\`\`Example:dm <@user> <message>\n dm @user hi there\`\`\``,

    requireRoles: true,

    minArgs: 2,
    expectedArgs: '<user> <message>',
    expectedArgsTypes: ['USER', 'STRING'],
    callback: async({message, member: staff, args,client, guild}) => {

        if(!guild) return 'This command is only for server use.'

        const user = message.mentions.members?.first() as GuildMember

        if(!user) return 'Please mention a server member'

        const msg = args.slice(1).join(' ')

        const dmto = await client.users.fetch(user.id)

        const dm = {
            title: `This DM is sent from ${guild.name}`,
            color: 0xff0000,
            description: `**Sent by ${staff}**\n\n ${msg}`,
            timestamp: new Date()
        }
        
        dmto.send({ embeds: [dm] })
        .then(message=>{
            const action = 'DM sent' 
        modAction2(action, staff, msg, guild)
        })
        .catch ((error) => {
            message.reply(`Failed to send DM, possibly the user DM is off.`)
            return
        })
        
        
    }
}as ICommand
