const express = require('express');
const userRoutes = require('./api/routes/userRoutes');
const messageCreate = require('./bot/events/messageCreate');
const ready = require('./bot/events/ready');
const botConfig = require('./config/botConfig');
const serverConfig = require('./config/serverConfig');
const { client } = require('./services/userService');

const app = express();
app.use(express.json());
app.use(userRoutes);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on port ${serverConfig.PORT}`);
});

client.once('ready', () => ready(client));
client.on('messageCreate', (message) => messageCreate(client));

client.login(botConfig.BOT_TOKEN);
