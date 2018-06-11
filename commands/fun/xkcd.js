const { Command } = require('discord.js-commando');
var xkcd = require('xkcd-imgs');


module.exports = class xkcdCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            group: 'fun',
            aliases: ['comic', 'randomcomic'],
            memberName: 'xkcd',
            description: 'Get a random xkcd comic.',
            examples: ['reply'],
        });
    }
    run(message) {
        if (message.channel.type != "dm") {
            message.delete();
        }
        xkcd.img(function(err, res){
            if(err) {
                message.channel.send(err);
            }
            message.channel.send(res.url);
        });
    }
};