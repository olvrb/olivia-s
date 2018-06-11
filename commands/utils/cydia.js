const { Command } = require('discord.js-commando');

const cydia = require('cydia-api-node');

module.exports = class cydiaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cydia',
            group: 'utils',
            memberName: 'cydia',
            description: 'Look up a tweak or theme and get its info.',
            examples: ['cydia PickPocket2'],
            args: [
                {
                    key: 'search',
                    prompt: 'Which tweak/theme should i look for?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { search }) {
        cydia.getAllInfo(search) //Use the package name or the display name. Case-insensitive
        .then(info => {
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: `Cydia - Information for ${search}`,
                    fields: [{
                        name: `Package name`,
                        value: info.name,
                        inline: true
                    },
                    {
                        name: "Section",
                        value: `${info.section}`,
                        inline: true
                    },
                    {
                        name: "Summary",
                        value: info.summary,
                        inline: true
                    },
                    {
                        name: "Version",
                        value: info.version
                    },
                    {
                        name: "Price",
                        value: `$${info.price}`,
                        inline: true
                    },
                    {
                        name: "Repo",
                        value: info.repo.name,
                        inline: true
                    },
                    {
                        name: "Link",
                        value: `${info.repo.link}`
                    } 
                    ],
                    footer: {
                        icon_url: this.client.user.avatarURL(),
                        text: this.client.user.username
                    },
                    timestamp: new Date()                
                }
            });
        });
    }
};