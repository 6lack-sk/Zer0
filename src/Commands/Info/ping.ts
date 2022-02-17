import { dirname } from 'path';
import { ICommand } from 'wokcommands'

export default {
    
    name: `ping`,
    aliases: [``],
    category: `${__dirname.split(dirname(__dirname))[1].split(`\\`)[1]}`,
    description: `Shaows bot ping
    \`\`\`Example:ping\`\`\``,

    callback: async({message, interaction, client}) => {
        
        const msg = await message.reply(`Ping: ${client.ws.ping} ms.`);

		msg.edit(
			`Ping: ${client.ws.ping} ms.\nMessage Ping: ${
				msg.createdTimestamp - message.createdTimestamp
			}`
		);
        
    }
} as ICommand