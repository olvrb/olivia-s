const { Command } = require('discord.js-commando');


module.exports = class nickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nick',
            group: 'moderation',
            memberName: 'nick',
            aliases: ['nickname'],
            description: 'Replies with a Message.',
            examples: ['nick @oliver#9880 thief'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user should i rename?',
                    type: 'user'
                },
                {
                    key: 'newNick',
                    prompt: 'Which should the new username be?',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.hasPermission('MANAGE_NICKNAMES'); 
        return true;
    }

    async run(message, { user, newNick }) {
        message.mentions.members.first().setNickname(newNick, "olivia").catch(error => {
            message.channel.send("Error setting new nickname.")
        })
        .then(message.channel.send(`Successfully changed nickname to "${newNick}"`))
    }
};