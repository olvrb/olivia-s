const { MessageEmbed } = require('discord.js')
const { Command } = require('discord.js-commando');


module.exports = class kickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'moderation',
            memberName: 'kick',
            //userPermissions: ['KICK_MEMBERS'],
            description: 'Kicks a specified user.',
            examples: ['kick @moshi spamming'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to kick?',
                    type: 'user'
                },
                {
                    key: "reason",
                    prompt: 'Please indicate a reason for the kick.',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.hasPermission('KICK_MEMBERS'); 
        return true;
    } 

    async run(message, { user, reason }) {
        message.delete();
        var member = message.mentions.members.first();
        try {
            await member.kick(reason)
            let embed = new MessageEmbed()
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setTimestamp()
                .setDescription(`<@${member.user.id}> has been kicked by <@${message.author.id}> because: ${reason}`)
            message.channel.send(embed);
            
        } catch (error) {
            message.channel.send(`Sorry <@${message.author}> I couldn't kick because of : ${error}`)
        }
    }
};