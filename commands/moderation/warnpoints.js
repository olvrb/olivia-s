const { Command } = require('discord.js-commando');

const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
module.exports = class warnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warnpoints',
            group: 'moderation',
            memberName: 'warnpoints',
            aliases: ['warnpoints'],
            description: 'Get the warnpoints of a user.',
            examples: ['warn @oliver#9880 100'],
            args: [
                {
                    key: "user",
                    prompt: "",
                    type: "user",
                    default: ''
                }
            ]
        });
    }

    async run(message, { user }) {
        const client = this.client;
        if (!user) user = message.author;
        db.fetchObject(user.id + message.guild.id + "_warnpoints").then(i => {
            let embed = new MessageEmbed()
                .setFooter(client.user.username, client.user.avatarURL())
                .setTimestamp()
                .setDescription(`${user}'s warnpoints are currently at ${i.value}.`)
            message.channel.send(embed);
        });      
    }
};