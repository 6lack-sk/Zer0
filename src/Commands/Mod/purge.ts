import { Guild, User } from "discord.js";
import { CommandErrors, ICommand } from "wokcommands";
import modAction2 from "../../Module/mod-action 2";

export default{
    names: `purge`,
    aliases: [`clean`, `cc`],
    category: 'Mod',
    description: 'Deletes specified amount of messages',

    permissions: ['MANAGE_MESSAGES'],

    //requireRoles: true,

    minArgs: 1,
    expectedArgs: '<amount> [filter]',
    expectedArgsTypes: ['INTEGER', 'STRING'],

    callback: async({message, args, channel, guild, member: staff}) => {

        if(!guild) return `Command is only for server user.`

        if(!guild?.me?.permissions.has('MANAGE_MESSAGES')) return `I don't have manage message permission.`

        let action = ''
        let reason = ''
        let target: User | undefined
        let amount = parseInt(args[0]!)
            if(!amount) return 'please specify the amount of message you want to delete'

            if(message){ await message.delete()}

        const filter = args.slice(1).join(' ').toLowerCase()

        if (filter){
            const user = message.mentions.users.first()

            if(user) {

                let i = 1
                const messages = await channel.messages.fetch()
                .then(m => m.filter(msg => msg.author.id == user.id))
                .then(m => m.first(amount))

                channel.bulkDelete(messages, true)

                //messages.forEach((target) => {
                //        target.delete()
                //        i++
                //});

                action = `Deleted ${i} massages sent by ${user.tag}`
                message.channel.send(action)
                reason = `action taken against ${user}`
                target = user
            }
            else{
                let i = 1
                const messages = await channel.messages.fetch()
                .then(m => m.filter(msg => msg.content.toLowerCase().includes(filter)))
                .then(m => m.first(amount))

                channel.bulkDelete(messages, true)

                //messages.forEach((target) => {
                //        target.delete()
                //        i++
                //});   

                action = `Deleted ${i} massages having the word **${filter}**`
                message.channel.send(action) 
                reason = `messasges has the word **${filter}**`
            }
        }

        

        if(!filter){

            if(amount > 101) {amount = 100}
            
            const messages = await channel.messages.fetch({limit: amount})

            channel.bulkDelete(messages, true)

            action = `Deleted ${messages.size} massages from <#${channel.id}>`
            message.channel.send(action)
            reason = 'Clearing chat.'
        }

        
        modAction2(action, staff, reason, guild)

    }
}as ICommand