import { dirname } from "path";
import { ICommand } from "wokcommands";

export default{
    names: `test`,
    aliases: [`t`],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `test command`,

    hidden: true,

    callback: async ({message, args, client}) => {

        const b = args.findIndex(x => x === `|`)

        const title = args.slice(0,b).join(` `)

        const description = args.slice(b+1).join(` `)

        const embed = {
            color: 0x00ff00,
            title: title,
            description: description,
        }

        message.channel.send({ embeds: [embed] })
    }
}as ICommand