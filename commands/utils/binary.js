const { Command } = require('discord.js-commando');

module.exports = class binary extends Command {
    constructor(client) {
        super(client, {
            name: 'binary',
            aliases: ['bin'],
            group: 'utils',
            memberName: 'binary',
            description: 'Encodes any string to binary. (currently a bit broken)',
            examples: ['binary encode oliver is amazing'],
            args: [
                {
                    key: "toOrFrom",
                    prompt: "Do you want to convert to or from binary? (encode or decode)",
                    type: "string",
                    validate: toOrFrom => {
                        if (toOrFrom == "encode" || toOrFrom == "decode") return true;
                        return "Encode or decode?";
                    }
                },
                {
                    key: 'stringToConvert',
                    prompt: 'Which string to you want to encode/decode?',
                    type: 'string'
                }
            ]
        });    
    }
    run(message, { stringToConvert, toOrFrom }) {
        if (message.channel.type != "dm") message.delete();
        function toBin(str) {
            str = str.replace(' ', '');
            var st, i, j, d;
            var arr = [];
            var len = str.length;
            for (i = 1; i <= len; i++) {
                //reverse so its like a stack
                d = str.charCodeAt(len - i);
                for (j = 0; j < 8; j++) {
                    arr.push(d % 2);
                    d = Math.floor(d / 2);
                }
            }
            //reverse all bits again.
            return arr.reverse().join("");
        }
        function fromBin(str) {
            str = str.replace(' ', '');            
            if (str.match(/[10]{8}/g)) {
                var wordFromBinary = str.match(/([10]{8}|\s+)/g).map(function (fromBinary) {
                    return String.fromCharCode(parseInt(fromBinary, 2));
                }).join('');
                return wordFromBinary;
            }
        }
        toOrFrom = toOrFrom.toLowerCase();
        if (toOrFrom == "encode") {
            message.channel.send(`Output: ${toBin(stringToConvert)}`);
        } else {
            message.channel.send(`Output: ${fromBin(stringToConvert)}`);
        }
    }
};