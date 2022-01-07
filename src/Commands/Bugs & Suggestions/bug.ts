import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";
import binfo from "../../Data/info.json"

export default{
    names: `bug`,
    aliases: [''],
    category: `Bugs & Suggestions`,
    description: `Report if you find a bug`,

    minArgs: 1,
    expectedArgs: '<bug details>',
    expectedArgsTypes: ['STRING'],

    callback: async ({message, guild, args, client}) => {
        const bug = args.join(' ')
        if(!bug) return `Please provide the details of the bug you found.`

        const report ={
            title: `**Bug Reported**`,
            color: 0xff0000,
            fields: [
                {
                    name: `Bug`,
                    value: bug
                },
                {
                    name: `Reported by:`,
                    value: `${message.author.tag}(${message.author.id})`,
                },
                {
                    name: `Reported from:`,
                    value: `${guild?.id}`
                }
            ],
            timestamp: new Date()
        }
        const channel = client.channels.cache.get(binfo.bug_channel_id) as TextChannel
        message.author.send('Bug Reported. Thank you for the contribution.')
        .catch ((error) => {
            message.reply('Bug Reported. Thank you for the contribution.')
        })

        if(!channel) {
            console.log('bug_channel_id is broken. No report will be recieved')
            return
        }
        channel.send({embeds: [report]})   
    }
}as ICommand