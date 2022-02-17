import { TextChannel } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import ticketsetup from "../../Module/ticket-setup";

export default{
    names: 'ticket-setup',
    aliases: ['tsetup'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Setup the channel, category and ticket staff role for the server
    \`\`\`Example:ticket-setup <#channel> <@ticket staff role> [channel topic]
    ticket-setup <channelID> <@ticket staff role> [channel topic]
    ticket-setup <channelID> <ticket staff roleID> [channel topic]
    ticket-setup <#channel> <ticket staff roleID> [channel topic]\`\`\``,

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel_id> <ticket staff role> [channel topic]',
    expectedArgsTypes: ['STRING', 'STRING'],
    callback: async({message, args, client, guild, }) =>{

        if(!guild) return `Ticket System is guild based only.`

        if(!message.guild?.me?.permissions.has(['MANAGE_CHANNELS', 'MANAGE_ROLES'])){
            const error = {
                color: 0xff0000,
                description: `:x: Error | I don't have **'MANAGE_CHANNELS', 'MANAGE_ROLES'** permission.`,
            };

            message.channel.send({ embeds: [error] });

            return
        }

        let channel_id = message.mentions.channels.first()?.id

        if(!channel_id){
            channel_id = args[0]
        }

        const channel = guild?.channels.cache.get(channel_id)

        if(!channel || !channel.isText()) return `Please mention or provide the id of a text channel.`

        const category = channel?.parent

        const text = args.slice(2).join(' ')

        let tstaff_id = message.mentions.roles.first()?.id

        if(!tstaff_id){
            tstaff_id = args[1]
        }

        const tstaff = guild.roles.cache.get(tstaff_id)

        if(!tstaff) return `Please mention a role to set it as a ticket staff role`

        await ticketsetup.findOneAndUpdate({
            _id:guild.id
        },
        {
            _id: guild.id,
            categoryID: category?.id,
            channelID: channel.id,
            tstaffID: tstaff.id
        },
        {
            upsert: true
        })

        message.channel.send(`${category} has been set for the ticket. All new tickets will be created there.\nAnd ${tstaff} will have the access to maintain all tickets.`)

        const ticketnev = {
            title: `Welcome to the ticket portal of ${guild.name}`,
            color: 0x00ff00,
            description: `${text}`,
            fields: [
                {
                    name: `ticket-create`,
                    value: `creates a ticket`,
                },
                {
                    name: `ticket-close`,
                    value: `close a ticket. Only use the command on the ticket channel you want to colse.`
                },
                {
                    name: `ticket-add`,
                    value: `Add a server member to the ticket.`
                },
                {
                    name: `ticket-remove`,
                    value: `Remove server member(s) from the ticket.`
                }
            ]
        }

        channel.send({ embeds: [ticketnev] })
    }
}as ICommand