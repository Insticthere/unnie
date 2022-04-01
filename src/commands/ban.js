const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const output = require('../discordoutput');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('bans a user')
        .addUserOption(option => option
            .setName('target')
            .setDescription('The member to ban')
            .setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for kick')),

    async execute(interaction) {
        const value = interaction.options.getString('reason') || 'banned';
        const user = interaction.options.getMember('target');

        if (interaction.member.permissions.has('BAN_MEMBERS')) {
            if (!user.roles.highest.position >= interaction.member.roles.highest.position) {
                return interaction.reply({
                    content: "You can't take action on this user as their role is higher than yours!",
                    ephemeral: true
                });
            } else {
                try {
                    await user.send(`Your have been banned from ${interaction.guild.name}. For reason ${value}`);
                } catch (error) {
                    return interaction.reply({
                        content: 'Dms closed for this user banning anyways!',
                        ephemeral: true
                    })
                };
                try {

                    await user.ban({
                        days: 7,
                        reason: value})
                    .catch((err) => {
                        output.errorlog(err)
                    })

                    await interaction.reply({
                        content: 'Kicked user',
                        ephemeral: true
                    })
                } catch (error) {
                    const err = `Error in server ${interaction.guild.name}. error ${error} Command: ban`
                    output.errorlog(err)
                    return interaction.reply({
                        content: 'some error has occured',
                        ephemeral: true
                    })
                }
            }
        } else {
            return interaction.reply({
                content: 'Missing Perms for that interaction!',
                ephemeral: true
            })
        }
    },
};