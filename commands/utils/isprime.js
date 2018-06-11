const { Command } = require('discord.js-commando');
const isPrime = require('prime-number');
const { MessageEmbed } = require('discord.js');
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'isprime',
            group: 'utils',
            aliases: ['prime', 'isodd'],
            memberName: 'isprime',
            description: 'Check if a number is prime.',
            examples: ['isprime 10'],
            args: [
                {
                    key: 'intToCheck',
                    prompt: 'What text would you like the bot to say?',
                    type: "integer"
                }
            ]
        });
    }
    run(message, { intToCheck }) {
        const embed = new MessageEmbed()
            .setDescription(isPrime(intToCheck))
            .setFooter('olivia', this.client.user.avatarURL())
            .setTimestamp()
        message.channel.send(embed);
    }
};


