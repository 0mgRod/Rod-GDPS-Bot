// commands/createpoll.js
module.exports = {
    data: {
        name: 'poll-create',
        description: 'Create a poll with a yes/no question',
        options: [
            {
                name: 'question',
                description: 'The question for the poll',
                type: 3,  // Corrected type for STRING
                required: true,
            },
            {
                name: 'ping',
                description: 'Should the bot ping the user?',
                type: 5,  // Corrected type for BOOLEAN
                required: false,
            },
        ],
    },
    async execute(interaction) {
        const { options, guild } = interaction;
        const user = interaction.user;

        const commandName = 'createpoll';
        const question = options.getString('question');
        const shouldPing = options.getBoolean('ping') || true;

        // Fetch the member from the guild
        const member = await guild.members.fetch(user.id);

        // Check if the command was sent in the specified channel
        if (interaction.channelId !== '1216316762933559347') {
            return interaction.reply('This command can only be used in <#1216316762933559347>.');
        }

        // Create an embed for the poll
        let pollDescription = `<@${user.id}>\n\n**${question}**\n\n:white_check_mark: yes or :x: no`;

        if (shouldPing) {
            const roleId = 'YOUR_ROLE_ID';  // Replace with the actual role ID
            const role = guild.roles.cache.get(roleId);

            if (role) {
                await role.setMentionable(true);
                pollDescription += `\n\n${role}`;
            } else {
                console.error('Role not found. Please check the provided role ID.');
            }
        }

        const pollEmbed = {
            title: 'Poll',
            description: pollDescription,
        };

        const pollMessage = await interaction.reply({ content: `<@&1216317702466175118>`, embeds: [pollEmbed], fetchReply: true })
            .then(async (message) => {
                return message;
            })
            .catch((error) => {
                console.error("Couldn't send and react to the message:", error);
            });

        if (shouldPing) {
            const role = guild.roles.cache.get(roleId);

            if (role) {
                await role.setMentionable(false);
            }
        }

        await pollMessage.react("✅");
        await pollMessage.react("❌");
    },
};