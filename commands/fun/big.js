const { Command } = require('discord.js-commando');

const figlet = require('figlet');

module.exports = class bigCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'big',
            group: 'fun',
            memberName: 'big',
            description: 'MAKES EVERYTHING BIG.',
            examples: ['big hello world'],
            args: [
                {
                    key: 'biggify',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, { biggify }) {
        if (message.channel.type == "dm") message.delete();
        await figlet(biggify, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                message.channel.send("Something went wrong...");
                return;
            }
            var write = '```\n' + data + "\n```"
            message.channel.send(write);
        });

    }
};
