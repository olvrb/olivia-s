const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const db = require('quick.db');
const sleep = require('system-sleep');
module.exports = class announceCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            group: 'utils',
            memberName: 'announce',
            description: 'Announces new features or bugs.',
            examples: ['announce woohoo'],
            args: [
                {
                    key: "version",
                    prompt: `Which is the new version?`,
                    type: "string"
                },
                {
                    key: "announcement",
                    prompt: "",
                    type: "string",
                    default: "I\'ve just been updated with some new features or bug fixes! Do help to see if a command has been added!"
                }

            ]
        });    
    }
    hasPermission(message) {
        return this.client.isOwner(message.author);    
    }
    async run(message, { announcement, version }) {
        if (announcement) {
            const embed = new MessageEmbed()
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setTimestamp()
                .setTitle('**Update!**')
                .setDescription(announcement)
                .addField('New Version', `${version}`);
            this.client.guilds.forEach(async g => {
                var generalChannel = await g.channels.find('name', 'general'); 
                if (!generalChannel) return;             
                generalChannel.send(embed).catch(sendErr => console.log(`Missing permissions to send in ${g.name}`))   
                sleep(500);      
            });
        } else {
            const embed = new MessageEmbed()
                .setFooter(this.client.user.username, this.client.user.avatarURL())
                .setTimestamp()
                .setTitle('**Update!**')
                .setDescription(`I\'ve just been updated with some new features or bug fixes! Do @${this.client.user.username}#${this.client.user.discriminator} help to see if a command has been added!`)
                .addField('New Version', `${version}`);                
            this.client.guilds.forEach(async g => {
                var generalChannel = await g.channels.find('name', 'general');    
                if (!generalChannel) return;                             
                generalChannel.send(embed).catch(sendErr => console.log(`Missing permissions to send in ${g.name}`))   
                sleep(500);         
            });
        }
    }
};