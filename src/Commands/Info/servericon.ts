import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'

export default {
    
    name: `servericon`,
    aliases: [`sicon`],
    category: `Info`,
    description: `Shows server icon`,

    callback: async({message, guild}) => {

        if(!guild) return

        var icon = guild.iconURL();

        //if (guild.iconURL()== null){
        //    icon = `${binfo.noicon_img}`;
        //}

        const servericon = {
            color: 0xff0000,
            title: `Server Icon`,
            url: icon || binfo.noicon_img,
            image: {
                url: icon || binfo.noicon_img,
            },
            timestamp: new Date(),
            footer: {
                text: `${message.author.tag}`,
            },
        };
        
        message.channel.send({ embeds: [servericon] });
    }
} as ICommand