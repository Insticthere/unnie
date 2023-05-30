const { welcomeChannel, logChannel } = require('../../config.json');
const { userMention } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		const channel = member.client.channels.cache.get(welcomeChannel);
		const logChan = member.client.channels.cache.get(logChannel);

		if (channel) {
			channel.send(`Welcome, ${userMention(member.id)} .`);
		}

		if (logChan) {
			logChan.send(`Member Joined: ${member.id}, ${member.user.username}. at ${new Date().toLocaleDateString}`);
		}

	},
}; 