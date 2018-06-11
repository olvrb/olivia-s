const { Command } = require('discord.js-commando');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'modlog',
            group: 'moderation',
            memberName: 'modlog',
            description: 'Toggle modlog. Requires a channel called either "modlog", "mod-log", or "logs". (toggle is currently not working.)',
            examples: ['modlog'],
            args: [
                {
                    key: 'onOrOff',
                    prompt: "Do you want to set it to on or off?",
                    type: "string",
                    validate: onOrOff => {
                        if (onOrOff == "on" || onOrOff == "off") return true;
                        return false;
                    }
                }
            ]
        });
    }
    
    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.hasPermission('MANAGE_GUILD'); 
        return true;
    }

    async run(message, { onOrOff }) {
        const client = this.client;
        if (onOrOff == "on") {
            await db.updateText(message.guild.id + "_modlog", "on");
            console.log(db.updateText(message.guild.id + "_modlog", "on").text)
            console.log("set to on")
        } else if (onOrOff == "off") {
            await db.updateText(message.guild.id + "_modlog", "off");    
            console.log("set to off")        
        }

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle('Modlog')
            .setDescription(`Successfully set modlog to ${await db.fetchObject(message.guild.id + "_modlog").text}`)
        console.log(await db.fetchObject(message.guild.id + "_modlog").text)
        message.channel.send(embed);
    }
};
