import { ICommand } from "wokcommands";

import warnSchema from "../../Module/warn-schema";

import setlogchannel from "../../Module/loging/setlogchannel";

import { TextChannel } from "discord.js";
import modAction from "../../Module/loging/mod-action";
import { dirname } from "path";

export default{
    name: `warn`,
    aliases: [`w`],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `add warn or see warn list or remove a warn with sub commands`,

    permissions:[`MANAGE_ROLES`],

    minArgs: 2,
    expectedArgs: `<sub_command> <user>`,
    callback: async({message, args, member: staff, guild}) => {

        if(!guild) return 'This command is only available for server'

        const user = message.mentions.members?.first()

        const subcmd = ['add', 'remove', 'list']

        if(!subcmd.includes(args[0])){
            const error = {
                color: 0xff0000,
                title: `:x: Invalide Format`,
                description:    `PLease follow the correct format. No proper sub-command.\n
                :round_pushpin: warn add <@user> <reason>\n
                :round_pushpin: warn remove <@user> <warn_id>\n
                :round_pushpin: warn list <@user>`,
                footer: {
                    text: `${message.author.tag}`
                }
            }
            message.channel.send({ embeds: [error] });
            return
        }

        if(!user) {
            const error = {
                color: 0xff0000,
                title: `:x: Invalide Format`,
                description:    `PLease follow the correct format. No user was tagged.\n
                :round_pushpin: warn add <@user> <reason>\n
                :round_pushpin: warn remove <@user> <warn_id>\n
                :round_pushpin: warn list <@user>`,
                footer: {
                    text: `${message.author.tag}`
                }
            }
            message.channel.send({ embeds: [error] });
            return
        }

        //console.log('user tagged')

        let target = args.slice(2).join(' ')  // reason for 'add' and warn_id for 'remove' subcommand.

        //console.log(`${test}`)

        switch (args[0]) {
           case 'add' : {
                
            if(!target) return 'Please give a reason for the warn'

            const warnings = await warnSchema.create({
                userID: user.id,
                guildID: guild?.id,
                staffID: staff.id,
                reason: target
            })

            message.reply (`<@${user}> is warned for ${warnings.reason}`)

            const action = `${user.displayName} has been warned}`

            modAction(action, user, staff, target, guild)

            return

           }

           case 'list' : {
               const warnings = await warnSchema.find({
                   userID: user.id,
                   guildID: guild?.id
               })

               let description = `Warnings for <@${user}>\n`

               for(const warn of warnings){
                   description += `**Warning ID:** ${warn._id}\n`
                   description += `**Date:** ${new Date(warn.createdAt).toLocaleDateString()}\n`
                   description += `**Staff:** <@${warn.staffID}>\n`
                   description += `**Reason:** ${warn.reason}\n\n`
               }

               const warnlist = {
                   title: `Warn list`,
                   description: `${description}`,
                   footer: {
                       text: message.author.id,
                   }
               };

               message.channel.send({ embeds: [warnlist] });

               return
           }

           case 'remove' : {
                if(!target) return 'Please provide the warn ID to remove that.'

                const warnings = await warnSchema.findByIdAndDelete(target)

                let description = 'Removed Warning details:\n\n'

                    description += `**Warning ID:** ${warnings._id}\n`
                    description += `**Date:** ${new Date(warnings.createdAt).toLocaleDateString()}\n`
                    description += `**Staff:** <@${warnings.staffID}>\n`
                    description += `**Reason:** ${warnings.reason}\n\n`

                const warnremove = {
                        title: `Warning Removed`,
                        description: `${description}`,
                        footer: {
                            text: message.author.id,
                        }
                };
     
                message.channel.send({ embeds: [warnremove] });
                const action = `${warnings._id} has been removed from ${user}}`

                modAction(action, user, staff, target, guild)
     
                return
           }
        }
    }
} as ICommand