const {
	Command
} = require('discord.js-commando');
const {
	MessageEmbed
} = require('discord.js');
const snekfetch = require('snekfetch');
const STACKOVERFLOW_KEY = '';


module.exports = class StackOverflowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stackoverflow',
			aliases: ['stack-exchange'],
			group: 'utils',
			memberName: 'stack-overflow',
			description: 'Searches Stack Overflow for your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [{
				key: 'query',
				prompt: 'What question would you like to search for?',
				type: 'string'
			}]
		});
	}

	async run(msg, {
		query
	}) {
		try {
			const {
				body
			} = await snekfetch
				.get('http://api.stackexchange.com/2.2/search/advanced')
				.query({
					page: 1,
					pagesize: 1,
					order: 'asc',
					sort: 'relevance',
					answers: 1,
					tags: 'javascript',
					q: query,
					site: 'stackoverflow',
					key: STACKOVERFLOW_KEY
				});
			if (!body.items.length) return msg.say('Could not find any results.');
			const data = body.items[0];
			const embed = new MessageEmbed()
				.setColor(0xF48023)
				.setAuthor('Stack Overflow', 'https://i.imgur.com/P2jAgE3.png')
				.setURL(data.link)
				.setTitle(data.title)
				.addField('ID',
					data.question_id, true)
				.addField('❯ Asker',
					`[${data.owner.display_name}](${data.owner.link})`, true)
				.addField('❯ Views',
					data.view_count, true)
				.addField('❯ Score',
					data.score, true)
				.addField('❯ Created',
					new Date(data.creation_date * 1000).toDateString(), true)
				.addField('❯ Last Activity',
					new Date(data.last_activity_date * 1000).toDateString(), true);
			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};