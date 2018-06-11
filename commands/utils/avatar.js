const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class avatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            group: 'moderation',
            memberName: 'avatar',
            aliases: ['avatar'],
            description: 'Get the avatar of a user.',
            examples: ['avatar @oliver#9880'],
            args: [
                {
                    key: "user",
                    prompt: "Which user's avatar would you like to get?",
                    type: "user",
                    default: ""
                }
            ]
        });
    }

    async run(message, { user }) {
        if (!user) user = message.author;
        const embed = new MessageEmbed()
            .setTitle('Avatar')
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())
            .setImage(user.avatarURL())
        message.channel.send(embed);
    }
};