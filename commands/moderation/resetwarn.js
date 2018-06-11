const { Command } = require('discord.js-commando');

const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
module.exports = class warnCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resetwarn',
            group: 'moderation',
            memberName: 'resetwarn',
            aliases: ['resetwarn'],
            description: 'reset all warnpoints.',
            examples: ['warn @oliver#9880 100']
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);
    }

    async run(message, { user, warnPoints, reason }) {
        await message.guild.members.forEach(async (member) => {
            var user = member;
            var pointsToRemove = (await db.fetchObject(user.id + message.guild.id + "_warnpoints").value);
            console.log(pointsToRemove);            
            await db.updateValue(user.id + message.guild.id + "_warnpoints", 0).then((i) => {
                //console.log(i.value);
            })
        }); 
    }
};