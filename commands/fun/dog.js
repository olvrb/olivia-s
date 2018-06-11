const { Command } = require('discord.js-commando');
const getImage = require("first-image-search-load");


module.exports = class dogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dog',
            group: 'fun',
            memberName: 'dog',
            description: 'Get a random dog image.',
            examples: ['dog']
        });
    }
    async run(message) {
        if (message.channel.type != "dm") message.delete();
        var imageArray = await getImage.getImagesArray("dog");
        message.channel.send(imageArray[Math.floor(Math.random() * imageArray.length) + 0 ]);
    }
};