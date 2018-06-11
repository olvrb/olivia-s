const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core')
const db = require('quick.db');
var fs = require('fs');
var download = require('file-download')

var isPlaying = false;
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'radio',
            group: 'music',
            memberName: 'radio',
            description: 'radio song in a voice channel',
            examples: ['radio https://www.youtube.com/watch?v=fGx6K90TmCI'],
            args: [
                {
                    key: 'url',
                    prompt: 'Please input a URL.',
                    type: 'string',
                    default: ""
                }
            ]
        });
    }
    async run(message, { url }) {
        const voiceChannel = message.member.voiceChannel;
        if (url && url.endsWith(".m3u")) {            
           var options = {
               directory: "./radio/",
               filename: "listen.m3u"
           }
           download(url, options, function(err){
               if (err) console.log(err)
               console.log("meow")
           }) 
            


            voiceChannel.join().then(async connection => {
                const playFile = await fs.readFileSync('./playing.m3u');
                const dispatcher = await connection.playFile(playFile);
                dispatcher.on('end', () => {
                    console.log("left channel");
                    voiceChannel.leave();
                });
            })                
        }
    }
};
