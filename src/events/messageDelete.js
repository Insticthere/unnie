const { logChannel } = require('../../config.json');
const { codeBlock, userMention } = require("discord.js")

module.exports = {
	name: 'messageDelete',
	execute(messages) {
        const logChan = messages.client.channels.cache.get(logChannel);

        if (logChan) {
			logChan.send(`Message deleted by ${userMention(messages.member.id)} (${messages.member.id}) in ${messages.channel}: ${codeBlock(messages.content)}`);
		}

	},
};