const sleep = require('system-sleep');
const { Command } = require('discord.js-commando');

const { MessageEmbed } = require('discord.js');

module.exports = class geninvCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'geninv',
            group: 'utils',
            memberName: 'geninv',
            description: 'Generates invites for each server i\'m in.',
            examples: ['geninv']
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);        
	}

    run(message) {
        if (message.channel.type != "dm") message.delete();        
        this.client.guilds.forEach(g => g.channels.first().createInvite()
            .catch(err => message.author.send(`Missing permissions to create invite for ${g}`))
            .then(i => {
                message.author.send(i.url)
                sleep(500);
            })
        )
        const embed = new MessageEmbed()
            .setTitle("Generated Invites")
            .setDescription('Server invites have been sent to you via DM.')
            .setFooter('olivia', this.client.user.avatarURL())
        message.channel.send(embed);
    }
};