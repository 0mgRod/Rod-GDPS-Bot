const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'account-link',
        description: 'Link your Discord account with a Rod GDPS account',
        options: [
            {
                name: 'username',
                description: 'Your Rod GDPS account username',
                type: 3,  // STRING type
                required: true,
            }
        ],
    },
    async execute(interaction) {
        const { options, user, channel } = interaction;

        // Send a secret (ephemeral) message with a blue background
        await interaction.reply({
            content: 'This command doesn\'t work yet. Try again in the future.',
            ephemeral: true,
        });
    },
};