const {SlashCommandBuilder, Permissions} = require('@discordjs/builders');
const ms = require("ms")
const output = require('../discordoutput');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('timeouts a user')
        .addUserOption(option => option
            .setName('target')
            .setDescription('The member to timeout')
            .setRequired(true))
        .addStringOption(option => option.setName('time').setDescription('Time to timeout'))
        .addStringOption(option => option.setName('reason').setDescription('Reason for timeout')),
    async execute(interaction) {
        const value = interaction.options.getString('time');
        const reason = interaction.options.getString('reason');
        const user = interaction.options.getMember('target');
        const time = ms(value);
        if (time === undefined) {
            return interaction.reply('Invalid time');
        } else {
        if (interaction.member.permissions.has('KICK_MEMBERS')) {
            if (!user.roles.highest.position >= interaction.member.roles.highest.position || user.id === interaction.user.id) {
                return interaction.reply({
                    content: "You can't take action on this user as their role is higher than yours!",
                    ephemeral: true});
            } else {

                try {
                    await user.timeout(time, reason);
                    await interaction.reply('Timeouted successfully')
                    try {
                        await user.send(`Your have been timedout from ${interaction.guild.name}. For reason ${value}`);
                    } catch (error) {
                        return interaction.reply({
                            content: 'Dms closed for this user.',
                            ephemeral: true})};

                } catch (error) {
                    const err = `Error in server ${interaction.guild.name}. error ${error} Command: timeout`
                    output.errorlog(err)
                    return interaction.reply({
                        content: 'some error has occured',
                        ephemeral: true})}}
        } else {
            return interaction.reply({
                content: 'Missing Perms for that interaction!',
                ephemeral: true})}}}};