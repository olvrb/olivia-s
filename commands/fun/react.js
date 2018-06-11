const {
    Command
} = require('discord.js-commando');
const {
    MessageEmbed
} = require('discord.js');
const sleep = require('system-sleep');
module.exports = class reactCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'react',
            group: 'fun',
            memberName: 'react',
            description: 'react to something.',
            examples: ['react 3214876123 helloworld'],
            args: [{
                    key: "messageToReact",
                    prompt: "Which message should i react to?",
                    type: "string"
                },
                {
                    key: 'reaction',
                    prompt: 'What should i react?',
                    type: 'string',
                    validate: reaction => {
                        return reaction.match(/[a-z]/i);
                    }
                }
            ]
        });
    }
    hasPermission(message) {
        if (message.channel.type != "dm") return message.member.hasPermission('ADD_REACTIONS');
        return true;
    }
    async run(message, {
        messageToReact,
        reaction
    }) {
        if (message.channel.type != "dm") message.delete();
        const alphaBet = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];
        var alphabet = {
            'a': alphaBet[0],
            'b': alphaBet[1],
            'c': alphaBet[2],
            'd': alphaBet[3],
            'e': alphaBet[4],
            'f': alphaBet[5],
            'g': alphaBet[6],
            'h': alphaBet[7],
            'i': alphaBet[8],
            'j': alphaBet[9],
            'k': alphaBet[10],
            'l': alphaBet[11],
            'm': alphaBet[12],
            'n': alphaBet[13],
            'o': alphaBet[14],
            'p': alphaBet[15],
            'q': alphaBet[16],
            'r': alphaBet[17],
            's': alphaBet[18],
            't': alphaBet[19],
            'u': alphaBet[20],
            'v': alphaBet[21],
            'w': alphaBet[22],
            'x': alphaBet[23],
            'y': alphaBet[24],
            'z': alphaBet[25],
        }
        reaction = reaction
            .split('')
            .map(function (e) { // Replace each character with a morse "letter"
                return alphabet[e.toLowerCase()] || ''; // Lowercase only, ignore unknown characters.
            })
            .join(' ') // Convert the array back to a string.
            .replace(/ +/g, ' '); // Replace double spaces that may occur when unknow characters were in the source string.
        reaction.split(' ').forEach(async element => {
            message.channel.messages.fetch(messageToReact).then(async message2 => {
                await message2.react(element.toString());
            });
            sleep(750);
        });
        message.channel.send('done');
    }
};