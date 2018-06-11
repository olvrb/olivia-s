const { Command } = require('discord.js-commando');

const { MessageEmbed } = require('discord.js');

const database = require('quick.db');

module.exports = class setmoneyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'setmoney',
            group: 'eco',
            memberName: 'setmoney',
            description: 'Sets the balance of a user.',
            examples: ['setmoney'],
            args: [
                {
                    key: "user",
                    prompt: "Which user should i set a new balance to?",
                    type: "user"
                },
                {
                    key: 'newAmount',
                    prompt: 'What should i set the users balance to?',
                    type: 'integer',
                    default: 0
                }
            ]
        });
    }
    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.permissions.has('MANAGE_GUILD');
        return true;
    }
    async run(message, { user, newAmount }) {
        if (!message.guild) return;        
        var currentBalance;
        await database.fetchObject(user.id + message.guild.id).then(i => {
                newAmount = newAmount - i.value;
                currentBalance = i.value - newAmount;
            });

        const client = this.client; 
        
        await database.updateValue(user.id + message.guild.id, newAmount)      
        const embed = new MessageEmbed()
            .setTitle(`**${message.guild.name}'s Bank**`)
            .setDescription(`Removed ${newAmount}€ from ${user}'s account.`)  
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL());
        message.channel.send(embed);
    }
};