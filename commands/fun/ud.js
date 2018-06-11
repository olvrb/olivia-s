const { Command } = require('discord.js-commando');

const ud = require('urban-dictionary');

module.exports = class udCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ud',
            group: 'fun',
            memberName: 'ud',
            description: 'Finds a word in the Urban Dictionary.',
            examples: ['ud oliver'],
            args: [
                {
                    key: 'inputToSearch',
                    prompt: 'What do you want to look up in the Urban Dictionary?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { inputToSearch }) {
        const client = this.client;
        if (message.channel.type != "dm") message.delete();        
        ud.term(inputToSearch, function (error, entries, tags, sounds) {
            if (error) {
              message.channel.send(error.message)
            } else {
                message.channel.send({embed: {
                    color: 3447003,
                    author: {
                      name: "olivia"
                    },
                    title: "Urban Dictionary",
                    url: "https://www.urbandictionary.com/",
                    fields: [
                    {
                        name: `Definition for "${entries[0].word}"`,
                        value: `${entries[0].definition}`
                    },
                    {
                        name: `Example`,
                        value: `${entries[0].example}`
                    }
                    ],
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: `oliveJS`
                    },
                    timestamp: new Date()
                  }
                });
            }
        });
    }
};