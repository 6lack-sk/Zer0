import { Client } from "discord.js";

export default (client: Client) => {

    const users = client.guilds.cache.map(guild => guild.memberCount).reduce((a,b) => a + b, 0)

    const statusoptions = [
        `Black Universe`,
        `server stats`,
        `something funny`,
        `and thinking`,
        `${users} users`
    ]

    let counter = 0

    const update = () => {
        client.user?.setPresence({
            status: 'online',
            activities:[{
                name: statusoptions[counter],
                type: 'WATCHING'
            }
            ]
        })
        if(++counter >= statusoptions.length) {
            counter = 0
        }
        setTimeout(update, 1000 * 30)
    }
    update()

}

export const config = {
    displayName: 'Status Change',
    dbName: 'STATUS_CHANGE',
}