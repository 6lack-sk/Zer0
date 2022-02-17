
import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'
import { dirname } from "path";

export default {
    name: `botinfo`,
    aliases: [`binfo`],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Shows bot information
    \`\`\`Example:botinfo\`\`\``,

    //hidden: true,

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
            ],
            footer: {
                text: `${binfo.credit}`,
                icon_url: `${binfo.bu_logo}`,
            }
        }
        message.channel.send({ embeds: [botinfo] });
        
    }
} as ICommand