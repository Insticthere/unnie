const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const output = require('../discordoutput');
const {MessageEmbed,MessageActionRow, MessageButton,
} = require('discord.js');

const row = new MessageActionRow()
	.addComponents(
		new MessageButton()
		.setCustomId('close')
		.setStyle('PRIMARY')
		.setEmoji('🗑️'))


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('creates a ticket'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle('Ticket')
            .setDescription('New ticket for ' + interaction.user.username)
            .setColor('#ffffff')

        const filter = (interactions) => {if (interactions.user.id === interaction.user.id) return true;
            return interactions.reply({content : 'you cannot use this button', ephemeral: true})}
    let tick = `ticket-${interaction.user.id}`

    if (interaction.client.channels.cache.find(channel => channel.name === tick)) {
        return interaction.reply({
            content: 'Ticket already exists!',
            ephemeral: true
        });
    } else {
        let ticket = await interaction.guild.channels.create(tick, {
            type: 'text',
            parent: '959412115674918953',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.member.id,
                    allow: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
        });
        const mess = await ticket.send({content :`${interaction.member} here is your ticket!`, components: [row], embeds: [embed]});
        let collector = mess.channel.createMessageComponentCollector({filter});
        await interaction.reply({
            content: `Ticket created! ${ticket}`,
            ephemeral: true
        });
        collector.on('collect', async (collect) => {
            if (collect.customId === 'close') {
                await collect.reply({
                    content: 'Ticket closeing in 10 seconds...',
                });
                collector.stop()
                
                setTimeout(async () => {
                    await collect.channel.delete();
                }, 10000);
        }})
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}};