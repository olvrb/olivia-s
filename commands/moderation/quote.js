const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');


module.exports = class QuoteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'quote',
            group: 'utils',
            memberName: 'quote',
            description: 'Quotes a message.',
            examples: ['quote 383968902620905472'],
            args: [
                {
                    key: 'messageToQuote',
                    prompt: 'Which message would you like to quote?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { messageToQuote }) {
        if (message.channel.type != "dm") message.delete();
        if (!messageToQuote) return message.reply('Please provide a valid message ID.')
        try {
            message.channel.fetchMessage(messageToQuote).then(message => {
                const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setAuthor(message.author.tag)
                    .setDescription(message.content)
                    .setFooter(message.createdAt)
                message.channel.send({ embed })
            })
        } catch (error) {
            return message.reply('That message could not be found.')
        }
    }
};