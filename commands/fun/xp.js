const { Command } = require('discord.js-commando');
const ytdl = require('ytdl-core')
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xp',
            group: 'fun',
            memberName: 'xp',
            description: 'Get your XP.',
            examples: ['xp']
        });
    }
    async run(message) {
        const client = this.client;
        db.fetchObject(message.author.id + message.guild.id + "_xp", Math.floor(Math.random() * 20) + 12).then((i) => {
            const embed = new MessageEmbed()
                .setFooter(client.user.username, client.user.avatarURL())
                .setTimestamp()
                .setTitle(`You currently have ${i.value} XP.`)
            message.channel.send(embed);
        })
    }
};
