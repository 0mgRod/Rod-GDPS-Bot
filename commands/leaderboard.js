const { MessageEmbed } = require('discord.js');
const mysql = require('mysql2/promise');
const axios = require('axios');

module.exports = {
    data: {
        name: 'leaderboard',
        description: 'Get the top 10 players based on different criteria.',
        options: [{
            name: 'category',
            type: 3,
            description: 'Choose the leaderboard category',
            required: true,
            choices: [
                { name: 'Stars', value: 'stars' },
                { name: 'Moons', value: 'moons' },
                { name: 'Creator Points', value: 'creatorPoints' },
                { name: 'Demons', value: 'demons' }
            ]
        }]
    },
    async execute(interaction) {
        const category = interaction.options.getString('category');
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        let typeValue;
        let leaderboardTitle;
        let emoji;
        switch (category) {
            case 'stars':
                typeValue = 'stars';
                leaderboardTitle = '**Stars Leaderboard**';
                emoji = '<:star:1113905441374736454>';
                break;
            case 'moons':
                typeValue = 'moons';
                leaderboardTitle = '**Moons Leaderboard**';
                emoji = '<:moon:1216481918728798229>';
                break;
            case 'creatorPoints':
                typeValue = 'creatorPoints';
                leaderboardTitle = '**Creator Points Leaderboard**';
                emoji = '<:cp:1155190350768521450>';
                break;
            case 'demons':
                typeValue = 'demons';
                leaderboardTitle = '**Demons Leaderboard**';
                emoji = '<:demon:1149992172427411517>';
                break;
            default:
                await interaction.reply({ content: 'Invalid category selected.', ephemeral: true });
                return;
        }

        const [rows] = await connection.execute(`SELECT * FROM users ORDER BY ${typeValue} DESC LIMIT 10`);

        if (rows && rows.length > 0) {
            const embed = {
                color: 0x0099ff,
                title: leaderboardTitle,
                fields: [],
            };

            rows.forEach((player, index) => {
                embed.fields.push({
                    name: `${emoji} ${index + 1}. ${player.userName}`,
                    value: `${player[typeValue]} ${category}`,
                    inline: true,
                });
            });

            await interaction.reply({
                embeds: [embed]
            });
        } else {
            await interaction.reply({
                content: 'No leaderboard data available or an error occurred.',
                ephemeral: true,
            });
        }

        connection.end();
    },
};