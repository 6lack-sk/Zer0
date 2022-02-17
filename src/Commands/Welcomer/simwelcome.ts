import { dirname } from 'path'
import { ICommand } from 'wokcommands'

export default {

    name: `simwelcome`,
    aliases: [`simwel`, `simw`],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Simulate the welcome message
    \'\'\'Exaple:simwelcome\'\'\'`,

    permissions: ['ADMINISTRATOR'],

    callback: async({member, client}) => {
    
        client.emit('guildMemberAdd', member)
        return `join simulated`

    }
} as ICommand