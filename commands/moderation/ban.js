const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js')


module.exports = class banCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            group: 'moderation',
            memberName: 'ban',
            description: 'Bans a specified user.',
            examples: ['ban @oliver being a bad boy'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to ban?',
                    type: 'user'
                },
                {
                    key: "reason",
                    prompt: 'Please indicate a reason for the ban.',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }

    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.hasPermission('BAN_MEMBERS'); 
        return true;       
    } 

    async run(message, { user, reason }) {
        message.delete();
        var member = message.mentions.members.first();
        try {
            await member.ban(reason)
            let embed = new MessageEmbed()
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setTimestamp()
                .setDescription(`<@${member.user.id}> has been banned by <@${message.author.id}> because: ${reason}`)
            message.channel.send(embed);
            
        } catch (error) {
            message.channel.send(`Sorry <@${message.author}> I couldn't ban because of : ${error}`)
            
        }
    }
};