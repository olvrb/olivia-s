const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class aesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'aes',
            group: 'fun',
            memberName: 'aes',
            description: 'Make a string look a lot better.',
            examples: ['aes cool'],
            args: [
                {
                    key: 'input',
                    prompt: 'Which text to you want to make look better?',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, { input }) {
        const toCoolify = input.split('').join(' ');
        const embed = new MessageEmbed()
            .setDescription(toCoolify)
            .setFooter('olivia')
            .setTimestamp()
            .setFooter("olivia", this.client.user.avatarURL())
        message.channel.send(embed);
    }
};