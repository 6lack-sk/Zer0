import { TextChannel } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import binfo from "../../Data/info.json"

export default{
    names: `suggest`,
    aliases: ['suggestions'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Suggest for a new feature or any changes to the bot
    \`\`\`Example:suggest <suggestion details> \`\`\``,

    minArgs: 1,
    expectedArgs: '<suggestions>',
    expectedArgsTypes: ['STRING'],

    callback: async ({message, guild, args, client}) => {
        const bug = args.join(' ')
        if(!bug) return `Please describe your suggestion to make it effective.`

        const report ={
            title: `**New Suggestion**`,
            color: 0xff0000,
            fields: [
                {
                    name: `Suggested to:`,
                    value: bug
                },
                {
                    name: `Suggested by:`,
                    value: `${message.author.tag}(${message.author.id})`,
                },
                {
                    name: `Suggested from:`,
                    value: `${guild?.id}`
                }
            ],
            timestamp: new Date()
        }
        const channel = client.channels.cache.get(binfo.suggest_channel_id) as TextChannel
        message.author.send('Thanks for the suggestion. Dev team will review and try to implement if possible.')
        .catch ((error) => {
            message.reply('Thanks for the suggestion. Dev team will review and try to implement if possible.')
        })

        if(!channel) {
            console.log('bug_channel_id is broken. No report will be recieved')
            return
        }
        const msg = await channel.send({embeds: [report]})   

        const msgID = msg.id

        console.log(msgID)
    }
}as ICommand