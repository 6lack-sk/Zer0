import { randomInt } from "crypto";
import { GuildMember } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";

export default{
    names: `hack`,
    aliases: [''],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Do a fake hack for a user
    \`\`\`Example:hack [@user]\`\`\``,

    callback:async ({message, member, guild}) => {

        if(!guild) return `looks like it's not a server. run the command in a server`
        const user = message.mentions.members?.first() as GuildMember

        if(!user) return `Make sure the user belongs to the server.`

        const access = randomInt(2)

        const msg = await message.reply(`hacking....\n‖‖‖‖‖‖‖`)
        msg.edit(`hacking...\n‖‖‖‖‖‖‖‖‖‖‖‖`)
        msg.edit(`hacking....\n‖‖‖‖‖‖‖‖‖‖‖‖‖‖‖‖‖‖`)

        if(access == 0){
            msg.edit(`\`Access Denied\``)
        }
        else if(access == 1){
            msg.edit(`\`Gottcha!!\nUser ID: ${user.id}\n Email: ${user.displayName}@discord.mail \n Password: ${user.joinedTimestamp}\``)   
        }else {msg.edit(`I broke my system. Will try again later.`)}
    }
}as ICommand