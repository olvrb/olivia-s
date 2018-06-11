const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const google = require('google');
google.requestOptions = {
   nsfw: false 
}
module.exports = class googleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'google',
            group: 'utils',
            memberName: 'google',
            description: 'Google something.',
            examples: ['google ASLR'],
            args: [
                {
                    key: 'search',
                    prompt: 'What do you want to search for?',
                    type: 'string'
                }
            ]
        });
    }
    run(message, { search }) {
        //if (!message.channel.nsfw) message.channel.send("Search in non nsfw channels is currently not supported."); return;
        const client = this.client;
        if (message.channel.type == "dm") message.delete();
        google(search, function (err, res){
            if (err) console.error(err);
            var link = res.links[0];
            if (link == undefined) {
                message.channel.send(new MessageEmbed()
                    .setDescription(`I couldn't find anything for "${search}".`)
                    .setColor('RANDOM')
                    .setFooter('olivia', client.user.avatarURL)
                    .setTimestamp()
                );
            } else {
                message.channel.send({embed: {
                    color: 3447003,
                    title: "Google",
                    url: "https://google.com/",
                    fields: [
                    {
                        name: "Top Result",
                        value: `${link.title + ' - ' + link.href}\n${link.description + "\n"}`
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: `oliveJS`
                    },
                }});
            }
        });
    }
};