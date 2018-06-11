const  { MessageEmbed } =  require('discord.js');

const { Command } = require('discord.js-commando');


module.exports = class reverseCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reverse',
            aliases: ['rev'],
            group: 'fun',
            memberName: 'reverse',
            description: 'Reverse any string.',
            examples: ['reverse kit kat'],
            args: [
                {
                    key: 'toRev',
                    prompt: 'What text would you like to reversee?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { toRev }) {
        if (toRev == "kit kat") {
            let embed = new MessageEmbed()
                .setTimestamp()
                .setTitle('**Reverse**')
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setDescription("kat kit");        
            message.channel.send(embed);
        } else {
            let embed = new MessageEmbed()
                .setTimestamp()
                .setTitle('**Reverse**')
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setDescription(toRev.split("").reverse().join(""));
            message.channel.send(embed);
        }
    }
};