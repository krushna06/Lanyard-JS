const userdataCommand = require('../commands/userdata');
const whoCommand = require('../commands/who');

module.exports = async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('!userdata')) {
        await userdataCommand.execute(message);
    } else if (message.content.startsWith('!who')) {
        await whoCommand.execute(message);
    }
};
