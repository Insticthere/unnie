const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder  } = require('discord.js');
const { getExistingWarns } = require('../api/warndata');
// const errorlog = require('../api/discordoutput')

const data = new SlashCommandBuilder()
  .setName('warnings')
  .setDescription('View warnings of a user')
  .addUserOption((option) =>
    option.setName('target').setDescription('The member to view warnings').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

module.exports = {
  data,
  async execute(interaction) {
    const user = interaction.options.getMember('target');

    try {
      const existingWarns = await getExistingWarns(interaction.guildId, user.id);

      if (existingWarns) {
        const warns = existingWarns.warns;  

        const warnsList = warns.map(
          (warn) => `Moderator: ${warn.moderator}\nReason: ${warn.reason}\nTime: ${warn.time}`
        );
        await interaction.reply({ content: `Warnings for ${user.displayName}:\n${warnsList.join('\n\n')}`, ephemeral: true});

      } else {
        console.log(existingWarns)
        await interaction.reply({content : 'No warnings found for the user.', ephemeral: true});
      }
    } catch (error) {
      await interaction.reply({content : 'Some error has occured', ephemeral: true})
      console.log(error);
    }
  },
};  