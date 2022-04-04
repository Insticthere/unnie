const {SlashCommandBuilder, Permissions} = require('@discordjs/builders');

const output = require('../discordoutput');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kicks a user')
        .addUserOption(option => option
            .setName('target')
            .setDescription('The member to kick')
            .setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for kick')),
    async execute(interaction) {
        const value = interaction.options.getString('reason');
        const user = interaction.options.getMember('target');
        if (interaction.member.permissions.has('KICK_MEMBERS')) {
            if (!user.roles.highest.position >= interaction.member.roles.highest.position) {
            try {
                try {
                    await user.kick(value)
                    .catch((err) => {
                        output.errorlog(err)
                    })
        await interaction.reply('Kicked successfully')
                } catch {
                    await interaction.reply('Failed to kick')
                }

                try {
                    await user.send(`Your have been kicked from ${interaction.guild.name}. For reason ${value}`);
                } catch (error) {
                    return interaction.reply('Could not send message dms closed')
                };
            } 
            catch (error) {
                const err = `Error in server ${interaction.guild.name}. error ${error} Command: kick`
                output.errorlog(err)
                return interaction.reply('some error has occured')
            }
        } else {
            return interaction.reply({ content: 'Missing Perms for that interaction!', ephemeral: true })
        }
    } else {
        return interaction.reply({
            content: 'Missing Perms for that interaction!',
            ephemeral: true
        })
    }},
};