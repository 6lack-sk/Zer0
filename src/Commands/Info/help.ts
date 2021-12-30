import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import binfo from "../../Data/info.json"

export default{
    names: 'help',
    aliases: [''],
    category: 'Info',
    description: 'Shows all available commands and features.',

    callback: async ({message, guild,instance, args}) => {
        var cmdcategory: string[] = ['']
        let i = 0
        instance.commandHandler.commands.forEach((command: any) => {
            if(!cmdcategory.includes(command.category)){
                cmdcategory[i] = command.category
                i++
            }
        })

        if(!args[0]){
        let description = '**Here is the command list:**\n\n'
        for(let k = 0; k < cmdcategory.length; k++){
            description += `**⁜ | ${cmdcategory[k]}**\n»`
            instance.commandHandler.commands.forEach((command: any) => {
                if(command.category == cmdcategory[k]){
                    description += `${command.names[0]}, `
                }
            });
            description += `\n\n`
        }

        const help = {
            title: `${binfo.bot_name}`,
            description: `${description}`,
            thumbnail: {
                url: `${binfo.bot_logo}`
            },
            color: 0xff0000,
            timestamp: new Date(),
            footer: {
                text: `${binfo.bot_name}`,
                icon_url: `${binfo.bot_logo}`
            }, 
        }
        message.channel.send({ embeds: [help]})
        return
        }

        instance.commandHandler.commands.forEach((command: any) => {
            if(command.names.includes(args[0])){
                const helpfor = {
                    title: `${binfo.bot_name}`,
                    description: `Help for ${args[0]} command`,
                    color: 0xff0000,
                    thumbnail: {
                        url: `${binfo.bot_logo}`
                    },
                    fields: [
                        {
                            name: `Alieses`,
                            value: `${command.names}`,
                            inline: false
                        },
                        {
                            name: `Description`,
                            value: `${command.description}`,
                            inline: false
                        },
                    ]
                }
                message.channel.send({embeds: [helpfor]})
                console.log(command)
            }
        })

    }
}as ICommand