const { Command } = require('discord.js-commando');
const getImage = require("first-image-search-load");


module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'coin',
            aliases: ['coinflip', 'flip'],
            group: 'fun',
            memberName: 'coin',
            description: 'Flip a coin!',
            examples: ['coin']
        });
    }
    async run(message) {
        if (message.channel.type != "dm") message.delete();
        var coin = Math.floor(Math.random() * 2) + 1;
        if (coin == 1) {
            message.channel.send("Flipped coin and landed on: tails.");
        } else {
            message.channel.send("Flipped coin and landed on: heads.");
        }
    }
};