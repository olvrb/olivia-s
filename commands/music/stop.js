const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core')
const db = require('quick.db');
var isPlaying = false;
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            group: 'music',
            memberName: 'stop',
            description: 'Stop playing.',
            examples: ['stop']
        });
    }
    async run(message) {
        const vc = message.member.voiceChannel;
        vc.leave();
        message.reply('Stopped.');
    }
};
