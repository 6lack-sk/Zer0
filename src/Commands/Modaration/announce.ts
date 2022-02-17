import { HexColorString, NewsChannel, Role, TextChannel } from "discord.js";
import { dirname } from "path";
import { ICommand } from "wokcommands";

export default{
    names: `announce`,
    aliases: ['announcement'],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Announce anything to announcement channel.
    \`\`\`Example:\nannounce <#channel> [@role] <text>\nannounce <927944140136796203> [@role] <text>\`\`\``,

    permissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],

    minArgs: 2,
    expectedArgs: `<channel> [role] <text>`,
    expectedArgsTypes: ['CHANNEL', 'ROLE', 'STRING'],

    callback:async ({message, guild, member:staff, args}) => {
        if(!guild) return `Please use a server for this command.`

        const botperms = ['MANAGE_MESSAGES']

        for(const perm of botperms){
            //@ts-ignore
            if(!guild.me?.permissions.has(perm)){
              const error = {
                color: 0xff0000,
                description: `:x: Error | I don't have **${perm}** permission`,
              };
  
              message.channel.send({ embeds: [error] });
              return
              }
        }

        let channel = message.mentions.channels.first() as TextChannel || NewsChannel

        if(!channel){
            channel = guild.channels.cache.get(args[0]) as TextChannel || NewsChannel
            
            if(!channel) return `Please mention a text channel or provide it's id.`
        }

        const role = message.mentions.roles.first() as Role

        if(role) { args.shift() }

        args.shift()

        let text = args.join(' ')

        if(text.length > 1024) return `Please keep your message in 1024 charaters. Yours is now ${text.length}.`

        let color = 'RED' as HexColorString

        if(role) {color = role.hexColor as HexColorString}

        const announcemnet = {
            color: color,
            description: `${text}`,
          };

          if(role) {channel.send(`${role}`)}
          
          channel.send({ embeds: [announcemnet] });

    }
}as ICommand