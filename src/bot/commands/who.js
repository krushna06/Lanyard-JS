const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'who',
    execute: async (message) => {
        if (message.author.bot) return;

        const mentionedUser = message.mentions.users.first();
        if (!mentionedUser) {
            message.channel.send("Please mention a user to fetch data.");
            return;
        }

        const member = message.guild.members.cache.get(mentionedUser.id);
        if (!member) {
            message.channel.send("Could not fetch data for the mentioned user.");
            return;
        }

        const monitoredSince = Math.floor(member.joinedAt.getTime() / 1000);
        const accountCreation = Math.floor(mentionedUser.createdAt.getTime() / 1000);

        const lanyardjsUrl = `https://localhost.com/api/v1/user/${mentionedUser.id}`;

        const embed = new EmbedBuilder()
            .setTitle('LanyardJS Whois')
            .setColor('#2F3136')
            .setThumbnail(mentionedUser.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '⏲️ Monitored Since', value: `<t:${monitoredSince}:F>`, inline: false },
                { name: '☀️ Account Creation', value: `<t:${accountCreation}:F>`, inline: false },
                { name: ' :link: LanyardJS API URL', value: lanyardjsUrl, inline: false }
            );

        const button = new ButtonBuilder()
            .setLabel('View LanyardJS API Data')
            .setStyle(ButtonStyle.Link)
            .setURL(lanyardjsUrl);

        const row = new ActionRowBuilder().addComponents(button);

        message.channel.send({ embeds: [embed], components: [row] });
    },
};
