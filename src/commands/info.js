const {
	EmbedBuilder,
    SlashCommandBuilder
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
                .addUserOption(option => option.setName('target').setDescription('The user'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('bot')
                .setDescription('Info about the bot')
                ),

	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const target = interaction.options.getMember('target');
			if (target) {
                const userInfoEmbed = new EmbedBuilder()
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
                const selfuserInfoEmbed = new EmbedBuilder()
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
                    .setTitle('User Info')
                    .setColor('#0099ff')
                    .setTimestamp()
                    .addFields({ name: 'User ID', value: interaction.user.id, inline: true },
                                { name: 'Nickname', value: interaction.member.nickname || 'None', inline: true },
                                { name: 'Joined Server', value: String(interaction.member.joinedAt), inline: true },
                                { name: 'Joined Discord', value: String(interaction.user.createdAt), inline: true },)
                    .addFields({ name: 'Roles', value: interaction.member.roles.cache.map(role => role.name).join(', '), inline: true })
                    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
                    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                    await interaction.deferReply();
                    await interaction.editReply({ embeds: [selfuserInfoEmbed] });
			}
		} else if (interaction.options.getSubcommand() === 'server') {
		const { guild } = interaction;
        const {ownerId} = guild;
        const embed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name}`)
            .setColor(0x00AE86)
            .setThumbnail(interaction.guild.iconURL())
            .addFields({ name: 'Server', value: String(interaction.guild.name), inline: true },
                    { name: 'Owner', value: `<@${ownerId}>` , inline: true},
            { name: 'Member Count', value: String(interaction.guild.memberCount) , inline: true})
            .addFields({ name: 'Region', value: String(interaction.guild.region), inline: true },
            { name: 'Created At', value: String(interaction.guild.createdAt),inline: true },
            { name: 'Verification Level', value: String(interaction.guild.verificationLevel), inline: true },
            { name: 'Roles', value: String(interaction.guild.roles.cache.map(role => role.name).join(', ').slice(0, 1024)), inline: true })
        await interaction.deferReply();
        await interaction.editReply({ embeds: [embed] });
		} else if (interaction.options.getSubcommand() === 'bot') {
            const { client } = interaction;
            const embed = new EmbedBuilder()
                .setTitle(`${client.user.username}`)
                .setColor(0x00AE86)
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .addFields({ name: 'Bot ID', value: String(client.user.id), inline: true },
                        { name: 'Created At', value: String(client.user.createdAt), inline: true },
                        { name: 'Guild Count', value: String(client.guilds.cache.size), inline: true },
                        { name: 'User Count', value: String(client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)), inline: true },
                        { name: 'Bot Owner', value: `Instict#0416`, inline: true },
                        { name: 'Bot Language', value: String(client.language), inline: true },
                )
                .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true}) })
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            await interaction.deferReply();
            await interaction.editReply({ embeds: [embed] });
        }


	},
};