const { Command } = require('discord.js-commando');

const sleep = require('system-sleep');


module.exports = class animCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'anim',
            group: 'fun',
            memberName: 'anim',
            description: 'Animate some messages.',
            examples: ['anim wow this actually works!'],
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like me to animate?',
                    type: 'string',
                    validate: text => {
                        if (text.split(' ').length > 10 ) return false;
                        return true;
                    }
                }
            ]
        });
    }
    async run(message, { text }) {
        var i = 0;
        async function Animate(anim, timeBetweenMessages) {
            message.delete();
            //var animate = args.join(" ");
            var output = anim.split(" ");
            if (output.length > 30) {
                sendEmbedded(null, "Please input a string with less than 30 words."); 
                return;
            }
            var m = await message.channel.send(output[0]);
            for (i = 0; i < output.length; i++) {
                m.edit(output[i]);
                sleep(`${timeBetweenMessages}`);      
            }
        }
        Animate(text, 500);
    }
};
