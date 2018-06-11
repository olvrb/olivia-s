const { Command } = require('discord.js-commando');
const getImage = require("first-image-search-load");

const translate = require('google-translate-api');
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'translate',
            group: 'utils',
            memberName: 'translate',
            description: 'Translate a language to another.',
            examples: ['translate auto sv Hello World!'],
            args: [
                {
                    key: "translateFrom",
                    prompt: "Which language do you want to translate from?",
                    type: "string"
                },
                {
                    key: "translateTo",
                    prompt: "Which language to you want to translate to?",
                    type: "string"
                },
                {
                    key: "inputToTranslate",
                    prompt: "What do you want to translate?",
                    type: "string"
                }
            ]
        });
    }
    async run(message, { translateFrom, translateTo, inputToTranslate }) {
        if (message.channel.type != "dm") message.delete();

        const languages = require("../../languages.json");
        if (translateFrom == "list") {
            message.channel.send('```\n' + JSON.stringify(languages, null, 1).replace('{', '').replace('}', '') + '```');
        } else {
            if (translateFrom == "auto") {
                translate(inputToTranslate, {from: translateFrom, to: translateTo}).then(res => {
                    message.channel.send({embed: {
                        color: 3447003,
                        title: "Translate",
                        url: "https://translate.google.com/",
                        fields: [
                        {
                            name: "Auto Detection",
                            value: `Language detected: ${res.from.language.iso}`
                        },
                        {
                            name: "Input:",
                            value: inputToTranslate
                        },
                        {
                            name: "Output:",
                            value: `${res.text}`
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: this.client.user.avatarURL(),
                            text: this.client.user.username
                        }
                      }
                    });
                }).catch(err => {
                    var erorEmbed = '```\n' + err + '```';
                    message.channel.send(erorEmbed);
                });
            } else {
                translate(inputToTranslate, {from: translateFrom, to: translateTo}).then(res => {
                    message.channel.send({embed: {
                        color: 3447003,
                        title: "Translate",
                        url: "https://translate.google.com/",
                        fields: [
                        {
                            name: "Input:",
                            value: inputToTranslate
                        },
                        {
                            name: "Output:",
                            value: `${res.text}`
                        }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: this.client.user.avatarURL(),
                            text: `oliveJS`
                        }
                      }
                    });
                }).catch(err => {
                    var erorEmbed = '```\n' + err + '```';
                    message.channel.send(erorEmbed);
                });
            }
        }
    }
};