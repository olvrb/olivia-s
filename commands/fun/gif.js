const { Command } = require('discord.js-commando');

var giphy = require( 'giphy-api' )( 'JeHK10ZBmNg72Fe676NUOOHVtvKX2doG' );

module.exports = class gifCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            group: 'utils',
            memberName: 'gif',
            description: 'Gets a random gif off of giphy.',
            examples: ['gif but why', 'gif'],
            args: [
                {
                    key: 'search',
                    prompt: 'What do you want to search for?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }
    run(message, { search }) {
        if (message.channel.type != "dm") message.delete();
        if (search == "peener") {
            message.channel.send("peener doesn't work ok.");
        } else {
            if (!search) {
                giphy.random({
                    rating: 'g',
                    limit: 1
                }, function (err, res) {
                    if (err) {
                    message.channel.send(err);
                    }else {
                        message.channel.send(res.data.image_original_url);
                    }
                });
            } else if (search){
                giphy.search({
                    q: search,
                    limit: 1,
                    rating: "g"
                }, function (err, res) {
                    try {
                        message.channel.send(res.data[0].embed_url);                    
                        
                    } catch (uncaughtException) {
                        message.channel.send(`${search} doesn't work ok.`);
                    }
                    // Res contains gif data!
                });
            }
        }
    }
};