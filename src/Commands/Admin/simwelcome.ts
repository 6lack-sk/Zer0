import { ICommand } from 'wokcommands'

export default {

    name: `simwelcome`,
    aliases: [`simwel`, `simw`],
    category: `Welcome & Leave`,
    description: `Simulate the welcome message`,

    permissions: ['ADMINISTRATOR'],

    callback: async({member, client}) => {
    
        client.emit('guildMemberAdd', member)
        return `join simulated`

    }
} as ICommand