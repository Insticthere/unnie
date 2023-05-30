const { logChannel } = require('../../config.json');
const { userMention } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
	execute(member) {
		const logChan = member.client.channels.cache.get(logChannel);

		if (logChan) {
			 logChan.send(`Member Left: ${member.id}, ${userMention(member.id)}.`);
		}

	},
};