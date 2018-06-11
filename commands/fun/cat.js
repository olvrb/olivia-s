const { Command } = require('discord.js-commando');
const getImage = require("first-image-search-load");


module.exports = class catCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'fun',
            memberName: 'cat',
            description: 'Get a random cat image.',
            examples: ['cat']
        });
    }
    async run(message) {
        if (message.channel.type != "dm") message.delete();
        var imageArray = await getImage.getImagesArray("cat");
        message.channel.send(imageArray[Math.floor(Math.random() * imageArray.length) + 0 ]);
    }
};