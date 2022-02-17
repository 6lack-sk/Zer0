import { dirname } from "path";
import { ICommand } from "wokcommands";
import setlogchannel from "../../Module/loging/setlogchannel";

export default{
    names: 'remove-modlog',
    aliases: ['removemodlog', 'rml'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Remove the modlog for the server
    \`\`\`Example:remove-modlog\`\`\``,

    permissions: ['ADMINISTRATOR'],

    slash: 'both',

    //testOnly: true,

    callback: async({message, args, member: staff, guild, channel,interaction}) => {
            
        const action = message ? message : interaction

        if(!guild) return 'This command is only available in Server.'

        const modlog = await setlogchannel.findById(guild.id)

        if(!modlog) return action.reply(`:x: This server has no modlog set.`)

        await setlogchannel.findByIdAndDelete(guild.id)

        action.reply(`:white_check_mark: Successfully removed the modlog for this server.`)
    }
}as ICommand