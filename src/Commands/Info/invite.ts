import { Permissions } from 'discord.js';
import { ICommand } from 'wokcommands'

export default {
    
    name: `invite`,
    aliases: [``],
    category: `Info`,
    description: `Generate a default invite link for the bot`,

    callback: async({message, client}) => {

        const link = client.generateInvite({
            permissions:[
                Permissions.FLAGS.SEND_MESSAGES
            ],
            scopes: ['bot'],
          });
        
        const msg = await message.reply(`Invite link: ${link}`);

		msg.edit(
			`Invite link: ${link}\nNote: You can just go to my profile and press the button **Add to Server** to add me`
		);
        
    }
} as ICommand