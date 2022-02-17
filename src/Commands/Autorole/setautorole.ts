import { Role } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import autorole_schema from "../../Module/autorole_schema";

export default{
    names: 'setautorole',
    aliases: ['sar', 'setar'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Set the autorole for the server
    \`\`\`Example:setautorole <@role>\nsetar <roleID>\`\`\``,

    permissions: ['ADMINISTRATOR'],

    slash: "both",

    //testOnly: true,

    minArgs: 1,
    expectedArgs: '<role>',
    expectedArgsTypes: ['ROLE'],

    callback: async({message, args, member: staff, guild, channel, interaction}) => {

        const type = message ? message : interaction
        
        if(!guild) return 'This command is only available in Server.'

        if(!type.guild?.me?.permissions.has('MANAGE_ROLES')){
            const error = {
                color: 0xff0000,
                description: `:x: Error | I don't have **MANAGE_ROLES** permission`,
            };

            type.reply({ embeds: [error] });

            return
        }

        let role 
        if(message){
            role = message.mentions.roles?.first() as Role

            if(!role) {
                role = guild.roles.cache.get(args[0]) as Role
                if(!role) return 'Please mention a server role or provide a valid role id'
            }
        }
        
        if(interaction){

            role = interaction.options.getRole('role', true)
            if(!role) return 'Please mention a server role'
        }

        if(!role) return 'Please mention a server role or provide a valid role id'

        await autorole_schema.findOneAndUpdate(
            {
                _id: guild.id
            },
            {
                _id: guild.id,
                autoroleID: role.id
            },
            {
                upsert: true
            }
        )

        type.reply(`:white_check_mark: Successfully set the autorole to ${role.name}`)
    }
}as ICommand