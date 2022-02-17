import { dirname } from "path";
import { ICommand } from "wokcommands";

export default {

    name: `shutdown`,
    aliases: [`shut`],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Shut the bot down`,

    minArgs: 1,
    expectedArgs: `<bot_owner_pass>`,
    ownerOnly:true,
    hidden: true,

    callback: async({message, args, client}) => {

        if(message.deletable) {message.delete()}

        if (process.env.rebot_pass !== args[0]){
            return `Access Denied`
        }
        try {
            message.reply(`Bot will shutdown in a while. \nPlease boot me again from console`)
            .then(() => process.exit()) 
        } catch (error) {
            return 'Access Denied'
        }
        
    }

} as ICommand