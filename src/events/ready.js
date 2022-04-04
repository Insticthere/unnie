const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.username}`);
		client.user.setActivity("Watching over OPPA's server", { type: "WATCHING" });
	},
};