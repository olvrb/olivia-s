const { Command } = require('discord.js-commando');
module.exports = class addEmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            group: 'utils',
            memberName: 'emoji',
            description: 'Add an emoji.',
            guildOnly: true,
            examples: ['emoji https://www.youtube.com/watch?v=fGx6K90TmCI'],
            args: [
                {
                    key: 'url',
                    prompt: 'Please input a URL.',
                    type: 'string',
                    validate: url => {
                        return url.endsWith('.png') | url.endsWith('.jpeg') | url.endsWith('.gif') | url.endsWith('.jpg');
                    }
                },
                {
                    key: "name",
                    prompt: 'Please input a name for the emoji.',
                    type: 'string',
                    validate: name => {
                        return name.length < 32;
                    }
                }
            ]
        });
    }

    hasPermission(message) {
        return message.member.permissions.has('MANAGE_EMOJIS')
    }

    async run(message, { url, name }) {
        message.guild.createEmoji(url, name)
            .then(emoji => message.channel.send(`Created new emoji ${emoji}!`))      
    }
};
