const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core')
const db = require('quick.db');
var isPlaying = false;
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Play song in a voice channel',
            examples: ['play https://www.youtube.com/watch?v=fGx6K90TmCI'],
            args: [
                {
                    key: 'url',
                    prompt: 'Please input a URL.',
                    type: 'string'
                }
            ]
        });
    }
    async run(message, { url }) {
        var queue = [];        
        var voiceChannel = message.member.voiceChannel;
        console.log(this.client.voiceConnections);
        if (!this.client.voiceConnections.has(message.guild.id)) {
            play(url);
        } else {
            queue.splice((queue.length - 1), 1, url);  
            console.log(`added ${url} to queue: ${queue}`);
        }

        function play(videoURL) {
            voiceChannel.join().then(async connection => {
                queue.splice(0, 1, videoURL);  
                console.log(queue);          
                console.log(`joined channel and playing video`);
                dispatcher = await connection.playStream(ytdl(queue[0]));
                //db.updateText(message.guild.id + '_isplaying', 'true');
                dispatcher.on("end", end => {
                    console.log("left channel");
                    isPlaying = false;
                    queue = queue.shift();
                    play(queue[0]);
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
        }
    }
};
