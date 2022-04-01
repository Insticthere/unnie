const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	MessageEmbed,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Display info about yourself.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user'))),

	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const target = interaction.options.getMember('target');
			if (target) {
                const userInfoEmbed = new MessageEmbed()
                .setAuthor({ name: target.user.username, iconURL: target.user.displayAvatarURL({dynamic: true}) })
                .setTitle('User Info')
                .setColor('#0099ff')
                .setTimestamp()
                .addFields({ name: 'User ID', value: target.user.id, inline: true },
                            { name: 'Nickname', value: target.nickname || 'None', inline: true },
                            { name: 'Joined Server', value: String(target.joinedAt), inline: true },
                            { name: 'Joined Discord', value: String(target.user.createdAt), inline: true },)
                .addFields({ name: 'Roles', value: target.roles.cache.map(role => role.name).join(', '), inline: true })
                .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
                .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
                .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
                await interaction.deferReply();
                await interaction.editReply({ embeds: [userInfoEmbed] });
			} else {
                const selfuserInfoEmbed = new MessageEmbed()
                    .setAuthor({ name: interaction.user.username, iconURL: target.user.displayAvatarURL({dynamic: true}) })
                    .setTitle('User Info')
                    .setColor('#0099ff')
                    .setTimestamp()
                    .addFields({ name: 'User ID', value: interaction.user.id, inline: true },
                                { name: 'Nickname', value: interaction.nickname || 'None', inline: true },
                                { name: 'Joined Server', value: String(interaction.user.joinedAt), inline: true },
                                { name: 'Joined Discord', value: String(interaction.user.createdAt), inline: true },)
                    .addFields({ name: 'Roles', value: interaction.user.roles.cache.map(role => role.name).join(', '), inline: true })
                    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
                    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                    await interaction.deferReply();
                    await interaction.editReply({ embeds: [userInfoEmbed] });
			}
		} else if (interaction.options.getSubcommand() === 'server') {
			const { guild } = interaction;
        const {ownerId, name} = guild;
        // send an embed with info about the server
        const embed = new MessageEmbed()
            .setTitle(`${interaction.guild.name}`)
            .setColor(0x00AE86)
            .setThumbnail(interaction.guild.iconURL())
            .addFields({ name: 'Server', value: String(interaction.guild.name), inline: true },
                    { name: 'Owner', value: `<@${ownerId}>` , inline: true},
        { name: 'Member Count', value: String(interaction.guild.memberCount) , inline: true})
            .addFields({ name: 'Region', value: String(interaction.guild.region), inline: true },
            { name: 'Created At', value: String(interaction.guild.createdAt),inline: true },
            { name: 'Verification Level', value: String(interaction.guild.verificationLevel), inline: true },
            { name: 'Roles', value: String(interaction.guild.roles.cache.map(role => role.name).join(', ')), inline: true })
        await interaction.deferReply();
        await interaction.editReply({ embeds: [embed] });
		}
	},
};