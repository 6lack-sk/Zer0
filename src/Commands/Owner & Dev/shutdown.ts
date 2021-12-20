import { ICommand } from "wokcommands";

import imp from '../../Data/config.json';

export default {

    name: `shutdown`,
    aliases: [`shut`],
    category: `Owner`,
    description: `Shut the bot down`,

    minArgs: 1,
    expectedArgs: `<password>`,
    ownerOnly:true,
    testOnly:true,

    callback: async({message, args, client}) => {

        if (imp.rebot_pass !== args[0]){
            return `Incorrect Password`
        }

        message.reply(`Bot will shutdown in a while. \nPlease boot me again from console`)
        .then(() => process.exit())
    }

} as ICommand