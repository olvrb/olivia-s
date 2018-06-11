const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class lmgtfyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'lmgtfy',
            group: 'utils',
            memberName: 'lmgtfy',
            description: 'lmgtfy something.',
            examples: ['lmgtfy ASLR'],
            args: [
                {
                    key: 'i',
                    prompt: 'What do you want to search for?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { i }) {
        if (message.channel.type != "dm") message.delete();
        i = encodeURIComponent(i);
        message.channel.send(`http://lmgtfy.com/?q=${i}`)
    }
};