import binfo from "../../Data/info.json";

import { ICommand } from 'wokcommands'
import { dirname } from "path";

export default {
    
    name: `servericon`,
    aliases: [`sicon`],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Shows server icon
    \`\`\`Example:servericon\`\`\``,	

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