const sleep = require('system-sleep');
const {
    Command
} = require('discord.js-commando');
var icloud = require("find-my-iphone").findmyphone;
var PastebinAPI = require('pastebin-js');
pastebin = new PastebinAPI('2ce0278e88720e6aaa70bcda9a871fc3');
icloud.apple_id = "";
icloud.password = "";
const {
    MessageEmbed
} = require('discord.js');

module.exports = class findiphoneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'findiphone',
            group: 'utils',
            memberName: 'findiphone',
            description: 'Find my iPhone',
            examples: ['findiphone']
        });
    }

    hasPermission(message) {
        return this.client.isOwner(message.author);
    }

    async run(message) {
        icloud.getDevices(function (error, devices) {
            if (error) {
                console.log(error)
            } else {
                const devicess = JSON.stringify(devices);

                pastebin.createPaste({
                        text: devicess,
                        title: "Private",
                        format: null,
                        privacy: 1,
                        expiration: 'N'
                    })
                    .then(function (data) {
                        message.channel.send("Here you go!\n" + data);
                    })
                    .fail(function (err) {
                        console.log(err);
                        message.channel.send(err);
                    });
            }
        })
    }
};