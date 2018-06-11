const { Command } = require('discord.js-commando');

const download = require('image-downloader')
const options = {
    url: '',
    dest: '../../downloads/memes'                  // Save to /path/to/dest/image.jpg
}

module.exports = class memeCommand extends Command {
    
    constructor(client) {
        super(client, {
            name: 'meme',
            group: 'fun',
            memberName: 'meme',
            description: 'Make a meme. Put the top text in quotes if you want to have multiple words.',
            examples: ['meme xy "this is" amazing', 'meme buzz memes memes everywhere'],
            throttling: {
                usages: 2,
                duration: 60
            },
            args: [
                {
                    key: 'newMeme',
                    prompt: 'Which meme would you like to use?',
                    type: 'string'
                },
                {
                    key: 'newTopText',
                    prompt: 'What text should be at the top?',
                    type: 'string'
                },
                {
                    key: 'newBottomText',
                    prompt: 'What text should be at the bottom?',
                    type: "string"
                }
            ]
        });
    }
    async run(message, { newMeme, newTopText, newBottomText }) {
        if (message.channel.type != "dm") message.delete();
        options.url = `https://memegen.link/${newMeme}/${newTopText.replace(' ', '_')}/${newBottomText.replace(' ', '_')}.jpg`
        var memeName = `${newMeme}${newTopText.replace(' ', '_')}${newBottomText.replace(' ', '_')}.jpg`;
        const m = await message.channel.send(':arrows_counterclockwise:');
        await message.channel.send({
            files: [
                {
                    attachment: options.url,
                    name: memeName + '.jpg'
                }
            ]
        });
        m.delete();
    }
};



