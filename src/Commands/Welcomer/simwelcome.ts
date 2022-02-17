import { dirname } from 'path'
import { ICommand } from 'wokcommands'
import fs from 'fs'

export default {

    name: `simwelcome`,
    aliases: [`simwel`, `simw`],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Simulate the welcome message
    \'\'\'Exaple:simwelcome\'\'\'`,

    permissions: ['ADMINISTRATOR'],

    callback: async({member, client}) => {
    
        client.emit('guildMemberAdd', member)
        return `join simulated`

    }
} as ICommand