const { Command } = require('discord.js-commando');

const database = require('quick.db');
const { MessageEmbed } = require('discord.js');
module.exports = class moneyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'money',
            group: 'eco',
            memberName: 'money',
            description: 'Get a users balance.',
            examples: ['money'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which users balance would you like to find??',
                    type: 'user',
                    default: ''
                }
            ]
        });
    }
    run(message, { user }) {
        if (!message.guild) return;
        const client = this.client;
        if (user == '') user = message.author;
        database.fetchObject(user.id + message.guild.id).then(i => {
            const embed = new MessageEmbed()
                .setTitle(`${message.guild.name}'s **Bank**`)
                .setDescription(`${user}'s current balance is ${i.value} €`)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter(client.user.username, client.user.avatarURL());
            message.channel.send(embed);
        });
    }
};