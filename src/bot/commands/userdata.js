const userService = require('../../services/userService');

module.exports = {
    name: 'userdata',
    execute: async (message) => {
        if (message.author.bot) return;

        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            message.channel.send("Please mention a user to fetch data.");
            return;
        }

        const userData = await userService.fetchUserData(mentionedUser.id);

        if (!userData || userData.success === false) {
            message.channel.send("Could not fetch data for the mentioned user.");
            return;
        }

        message.channel.send("```json\n" + JSON.stringify(userData, null, 2) + "\n```");
    }
};
