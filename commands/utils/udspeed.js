const { Command } = require('discord.js-commando');
const speedTest = require('speedtest-net');
const config = require('../../config.json')

module.exports = class udSpeed extends Command {
    constructor(client) {
        super(client, {
            name: 'udspeed',
            group: 'utils',
            memberName: 'udspeed',
            description: 'Tests up/down speeds.',
            examples: ['udspeed']
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);    
    }
    async run(message, { text }) {
        if (message.channel.type != "dm") message.delete();
        var mess = await message.channel.send(":arrows_counterclockwise:");
        const sppedTest = speedTest({maxTime: 5000});        
        sppedTest.on('data', data => {
            message.channel.send({embed: {
                color: 3447003,
                title: "Speed Test",
                url: "http://www.speedtest.net/",
                fields: [
                {
                    name: "Download Speed",
                    value: `${data.speeds.download} mbits/s`
                },
                {
                    name: "Upload Speed",
                    value: `${data.speeds.upload} mbits/s`
                },
                {
                    name: "Average Ping",
                    value: `${Math.round(data.server.ping)}ms`
                }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: this.client.user.avatarURL(),
                    text: `oliveJS`
                }
              }
            });
            mess.delete();            
        });

    }
};