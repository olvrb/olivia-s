const { Command } = require('discord.js-commando');

var PastebinAPI = require('pastebin-js');
pastebin = new PastebinAPI('2ce0278e88720e6aaa70bcda9a871fc3');

module.exports = class pasteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'paste',
            group: 'utils',
            memberName: 'paste',
            description: 'Upload any string to PasteBin.',
            examples: ['paste hello world!'],
            args: [
                {
                    key: 'toPaste',
                    prompt: 'What text would you like to paste?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { toPaste }) {
        pastebin
        .createPaste(toPaste)
        .then(function (data) {
            // we have succesfully pasted it. Data contains the id
            message.channel.send("Here you go!\n" + data);
        })
        .fail(function (err) {
            console.log(err);
            message.channel.send(err);
        });
    }
};