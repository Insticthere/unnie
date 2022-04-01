const {SlashCommandBuilder, Permissions} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { memeget } = require('../memes')

module.exports = {
    // make an send meme command
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('sends a meme'),

    async execute(interaction) {
        const meme = await memeget();
        if (meme.nsfw) {
            await interaction.deferReply();
            return interaction.editReply({ content: 'cant send that one try again!', ephemeral: true })
        } else {
            const embed = new MessageEmbed()
                .setTitle(String(meme.title))
                .setURL(String(meme.postLink))
                .setImage(meme.url)
                .setColor('#0099ff')
                .setFooter({text: 'Meme by ' + meme.author});
                await interaction.deferReply();
                await interaction.editReply({ embeds: [embed] });
        }
}};