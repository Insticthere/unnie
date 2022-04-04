const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'presenceUpdate',
	execute(oldPresence , newPresence) {
		console.log(oldPresence)
        console.log(`is now ${newPresence.status}`);
    }};

