const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const output = require('./src/discordoutput');
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	console.log(`${file} loaded`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('error', async err => {
    output.errorlog(err);
});

client.on('invalidRequestWarning', async err => {
    output.errorlog(err);
});

process.on('uncaughtException', async err => {
    output.errorlog(err);
});

process.on('unhandledRejection', async err => {
    output.errorlog(err);
});

client.login(process.env.TOKEN);