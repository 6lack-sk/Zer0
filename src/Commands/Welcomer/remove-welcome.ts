import { dirname } from "path";
import { ICommand } from "wokcommands";
import WelcomeSchema from "../../Module/Welcome-Schema";

export default{
    names: 'remove-welcome',
    aliases: ['removew', 'rw'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Remove the welcome message for the server
    \`\`\`Example:remove-welcome\`\`\``,

    permissions: ['ADMINISTRATOR'],

    slash: 'both',

    //testOnly: true,

    callback: async({message, args, member: staff, guild, channel, interaction}) => {

        const action = message ? message : interaction

        if(!guild) return 'This command is only available in Server.'

        const welcome = await WelcomeSchema.findById(guild.id)

        if(!welcome) return action.reply(`:x: This server has no welcome message set.`)

        action.reply(`:white_check_mark: Successfully removed the welcome message for this server.`)

        await WelcomeSchema.findByIdAndDelete(guild.id)

        //if(interaction){
        //    interaction.reply(`:white_check_mark: Successfully removed the welcome message for this server. Bot will no longer send welcome messages to <#${welcome.channelID}>`)
        //}
        //if(message){
        //    message.reply(`:white_check_mark: Successfully removed the welcome message for this server. Bot will no longer send welcome messages to <#${welcome.channelID}>`)
        //}

    }
}as ICommand