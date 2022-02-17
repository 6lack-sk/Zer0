import { dirname } from "path";
import { ICommand } from "wokcommands";
import autorole_schema from "../../Module/autorole_schema";

export default{
    names: 'remove-autorole',
    aliases: ['removear', 'rar', 'removeautorole'],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Remove the autorole for the server
    \`\`\`Example:remove-autorole\`\`\``,

    permissions: ['ADMINISTRATOR'],

    slash: 'both',

    //testOnly: true,

    callback: async({message, args, member: staff, guild, channel, interaction}) => {

        const action = message ? message : interaction
        
        if(!guild) return 'This command is only available in Server.'

        const autorole = await autorole_schema.findById(guild.id)

        if(!autorole) return action.reply(`:x: This server has no autorole set.`)

        await autorole_schema.findByIdAndDelete(guild.id)

        action.reply(`:white_check_mark: Successfully removed the autorole for this server.`)
    }

}as ICommand 