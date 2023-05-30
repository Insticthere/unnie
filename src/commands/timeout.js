const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('timeouts a user')
		.addUserOption((option) =>
			option
				.setName('target')
				.setDescription('The member to timeout')
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('time').setDescription('Time to timeout').setRequired(true),
		)
		.addStringOption((option) =>
			option.setName('reason').setDescription('Reason for timeout'),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

	async execute(interaction) {
		const value = interaction.options.getString('time');
		const reason = interaction.options.getString('reason');
		const user = interaction.options.getMember('target');
		const time = ms(value);
		if (time === undefined) {
			return interaction.reply('Invalid time.');
		}
		else if (
			interaction.member.roles.highest.comparePositionTo(user.roles.highest) < 0
		) {
			return interaction.reply({
				content:
                        'You can\'t take action on this user as their role is higher than mine or yours!',
				ephemeral: true,
			});
		}
		else if (!user.kickable) {
			return interaction.reply({
				content: 'My permission is not high enough to Timeout that user!',
				ephemeral: true,
			});
		}
		else {
			try {
				await user.timeout(time, reason);
				await interaction.reply('Timeouted user successfully');
				try {
					await user.send(
						`Your have been timedout from ${interaction.guild.name}. For Time: ${value}, Reason: ${reason}`,
					);
				}
				catch (error) {
					return interaction.reply({
						content: 'Dms closed for this user.',
						ephemeral: true,
					});
				}
			}
			catch (error) {
				console.log(error);
				return interaction.reply({
					content: 'some error has occured',
					ephemeral: true,
				});
			}
		}
	},
};
