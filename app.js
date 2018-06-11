const sleep = require('system-sleep');
const {
    CommandoClient
} = require('discord.js-commando');
const path = require('path');
const {
    MessageEmbed
} = require('discord.js');
const config = require('./config.json');
const db = require('quick.db');
const http = require('http');
const discordClient = require('discord.js');
const client = new CommandoClient({
    commandPrefix: '-',
    owner: config.owner,
    disableEveryone: true,
    unknownCommandResponse: false,
    commandEditableDuration: 120
});

const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

setInterval(() => {
    http.get('http://oliviao.herokuapp.com');
}, 900000);

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    //response.render('index');
    response.writeHead(302, {
        'Location': 'https://olvrb.github.io/'
    });
    response.end();
});

app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utils', 'Utilities'],
        ['fun', 'Fun'],
        ['music', 'Music'],
        ['moderation', 'Moderation'],
        ['eco', 'Economy']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
    client.user.setActivity(`oliver code me | @${client.user.tag} help`, {
        type: "WATCHING"
    });
    console.log('Started.');
    /*
    const embed = new MessageEmbed()
        .setFooter(client.user.username, client.user.avatarURL())
        .setTimestamp()
        .setTitle('**Update!**')
        .setDescription('I\'ve just been updated with some new features or bug fixes! Do help to see if a command has been added!');
    client.guilds.forEach(g => {
        g.channels.find('name', 'general').send(embed).catch(sendErr => console.log(`Missing permissions to send in ${g.name}`))   
        sleep(500);         
    });   */
});

client.on("unknownCommand", message => {
    message.react("❌");
});

client.on("message", async message => {
    if (message.content.toLowerCase().includes("discord.gg/") && message.channel.type != "dm") {
        message.reply("don't send invite link. ban");
        message.delete();
    }
    /*
    if (!message.author.bot && message.channel.type != "dm") {
        db.updateValue(message.author.id + message.guild.id + "_xp", Math.floor(Math.random() * 20) + 12).then((i) => {}) //will maybe use later
    }
    */
});

/*
client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    var modlogChannel = oldMessage.guild.channels.find("name", "mod-log");
    if (!modlogChannel) modlogChannel = oldMessage.guild.channels.find("name", "modlog");
    if (!modlogChannel) modlogChannel = oldMessage.guild.channels.find("name", "logs");
    if (!modlogChannel) return;

    const embed = new MessageEmbed()
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL)
        .setTitle('**Edited Message**')
        .setDescription(`${oldMessage.author} edited a message in ${oldMessage.channel}`)
        .addField(`From.`, `\`\`\`\n ${oldMessage.content} \`\`\``)
        .addField(`To.`, `\`\`\`\n ${newMessage.content} \`\`\``)
    modlogChannel.send(embed);
});

client.on('guildBanAdd', async (guild, user) => {
    db.fetchObject(user.id + message.guild.id + "_warnpoints").then(async currentWarnPoints => {
        db.updateValue(user.id + message.guild.id + "_warnpoints", -currentWarnPoints.value)
    })


    var modlogChannel = user.channels.find("name", "mod-log");
    if (!modlogChannel) modlogChannel = user.channels.find("name", "modlog");
    if (!modlogChannel) modlogChannel = user.channels.find("name", "logs");
    if (!modlogChannel) return;

    const embed = new MessageEmbed()
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL)
        .setTitle('**User Banned**')
        .setDescription(`${user} has been banned from ${guild}`)
    modlogChannel.send(embed);
});

client.on('messageDelete', async message => {
    //if (await db.fetchObject(message.guild.id + "_modlog").text != "on") return;    
    var modlogChannel = message.guild.channels.find("name", "mod-log");
    if (!modlogChannel) modlogChannel = message.guild.channels.find("name", "modlog");
    if (!modlogChannel) modlogChannel = message.guild.channels.find("name", "logs");
    if (!modlogChannel) return;

    const embed = new MessageEmbed()
        .setTimestamp()
        .setFooter(client.user.username, client.user.avatarURL)
        .setTitle('**Deleted Message**')
        .setDescription(`${message.author} deleted a message in ${message.channel}`)
        .addField(`Deleted Message.`, `\`\`\`\n ${message.content} \`\`\``)
    modlogChannel.send(embed);
});

*/



client.login(config.token);