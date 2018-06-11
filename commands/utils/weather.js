const {
    Command
} = require('discord.js-commando');

var weather = require('weather-js');

const {
    MessageEmbed
} = require('discord.js');

module.exports = class weatherCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'weather',
            group: 'utils',
            memberName: 'weather',
            description: 'Look up the weather for a city.',
            examples: ['weather stockholm'],
            args: [{
                key: 'city',
                prompt: 'Which city\'s weather would you like to get?',
                type: 'string'
            }]
        });
    }
    run(message, {
        city
    }) {
        const client = this.client;
        if (message.channel.type != "dm") message.delete();
        weather.find({
            search: city,
            degreeType: 'C'
        }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                try {
                    message.channel.send({
                        embed: {
                            color: 3447003,
                            author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL
                            },
                            title: "Weather",
                            description: `Current weather in ${result[0].location.name}`,
                            fields: [{
                                    name: `Current Temperature`,
                                    value: `${result[0].current.temperature}°C`,
                                    inline: true
                                },
                                {
                                    name: "Todays Low",
                                    value: `${result[0].forecast[0].low}°C`,
                                    inline: true
                                },
                                {
                                    name: "Todays High",
                                    value: `${result[0].forecast[0].high}°C`,
                                    inline: true
                                }
                            ],
                            footer: {
                                text: 'olivia',
                                icon_url: client.user.avatarURL(),
                            },
                            timestamp: new Date()
                        }
                    });
                } catch (err) {
                    let embed = new MessageEmbed()
                        .setDescription(`Couldn't find the weather for "${city}"`)
                        .setFooter(client.user.username, client.user.avatarURL())
                        .setTimestamp()
                    message.channel.send(embed);
                }
            }
        });
    }
};