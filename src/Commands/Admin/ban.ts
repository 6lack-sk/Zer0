import { ICommand } from "wokcommands";

import setlogchannel from "../../Module/loging/setlogchannel";

import { Interaction, TextChannel } from "discord.js";
import modaction from "../../Module/modaction_confirm";

export default {
    names: `ban`,
    aliases: ``,
    category: `Admin`,
    description: `Ban a member from the server`,

    permissions: [`BAN_MEMBERS`],

    minArgs: 1,
    expectedArgs: `<user> [reason]`,
    expectedArgsTypes: [`USER`, `STRING`],

    callback: async({message, args, member,guild, channel}) => {

        if(!guild) return 'This command is only available in Server.'

        const user = message.mentions.members?.first()

        if(!message.guild?.me?.permissions.has('BAN_MEMBERS')){
            const error = {
                color: 0xff0000,
                description: `:x: Error | I don't have **BAN_MEMBERS** permission`,
            };

            message.channel.send({ embeds: [error] });

            return
        }

        if(user == undefined){
            const error = {
                color: 0xff0000,
                title: `:x: Error | Please mention a user from the server(${guild.name})`,
                description: `<user>, [reason]`,
            };

            message.channel.send({ embeds: [error] });

            return
        }

        if(user == member){
            const error = {
                color: 0xff0000,
                title: `:x: Oh really :bangbang: `,
                description: `Nope, you can't ban yourself`,
            };

            message.channel.send({ embeds: [error] });

            return
        }

        if(!user.bannable) {
            const error = {
                color: 0xff0000,
                title: `:x: Error | Unable to ban`,
                description: `Please make sure that ${user} has lower roles than me. \n
                            Dragging me to the top in role window can be a possible fix`,
            };
            message.channel.send({embeds: [error]});
            return;
        }

        args.shift()
        let reason = args.join(' ')
        if(!reason){ reason =  "None"}

        if(reason.length > 1024){reason = args.slice(1, 1021)+'...'}

        const maction = modaction

        const msg = await message.reply({
            content: 'Are you sure?',
            components: [maction]
        })

        const filter = (butInt: Interaction) => {
            return message.author.id === butInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15
        })

        collector.on('end', async (collection) => {
            if(collection.first()?.customId === 'no') {
                msg.edit({
                     content: `❌| Mod action canceled.\n${user} has not been kicked from the server`,
                     components: []
                })
            }
            if(collection.first()?.customId === 'yes'){

                await user.ban({reason: `${reason}`})

                message.channel.send(`${user} is banned from the server`)

                

                const result = await setlogchannel.findById(guild.id)

                if(!result) return

                    const {channelID} = result

                    const logchannel = guild.channels.cache.get(channelID) as TextChannel

                const taken = {
                    color: 0xff0000,
                    title: `User banned`,
                    fields: [
                        {
                            name: `Name`,
                            value: `${user}`,
                            inline: true,
                        },
                        {
                            name: `Responsible Mod`,
                            value: `${message.member}`,
                            inline: true,
                        },
                        {
                            name: `Reason`,
                            value: `${reason}`,
                            inline: false,
                        }
                    ]
                }
                logchannel.send({embeds: [taken]})
            }
        })
    }
} as ICommand