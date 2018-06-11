const { Command } = require('discord.js-commando');

const { MessageEmbed } = require('discord.js');
module.exports = class userinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'utils',
            memberName: 'userinfo',
            description: 'Get the info of a user.',
            args: [
                {
                    key: "member",
                    prompt: "Please specify a member by id or mention.",
                    default: "",
                    type: "member"
                }
            ],
            examples: ['userinfo']
        });
    }

    run(message, { member }) {
        if (!member) member = message.member;
        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL())
            .setTitle("User Info")
            .addField('ID', member.user.id, true)                                                   //ID
            .addField('Username', member.user.username)
            .addField('Nickname', member.nickname ? member.nickname : "None", true)                 //Nickname
            .addField('Status', member.user.presence.status, true)                                  //Status
            .addField('Game', member.user.presence.game ? member.user.presence.game : 'None', true) //Game
            .addField('Bot', member.user.bot ? "Yes" : "No")
            .addField('Joined', message.member.joinedAt, true)                                      //joined at
            .addField('Account Created', message.author.createdAt, true)                            //created at
            .addField('Roles', member.roles.map(e => e.name).join(", "), true)                      //Roles   
            .setThumbnail(member.user.displayAvatarURL())        
        message.channel.send(embed);
    }
};