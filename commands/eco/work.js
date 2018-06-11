const { Command } = require('discord.js-commando');

var database = require('quick.db');

const { MessageEmbed } = require('discord.js');

module.exports = class workCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'work',
            group: 'eco',
            memberName: 'work',
            description: 'Work once ever 24 hours.',
            throttling: {
                usages: 1,
                duration: 86400
            },
            examples: ['work']
        });
    }
    async run(message) {
        if (!message.guild) return;        
        const client = this.client;
        const randValue =  Math.floor(Math.random() * 10000) + 1;
        await database.updateValue(message.author.id + message.guild.id, randValue).then((i) => { // db.updateBalance grabs the (userID, value) value being how much you want to add, and puts it into 'i'.
            const embed = new MessageEmbed()
                .setTitle(`${message.guild.name}'s **Bank**`)
                .setDescription(`${message.author} worked really hard and earned **${randValue}**€!\n**Its new balance is:** ${i.value} €`)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter(client.user.username, client.user.avatarURL());
            message.channel.send(embed);
        })
    }
};