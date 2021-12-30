import { CommandErrors, ICommand } from "wokcommands";

export default{
    names: `purge`,
    aliases: [`clean`, `cc`],
    category: 'Mod',
    description: 'Deletes specified amount of messages',

    maxArgs: 1,
    expectedArgs: '<amount>',
    expectedArgsTypes: ['INTEGER'],

    callback: async({message, args, channel}) => {
        const amount = args.length ? parseInt(args.shift()!) : 5

        if(message){ message.delete()}
        const {size} = await channel.bulkDelete(amount, true)
        message.channel.send(`Deleted ${size} massages.`)
    }
}as ICommand