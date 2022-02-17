import { dirname } from "path";
import { ICommand } from "wokcommands";

export default{
    names: `say`,
    aliases: [''],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Repeat back the massege you sent
    \`\`\`Example:say [message]\`\`\``,

    callback: async({message, args}) => {
        if(!args[0]) return 'looks like you testing me. You sent me nothing.'
        const mimik = args.slice(0).join(' ')
        message.reply(`${mimik}`)
    }
}as ICommand