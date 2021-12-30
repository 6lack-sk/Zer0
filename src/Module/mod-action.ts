import { Guild, GuildMember, TextChannel, User } from "discord.js";
import setlogchannel from "./loging/setlogchannel";

export default async function modAction(action:string, user:User | GuildMember, staff:GuildMember | undefined, reason:String, guild:Guild ) {

    const result = await setlogchannel.findById(guild.id)

    if(!result) return

    const {channelID} = result

    const logchannel = guild.channels.cache.get(channelID) as TextChannel

    const taken = {
        color: 0xff0000,
        title: `${action}`,
        fields: [
            {
                name: `Name`,
                value: `${user}(${user.id})`,
                inline: true,
            },
            {
                name: `Responsible Staff`,
                value: `${staff}`,
                inline: true,
            },
            {
                name: `Reason`,
                value: `${reason}`,
                inline: false,
            }
        ]
    }
    logchannel.send({embeds: [taken]})
}

export const config = {
    displayName: 'Mod Action',
    dbName: 'MOD_ACTION',
}