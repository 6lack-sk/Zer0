
import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'

export default {
    
    name: `botinfo`,
    aliases: [`binfo`],
    category: `Info`,
    description: `Shaows bot info`,

    callback: async({message, client}) => {
        
        const botinfo = {
            color: 0xff0000,
            title: `Info about ${binfo.bot_name}`,
            description: `${binfo.bot_description}`,
            thumbnail: {
                url: binfo.bot_logo,
            },
            fields: [
                {
                    name: `:vhs: Devlopers:`,
                    value: `**> ${binfo.dev_names}**`,
                },
                {
                    name:':robot: bot version',
                    value: `**> ${binfo.bot_ver}**`,
                    inline: true,
                },
                {
                    name: ':wrench: djs version',
                    value: `**> ${binfo.discord_ver}**`,
                    inline: true,
                },
                {
                    name: ':screwdriver: node.js version',
                    value: `**> ${binfo.node_ver}**`,
                    inline: true,
                },
                {
                    name: `:bangbang: Ping`,
                    value: `**> ${client.ws.ping} ms.**`,
                    inline: true,
                },
            ],
            footer: {
                text: `${binfo.credit}`,
                icon_url: `${binfo.bu_logo}`,
            }
        };
        message.channel.send({ embeds: [botinfo] });
        
    }
} as ICommand