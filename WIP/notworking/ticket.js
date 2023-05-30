const {
    SlashCommandBuilder,
} = require('@discordjs/builders');
const output = require('../api/discordoutput');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');

const { Category } = require('../../config.json');

const row = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder ()
		.setCustomId('close')
		.setStyle('Primary')
		.setEmoji('🗑️'))

const data = new SlashCommandBuilder()
.setName('ticket')
.setDescription('creates a ticket')
.addStringOption(option => option.setName('reason').setDescription('Reason for the ticket').setRequired(true))




module.exports = {
    data,
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('New ticket for ' + interaction.user.username)
            .setDescription(`Reason : ${interaction.options.getString('reason')}`)
            .setColor('#ffffff')
        const filter = (interactions) => {if (interactions.user.id === interaction.user.id) return true;
            return interactions.reply({content : 'you cannot use this button', ephemeral: true})}
        let tick = `ticket-${interaction.user.id}`
        const categorys = interaction.guild.channels.cache.find(channel => channel.name === 'tickets') || interaction.guild.channels.cache.find(channel => channel.id === Category);

        if (categorys) {
            if (interaction.client.channels.cache.find(channel => channel.name === tick)) {
                return interaction.reply({
                    content: 'Ticket already exists!',
                    ephemeral: true
                });
            } else {
                try {
                    let ticket = await interaction.guild.channels.create(tick, {
                        type: 'text',
                        parent: categorys,
                        permissionOverwrites: [
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
                        content: 'Ticket created!',
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
                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            let categ = await interaction.guild.channels.create('tickets', {
                type: 'GUILD_CATEGORY',
                permissionOverwrites: [
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

            let ticket = await interaction.guild.channels.create(tick, {
                type: 'text',
                parent: categ,
                permissionOverwrites: [
                    {
                        id: interaction.member.id,
                        allow: ['VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },]
            });

            const mess = await ticket.send({content :`${interaction.member} here is your ticket!`, components: [row], embeds: [embed]});
            let collector = mess.channel.createMessageComponentCollector({filter});
            await interaction.reply({
                content: 'Ticket created!',
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
