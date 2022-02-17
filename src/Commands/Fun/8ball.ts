import { randomInt } from "crypto";
import { dirname } from "path";
import { ICommand } from "wokcommands";
import ran_ans from '../../Data/ran_ans.json'

export default{
    names: `8ball`,
    aliases: ['8'],
    category: `${__dirname.split(dirname(__dirname))[1]}`,
    description: `Gives a random answer to your question
    \`\`\`Example:8ball [question]\`\`\``,

    expectedArgs: '[question]',
    expectedArgsTypes: ['STRING'],

    callback: async ({message, args}) =>{
        if(!args[0]) return `don't wanna say something 🤔`
        let ran = randomInt(ran_ans.answers.length - 1)
        //if(ran == 0){ran = ran+1}

        message.reply(`${ran_ans.answers[ran]}`)
    }
}as ICommand