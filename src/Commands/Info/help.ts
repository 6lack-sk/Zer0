import { Interaction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import binfo from "../../Data/info.json"

export default{
    names: 'help',
    aliases: [''],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Shows all available commands
    \`\`\`Example:help  [command]\n help botinfo\`\`\``,

    slash: "both",

    expectedArgs: '[command]',
    expectedArgsTypes: ['STRING'],

    //testOnly: true,

    callback: async ({message, guild,instance, args, interaction}) => {

        const helpbutt = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Invite')
            .setStyle('LINK')
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${binfo.client_ID}&permissions=8&scope=bot`)
        )
        .addComponents(
            new MessageButton()
            .setLabel('Support Server')
            .setStyle('LINK')
            .setURL(`https://discord.gg/dGJB9qFGs2`)
        )
        .addComponents(
            new MessageButton()
            .setLabel('Vote')
            .setStyle('LINK')
            .setURL(`https://top.gg/bot/${binfo.client_ID}/vote`)

        )
        var cmdcategory: string[] = ['']
        let i = 0
        instance.commandHandler.commands.forEach((command: any) => {
            if(!cmdcategory.includes(command.category) && command.hidden !== true){
                cmdcategory[i] = command.category
                i++
            }
        })

        if(!args[0]){
        let description = '**Here is the command list:**\n\n'
        for(let k = 0; k < cmdcategory.length; k++){
            description += `**⁜ ${cmdcategory[k]}**\n»`
            instance.commandHandler.commands.forEach((command: any) => {
                if(command.category == cmdcategory[k]){
                    if(command.hidden !== true){
                        description += `\`${command.names[0]}\` `
                    }	
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
        if(message){
            message.reply({ 
                embeds: [help],
                components: [helpbutt]
            })
        }else{
            interaction.reply({
                embeds: [help],
                components: [helpbutt]
            })
        }
        }

        instance.commandHandler.commands.forEach((command: any) => {

            if(interaction){
                if( command.names.includes(args[0]) ||interaction.options.getString('command') == command.names){
                    const helpfor = {
                        title: `${binfo.bot_name}`,
                        description: `Help for ${args[0]} command
                        \`\`\`<> = required, [] = optional, \n() = aditional info not part of the command\`\`\``,
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
                        interaction.reply({ 
                            embeds: [helpfor]
                        })
                }
            }
                    if(message){
                        if( command.names.includes(args[0])){
                            const helpfor = {
                                title: `${binfo.bot_name}`,
                                description: `Help for ${args[0]} command
                                \`\`\`<> = required, [] = optional, \n() = aditional info not part of the command\`\`\``,
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
                            message.reply({ 
                                embeds: [helpfor]
                            })
                        }
                    }
                
        })

    }
}as ICommand