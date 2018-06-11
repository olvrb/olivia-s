const { Command } = require('discord.js-commando');
const getImage = require("first-image-search-load");


module.exports = class birbCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'birb',
            group: 'fun',
            memberName: 'birb',
            description: 'Get a random birb image.',
            examples: ['birb']
        });
    }
    async run(message) {
        if (message.channel.type != "dm") message.delete();
        var imageArray = await getImage.getImagesArray("birb");
        message.channel.send(imageArray[Math.floor(Math.random() * imageArray.length) + 0 ]);
    }
};