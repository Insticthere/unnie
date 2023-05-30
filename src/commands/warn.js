const { PermissionFlagsBits,SlashCommandBuilder } = require('discord.js');
const { handleWarnCommand } = require('../api/warndata');
// const errorlog = require('../api/discordoutput')

const data = new SlashCommandBuilder()
    .setName('warn')
    .setDescription('warns a user')
    .addUserOption(option => option
        .setName('target')
        .setDescription('The member to kick')
        .setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason for warn'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

module.exports = {
    data,
    async execute(interaction) {
        const reason = interaction.options.getString('reason');
        const user = interaction.options.getMember('target');
        
        try {
            await handleWarnCommand(interaction, reason, user.id)
            await user.send(`You have been warned in ${interaction.guild.name} for ${reason}.`)
            await interaction.reply('done')
        } catch (error) {
            console.log(error)
        }
    },
};