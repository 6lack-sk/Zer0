import { GuildMember } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import ticketSetup from "../../Module/ticket-setup";
import tickets from "../../Module/tickets";

export default{
    names: `add-user`,
    aliases: ['adduser', 'au', 'tadd'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Add a user to an existing ticket
    \`\`\`Example:ticket-add  <user> [reason] \n ticket-add @user ticket added\`\`\``,

    minArgs: 1,
    expectedArgs: `<user>`,
    expectedArgsTypes: ['USER'],

    callback:async ({message, member, client, guild, args, channel}) => {
        if(!guild) return 'This command is just for server use'

        const botperms = ['MANAGE_ROLES']

        for(const perm of botperms){
            //@ts-ignore
            if(!guild.me?.permissions.has(perm)){
              const error = {
                color: 0xff0000,
                description: `:x: Error | I don't have **${perm}** permission`,
              };
  
              message.channel.send({ embeds: [error] });
              return
            }
        }

        let user = message.mentions.users.first()

        let target = await tickets.findOne({
            guildID: guild.id,
            ChannelID: message.channel.id
        })

        let tstaff = await ticketSetup.findOne({
            _id: guild.id
        })

        if(!target) return `Please use the command on the ticket channel where you want to add the user`

        if(!user) return `Please tag user to add`

        if(message.author.id == target.UserID || member.roles.cache.has(tstaff.tstaff_id)){

            channel.permissionOverwrites.edit(user.id,{VIEW_CHANNEL: true})
        }else {
            message.reply(`Only the staff or the ticket opener can add new user to a ticket.`)
        }

    }
}as ICommand