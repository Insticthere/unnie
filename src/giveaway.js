// make a giveaway command



module.exports = {
    // make an announcement in an channel embed command
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('starts a giveaway')
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel'))
        .addStringOption(option => option.setName('title').setDescription('title of the giveaway'))
        .addStringOption(option => option.setName('description').setDescription('description of the giveaway'))
        .addStringOption(option => option.setName('reward').setDescription('reward of the giveaway'))
        .addStringOption(option => option.setName('time').setDescription('time of the giveaway')),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const reward = interaction.options.getString('reward');
        const time = interaction.options.getString('time');
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor('#0099ff')
            .setFooter(`${reward} in ${time}`);

    }
};