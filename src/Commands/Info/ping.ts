import { ICommand } from 'wokcommands'

export default {
    
    name: `ping`,
    aliases: [``],
    category: `Info`,
    description: `Shaows bot ping`,

    callback: async({message, interaction, client}) => {
        
        const msg = await message.reply(`Ping: ${client.ws.ping} ms.`);

		msg.edit(
			`Ping: ${client.ws.ping} ms.\nMessage Ping: ${
				msg.createdTimestamp - message.createdTimestamp
			}`
		);
        
    }
} as ICommand