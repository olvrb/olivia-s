const { Command } = require('discord.js-commando');

const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
module.exports = class warnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warn',
            group: 'moderation',
            memberName: 'warn',
            aliases: ['warn'],
            description: 'Warn a user. Once a user reaches 600 warnpoints, the user is automatically kicked. Once it reaches 900 warnpoints, the user is automatically banned and its warnpoints are reset',
            examples: ['warn @oliver#9880 100'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user should i warn?',
                    type: 'user'
                },
                {
                    key: 'warnPoints',
                    prompt: 'How much would you like to warn the user for??',
                    type: 'integer'
                },
                {
                    key: "reason",
                    prompt: "Please indicate a reason for the warn.",
                    type: "string"
                }
            ]
        });
    }

    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']);
        return true;
    }

    async run(message, { user, warnPoints, reason }) {
        function isBetween(n, a, b) {
            return (n - a) * (n - b) <= 0;
        }
        db.fetchObject(user.id + message.guild.id + "_warnpoints").then(async currentWarnPoints => {
            console.log(currentWarnPoints.value);
            if (isBetween(+currentWarnPoints.value + +warnPoints, 900, 600)) {
                user = message.mentions.members.first();
                try {
                    await user.kick('Warnpoints exceeded')
                    const embed = new MessageEmbed()
                        .setFooter(this.client.user.username, this.client.user.avatarURL())
                        .setTimestamp()
                        .setTitle('Warn Kick')                        
                        .setDescription(`${user.user.id} has been kicked by <@${message.author.id}> because: ${reason}.`)
                    message.channel.send(embed);
                } catch (error) {
                    const embed = new MessageEmbed()
                        .setFooter(this.client.user.username, this.client.user.avatarURL())
                        .setTimestamp()
                        .setTitle('Warn Kick')                        
                        .setDescription(`Sorry ${message.author}, I couldn't kick because of : ${error}.`)
                    message.channel.send(embed);
                }
            } else if (+currentWarnPoints.value + +warnPoints > 900) {
                user = message.mentions.members.first();
                try {
                    await user.ban('Warnpoints exceeded')
                    const embed = new MessageEmbed()
                        .setFooter(this.client.user.username, this.client.user.avatarURL())
                        .setTimestamp()
                        .setTitle('Warn Ban')                        
                        .setDescription(`${user.user.id} has been banned by <@${message.author.id}> because: ${reason}.`)
                    message.channel.send(embed);
                } catch (error) {
                    const embed = new MessageEmbed()
                        .setFooter(this.client.user.username, this.client.user.avatarURL())
                        .setTimestamp()
                        .setTitle('Warn Ban')
                        .setDescription(`Sorry ${message.author}, I couldn't ban because of : ${error}.`)
                    message.channel.send(embed);
                }
            } else {
                const client = this.client;
    
                db.updateValue(message.author.id + message.guild.id + "_warnpoints", 10).then(i => {
                    console.log(i.value);
                });
    
                db.updateValue(user.id + message.guild.id + "_warnpoints", warnPoints).then((i) => {
                    const embed = new MessageEmbed()
                        .setFooter(client.user.username, client.user.avatarURL())
                        .setTimestamp()
                        .setDescription(`${user} has been warned for ${warnPoints}. His/her warnpoints are now at ${i.value}.`) //WOOO WORKS
                    message.channel.send(embed);
                });
            }
        });
        
    }
};