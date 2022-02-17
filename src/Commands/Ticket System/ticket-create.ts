import { GuildMember, Permissions, TextChannel, User } from "discord.js";
import { resolveSoa } from "dns";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import ticketCategory from "../../Module/ticket-setup";
import tickets from "../../Module/tickets";

export default{
    names: `ticket-create`,
    aliases: ['tcreate'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Create a ticket
    \`\`\`Example:ticket-create  <reason> \n ticket-create need help\`\`\``,

    minArgs: 1,
    expectedArgs: '<reason>',
    expectedArgsTypes: ['STRING'],

    callback: async({message, args, client, guild, prefix, channel, member}) => {
        
        if(!guild) return 'Command is only for guild use.'

        const botperms = ['MANAGE_CHANNELS']

        //botperm(botperms,channel, guild)

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

        const reason = args.slice(0).join(' ')

        const category = await ticketCategory.findById(guild.id)

        //if(!message.guild?.roles.everyone) return `Failed to create a ticket please ty again in 2 minutes or contact a modaretor.`
        if(!guild.me?.id) return console.log('no guild id')

        let tchannel: Promise<TextChannel>

        if(!category){
            message.reply(`Ticket System is not implemented for this server yet. Use \`${prefix}tsetup\` for setup.`)
            return
        }

        const id = category.categoryID
        const role = guild.roles.fetch(category.tstaffID)

        if(!role) return `Ticket Staff role is deleted`

        if (message.channel.id != category.channelID) return `Please use ${guild.channels.cache.get(category.channelID)} for creating a ticket.`
        //console.log(id)
        tchannel = guild.channels.create(`${message.author.username}-ticket`, {
            type: 'GUILD_TEXT',
            topic: `${reason}`,
            parent: id,
            permissionOverwrites: [
              {
                id: guild.id,
			          deny: [Permissions.FLAGS.VIEW_CHANNEL], 
              },
              {
                id: guild.me?.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS],
              },
               {
                 id: message.author.id,
                 allow: [Permissions.FLAGS.VIEW_CHANNEL],
                 deny: [Permissions.FLAGS.MANAGE_CHANNELS]
              },
              {
                id: category.tstaffID,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS]
              }
            ],
          })

        const ticket = await tickets.create({
          guildID: guild.id,
          ChannelID: (await tchannel).id,
          UserID: message.author.id
        })

        if (message.deletable) message.delete()

        const tco = {
          color: 0x00ff00,
          title: `:ticket: Ticket Created`,
          description: `Your ticket has been created on **${guild.name}** server\n **Reason:** ${reason} \n **Ticket Channel:** <#${(await tchannel).id}>\n Please provide all supportive info in the ticket channel.`,
          timestamp: `${new Date()}`,
          footer: {
            text: `This is an automated message from ${guild.me.displayName} ticket system`,
            icon_url: `${guild.me.displayAvatarURL()}`
          }
        }
        
        const tc = {
          color: 0x00ff00,
          title: `:ticket: Ticket Created`,

          description: `**Reason:** ${reason}
          **Ticket ID:** ${ticket._id}
          Please keep all supportive info regarding the ticket in here.\n
          To close the ticket use \`${prefix}tclose\` command.\n
          To add a user to the ticket use \`${prefix}tadd\` command.\n
          To remove a user from the ticket use \`${prefix}tremove\` command.\n`,
          timestamp: `${new Date()}`,
          footer: {
            text: `This is an automated message from ${guild.me.displayName} ticket system`,
            icon_url: `${guild.me.displayAvatarURL()}`
          }
        }

        ;(await tchannel).send({ embeds: [tc] })
        .then(async msg => {msg.pin()})
        //message.author.send(`:ticket: Your ticket has been created on **${guild.name}** server\n **Reason:** ${reason} \n **Ticket Channel:** <#${(await tchannel).id}>\n Please provide all supportive info in the ticket channel.\n \`This is an automated message from ${guild.me.displayName} ticket system\``)
        message.author.send({ embeds: [tco] })
        .catch (async (error) => {
          return 
      })


      const tcs = {
        color: 0xff0000,
        title: `:ticket: Ticket Created`,
        description: `Ticket created by ${message.author} on **${guild.name}** server\n **Reason:** ${reason} \n **Ticket ID:** ${ticket._id} \n **Ticket Channel:** <#${(await tchannel).id}>`,
        timestamp: `${new Date()}`,
        footer: {
          text: `This is an automated message from ${guild.me.displayName} ticket system`,
          icon_url: `${guild.me.displayAvatarURL()}`
        }
      }


        let staff:[String, GuildMember][] = []

        for(const user of guild.members.cache.filter(r => r.roles.cache.has(category.tstaffID))){
          staff.push(user)
        }
        //console.log(staff)

        for(const [id, member] of staff){
          //member.send(`:ticket: Ticket created by ${message.author} on **${guild.name}** server\n **Reason:** ${reason} \n **Ticket ID:** ${ticket._id} \n **Ticket Channel:** <#${(await tchannel).id}>\n \`This is an automated message from ${guild.me.displayName} ticket system\``)
          member.send({ embeds: [tcs] })
          .catch ((error) => {
            return
        })
        }
    }
}as ICommand