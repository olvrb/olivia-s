const { Command } = require('discord.js-commando');


module.exports = class randomCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'random',
            group: 'utils',
            memberName: 'random',
            description: 'Generates a random color.',
            examples: ['random']
        });
    }
    run(message) {
        if (message.channel.type != "dm") message.delete();
        var randColor = Math.floor(Math.random() * 16777214) + 1;
        message.channel.send({
            embed: {
                color: randColor,
                description: `Random color generated: ${randColor}\n${randColor} is equal to 0x${randColor.toString(16).toUpperCase()}`,
                footer: {
                    icon_url: this.client.user.avatarURL(),
                    text: `oliveJS`
                },
            }
        });
    }
};
