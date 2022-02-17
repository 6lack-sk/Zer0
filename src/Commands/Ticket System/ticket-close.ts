import { dirname } from "path";
import { ICommand } from "wokcommands";
import ticketSetup from "../../Module/ticket-setup";
import tickets from "../../Module/tickets";

export default{
    names: `ticket-close`,
    aliases: ['tclose'],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Close a ticket`,

    callback:async ({message, member, guild, client, channel}) => {

        if(!guild) return `This command is only for server use`

        const botperms = ['MANAGE_CHANNELS']

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

        let target = await tickets.findOne({
            guildID: guild.id,
            ChannelID: message.channel.id
        })

        let tstaff = await ticketSetup.findOne({
            _id: guild.id
        })

        if(!target) return `Please use the command on the ticket channel which you want to close.`

        if(message.author.id == target.UserID || member.roles.cache.has(tstaff.tstaffID)) {

        channel.delete()

        await tickets.findOneAndDelete({
            guildID: guild.id,
            ChannelID: channel.id
        })
        }else{
        return `You can't close the ticket.`
        }
        const towner = await client.users.fetch(target.UserID)

        const tco = {
            color: 0xff0000,
            title: `:ticket: Ticket Closed`,
            description: `Your ticket on **${guild.name}** server has been closed by ${message.author} \n **Ticket ID:** ${target._id}`,
            timestamp: `${new Date()}`,
            footer: {
              text: `This is an automated message from ${guild.me?.displayName} ticket system`,
              icon_url: `${guild.me?.displayAvatarURL()}`
            }
        }

        const tcs = {
            color: 0xff0000,
            title: `:ticket: Ticket Closed`,
            description: `You have closed the ticket on **${guild.name}** server \n **Ticket ID:** ${target._id} \n **Ticket Owner**: ${towner}(${target.UserID})`,
            timestamp: `${new Date()}`,
            footer: {
              text: `This is an automated message from ${guild.me?.displayName} ticket system`,
              icon_url: `${guild.me?.displayAvatarURL()}`
            }
        }

        const tco2 = {
            color: 0xff0000,
            title: `:ticket: Ticket Closed`,
            description: `You have closed your ticket on **${guild.name}** server \n **Ticket ID:** ${target._id}`,
            timestamp: `${new Date()}`,
            footer: {
              text: `This is an automated message from ${guild.me?.displayName} ticket system`,
              icon_url: `${guild.me?.displayAvatarURL()}`
            }
        }

        if(message.author.id != target.UserID){
            message.author.send({ embeds: [tcs] })
            .catch((error) => {
            })

            towner.send({ embeds: [tco] })
            .catch((error) => {
                return
            })
        }else{
            towner.send({ embeds: [tco2] })
            .catch ((error) => {
                return
            })
        }
    }
}as ICommand