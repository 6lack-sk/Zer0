import { Client } from "discord.js";

export default (client: Client) => {

    const statusoptions = [
        `Black Universe`,
        `server stats`,
        `something funny`,
        `and thinking`
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
        setTimeout(update, 1000 * 60 * 3)
    }
    update()

}

export const config = {
    displayName: 'Status Change',
    dbName: 'STATUS_CHANGE',
}