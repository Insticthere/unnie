const {
	EmbedBuilder,
    SlashCommandBuilder
} = require('discord.js');

const { memeget } = require('../api/memes')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fun')
		.setDescription('Some fun commands')
        .addSubcommand(subcommand =>
            subcommand
                .setName('8ball')
                .setDescription('Ask the magic 8ball a question.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('meme')
                .setDescription('Sends a random meme.')),
        
                async execute(interaction) {
                    switch(interaction.options.getSubcommand()) {

                        case "8ball":
                            const answers = [
                                'It is certain',
                                'It is decidedly so',
                                'Without a doubt',
                                'Yes definitely',
                                'You may rely on it',
                                'As I see it, yes',
                                'Most likely',
                                'Outlook good',
                                'Yes',
                                'Signs point to yes',
                                'Reply hazy try again',
                                'Ask again later',
                                'Better not tell you now',
                                'Cannot predict now',
                                'Concentrate and ask again',
                                'Don\'t count on it',
                                'My reply is no',
                                'My sources say no',
                                'Outlook not so good',
                                'Very doubtful'
                            ];

                            const answer = answers[Math.floor(Math.random() * answers.length)];
                            await interaction.reply(answer)

                            break;

                        case "meme":
                            let meme;
                            await interaction.deferReply();
                        
                            while (!meme || meme.nsfw) {
                              meme = await memeget();
                            }
                            
                            await interaction.editReply({ content : meme.url });
                                
                    }
                }
            }
