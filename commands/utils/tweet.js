const { Command } = require('discord.js-commando');

const config = require('../../config.json');

var Twitter = require('twitter');
var twitterClient = new Twitter({
    consumer_key: config.consumer_key,
    consumer_secret: config.consumer_secret,
    access_token_key: config.access_token_key,
    access_token_secret: config.access_token_secret
});


module.exports = class tweetCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tweet',
            group: 'utils',
            memberName: 'tweet',
            description: 'Tweets.',
            examples: ['tweet hello world!'],
            args: [
                {
                    key: 'text',
                    prompt: 'What would you like to tweet?',
                    type: 'string'
                }
            ]
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);    
    }
    
    run(message, { text }) {
        twitterClient.post('statuses/update', {status: text}, function(error, tweet, response) {
            //tweet will contain information about the tweet sent, if it sends
            message.channel.send(`tweeted: url: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`);
            console.log(`tweeted: ${text}`)      
            if (error) {
              console.log(error) //log error if there is one
              message.channel.send(error);
            }
        });
    }
};
