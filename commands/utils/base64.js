const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class base64 extends Command {
    constructor(client) {
        super(client, {
            name: 'base64',
            aliases: ['b64', '64'],
            group: 'utils',
            memberName: 'base64',
            description: 'Encodes any string to base64. (currently a bit broken)',
            examples: ['base64 encode oliver is amazing'],
            args: [
                {
                    key: "toOrFrom",
                    prompt: "Do you want to convert to or from base64? (encode or decode)",
                    type: "string",
                    validate: toOrFrom => {
                        if (toOrFrom == "encode" || toOrFrom == "decode") return true;
                        return "Encode or decode?";
                    }
                },
                {
                    key: 'stringToConvert',
                    prompt: 'Which string to you want to encode/decode?',
                    type: 'string'
                }
            ]
        });    
    }
    run(message, { stringToConvert, toOrFrom }) {
        if (message.channel.type != "dm") message.delete();
        function to64(str) {
            return new Buffer(str).toString('base64');
        }
        function from64(str) {
            return new Buffer.from(str, 'base64').toString();
        }
        toOrFrom = toOrFrom.toLowerCase();
        if (toOrFrom == "encode") {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setTitle('Base 64')
                .addField('Input', stringToConvert)
                .addField('Output', to64(stringToConvert))
            message.channel.send(embed);            
        } else {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setTitle('Base 64')
                .addField('Input', stringToConvert)
                .addField('Output', from64(stringToConvert))
            message.channel.send(embed);
        }
    }
};