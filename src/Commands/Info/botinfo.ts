
import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'

export default {
    
    name: `botinfo`,
    aliases: [`binfo`],
    category: `Info`,
    description: `Shaows bot info`,

    callback: async({message, client}) => {

        let uptime = client.uptime

        if(uptime == null) {uptime = 0}
        
        const ms = uptime % 1000
        uptime = (uptime - ms)/1000
        const sec = uptime % 60
        uptime = (uptime - sec)/60
        const min = uptime % 60
        uptime = (uptime - min)/60
        const hour = uptime % 24
        uptime = (uptime - hour)/24
        const days = uptime
        
        
        const botinfo = {
            color: 0xff0000,
            title: `Info about ${binfo.bot_name}`,
            description: `${binfo.bot_description}`,
            thumbnail: {
                url: binfo.bot_logo,
            },
            fields: [
                {
                    name: `**Dev & Versions Info**\n» Devlopers:`,
                    value: `> ${binfo.dev_names}`,
                },
                {
                    name:'» bot version',
                    value: `> ${binfo.bot_ver}`,
                    inline: true,
                },
                {
                    name: '» djs version',
                    value: `> ${binfo.discord_ver}`,
                    inline: true,
                },
                {
                    name: '» node.js version',
                    value: `> ${binfo.node_ver}`,
                    inline: true,
                },
                {
                    name: '**Bot & System Status Info**\n» CPU',
                    value: '> Intel®️ Xenon®️ @ 2.20 GHz'
                },
                {
                    name: `» Ping`,
                    value: `> ${client.ws.ping} ms.`,
                    inline: true,
                },
                {
                    name: '» Uptime',
                    value: `> ${days}d ${hour}h ${min}min ${sec}sec`,
                    inline: true
                },
            ],
            footer: {
                text: `${binfo.credit}`,
                icon_url: `${binfo.bu_logo}`,
            }
        }
        message.channel.send({ embeds: [botinfo] });
        
    }
} as ICommand