const axios = require('axios');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'account-create',
        description: 'Create a Rod GDPS account',
        options: [
            {
                name: 'username',
                description: 'The username',
                type: 3,  // STRING type
                required: true,
            },
            {
                name: 'password',
                description: 'The password',
                type: 3,  // STRING type
                required: true,
            },
        ],
    },
    async execute(interaction) {
        const { options, user, channel } = interaction;

        // Send a secret (ephemeral) message with a blue background
        await interaction.reply({
            content: 'This command doesn\'t work yet. Try again in the future.',
            ephemeral: true,
        });

        // Uncomment and adapt the following code for actual account creation logic
        /*
        const username = options.getString('username');
        const password = options.getString('password');

        // Simulate account creation (replace this with actual account creation logic)
        const accountData = {
            username,
            password
        };

        // Send account data to user's DMs
        try {
            await user.send(`Account Data:\nUsername: ${accountData.username}\nPassword: ${accountData.password}`);
            interaction.followUp('Account details have been sent to your DMs.')
                .then(() => {
                    // Make a POST request to the specified URL with parameters
                    axios.post('https://ksr.ps.fhgdps.com/accounts/registerGJAccount.php', {
                        userName: accountData.username,
                        password: accountData.password,
                    })
                    .then(response => {
                        // Log the entire API response for debugging
                        console.log('API Response:', response);
                    
                        // Check if the response is successful (customize this based on the API)
                        if (response.data.success) {
                            interaction.followUp('Account registered successfully!');
                        } else {
                            // Log the error message for debugging
                            console.error('Registration Error:', response.data.message);
                    
                            // Handle unsuccessful registration
                            interaction.followUp('Account registration failed. Please check the provided data.');
                        }
                    })            
                    .catch(error => {
                        console.error('Error making POST request:', error);
                        interaction.followUp('An error occurred during account registration.');
                    });
                });
        } catch (error) {
            console.error('Failed to send account details to DM:', error);
            interaction.followUp('Failed to send account details to your DM. Please check your privacy settings and enable DMs from server members.');
        }
        */
    },
};