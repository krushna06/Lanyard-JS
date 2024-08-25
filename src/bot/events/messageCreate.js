const userdataCommand = require('../commands/userdata');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.content.startsWith('!userdata')) {
            userdataCommand.execute(message);
        }
    });
};
