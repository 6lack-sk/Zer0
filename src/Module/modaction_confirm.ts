import { Message, MessageActionRow, MessageButton } from "discord.js";

const modaction = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId(`yes`)
        .setLabel('Confirm')
        .setStyle('SUCCESS')
        .setEmoji('🔨')
    )
    .addComponents(
        new MessageButton()
        .setCustomId('no')
        .setLabel('Cancel')
        .setStyle('DANGER')
    )

export default modaction