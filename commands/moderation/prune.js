const { Command } = require('discord.js-commando');


module.exports = class pruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            group: 'moderation',
            memberName: 'prune',
            aliases: ['purge', 'remove'],
            description: 'Replies with a Message.',
            examples: ['prune 10'],
            args: [
                {
                    key: 'amount',
                    prompt: 'How many messages would you like to delete?',
                    type: 'integer'
                }
            ]
        });
    }

    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.hasPermission('MANAGE_MESSAGES'); 
        return true;
    }

    async run(message, { amount }) {
        const deleteCount = parseInt(amount, 10);
        if (!deleteCount || deleteCount <= 0 || deleteCount > 100)
            return message.channel.send("Please provide a number between 0 and 100 for the number of messages to delete");
        const fetched = await amount;
        message.channel.bulkDelete(+fetched + +1)
            message.channel.send(`Deleted ${fetched} messages.`)
            .catch(error => message.channel.send(`Couldn't delete messages because of: ${error}`));
    }
};