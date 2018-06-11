const { Command } = require('discord.js-commando');


module.exports = class eightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            group: 'fun',
            memberName: '8ball',
            description: 'Ask the 8ball for advice.',
            examples: ['8ball should i go snort antifreeze?'],
            args: [
                {
                    key: 'question',
                    prompt: 'What should i answer to?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { question }) {
        if (message.channel.type == "dm") message.delete();
        var answers = ["Yes.", "No.", "No fucking way.", "Of course.", "Go snort antifreeze.", "I'm gonna hit you with a shovel for this."];
        var sendAnswer = answers[Math.floor(Math.random()*answers.length)];
        message.channel.send({
            embed: {
                color: 3447003,
                title: ":8ball: **Prediction**\n",
                description: "\n",
                fields: [{
                    name: `Question`,
                    value: question
                },
                {
                    name: `Answer`,
                    value: sendAnswer
                }
                ],
                footer: {
                    icon_url: this.client.user.avatarURL(),
                    text: `oliveJS`
                },
                timestamp: new Date()                
            }
        });
    }
};
