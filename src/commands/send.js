const {SlashCommandBuilder, Permissions} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('announces a message in a channel')
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription('message to announce').setRequired(true))
        .addStringOption(option => option.setName('title').setDescription('title of the embed').setRequired(true))
        .addStringOption(option => option.setName('color').setDescription('color of the embed').setRequired(true)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');
        const title = interaction.options.getString('title');
        const color = interaction.options.getString('color');
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(message)
            .setColor(color);
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
            try {
                await channel.send({embeds : [embed]});
                await interaction.reply({ content: 'Message sent!', ephemeral: true });
            } catch {
                await interaction.reply({ content: 'There was an error while sending the message! make sure the `color` is valid!', ephemeral: true });
                await output.errorlog(err);
            }
        
        }
        else {
            return interaction.reply({ content: 'Missing Perms for that interaction!', ephemeral: true })
        }
}};