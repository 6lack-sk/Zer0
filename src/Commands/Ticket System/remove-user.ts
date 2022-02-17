import { GuildMember } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import ticketSetup from "../../Module/ticket-setup";
import tickets from "../../Module/tickets";

export default{
    names: `remove-user`,
    aliases: ['removeuser', 'ru', 'tremove'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Remove a existing user from a ticket
    \`\`\`Example:ticket-remove  <user> [reason] \n ticket-remove @user ticket added\`\`\``,

    minArgs: 1,
    expectedArgs: `<user>`,
    expectedArgsTypes: ['USER'],

    callback:async ({message, member, guild, channel}) => {
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

        if(!target) return `Please use the command on the ticket channel to remove the user`

        if(!user) return `Please tag user to add`

        if(message.author.id == target.UserID || member.roles.cache.has(tstaff.tstaff_id)){

            if(user.id == message.author.id) return `You can't remove yourself from your ticket. To close the ticket use \`tclose\`.`

            channel.permissionOverwrites.delete(user.id)
        }else {
            message.reply(`You don't have the permission to use this command in here`)
        }

    }
}as ICommand