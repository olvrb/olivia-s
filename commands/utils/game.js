const { Command } = require('discord.js-commando');


module.exports = class newGameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'game',
            group: 'utils',
            memberName: 'game',
            description: 'Change the game.',
            examples: ['game oliver code me.'],
            args: [
                {
                    key: 'newGame',
                    prompt: 'What do you want to set the game to?',
                    type: 'string',
                    default: ''
                }
            ]
        });
    }
    hasPermission(message) {
        return this.client.isOwner(message.author);		
	}
    async run(message, { newGame }) {
        if (message.channel.type != "dm") message.delete();
        if (!newGame) {
            await this.client.user.setActivity(null)
            message.channel.send('Successfully cleared your Game!')
        } else {
            await this.client.user.setActivity(`${newGame}`, { type: "WATCHING"})
            message.channel.send(`Successfully changed Game to **${newGame}**`)
        }
    }
};