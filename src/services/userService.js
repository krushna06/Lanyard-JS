const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ]
});

function isoToTimestamp(isoDate) {
    return new Date(isoDate).getTime();
}

async function fetchUserData(userId) {
    try {
        if (!client.isReady()) {
            throw new Error('Client is not ready');
        }

        const user = await client.users.fetch(userId);
        const guild = client.guilds.cache.first();
        const member = guild ? await guild.members.fetch(userId) : null;

        if (!user || !member) return null;

        const discordUserData = {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
            discriminator: user.discriminator,
            bot: user.bot,
            clan: null,
            global_name: user.username,
            avatar_decoration_data: null,
            display_name: user.username,
            public_flags: user.flags ? user.flags.bitfield : 0
        };

        const presenceData = {
            discord_status: member.presence ? member.presence.status : "offline",
            active_on_discord_web: member.presence ? member.presence.clientStatus?.web === "online" : false,
            active_on_discord_desktop: member.presence ? member.presence.clientStatus?.desktop === "online" : false,
            active_on_discord_mobile: member.presence ? member.presence.clientStatus?.mobile === "online" : false,
        };

        let spotifyData = null;
        let activitiesData = [];
        let listeningToSpotify = false;

        member.presence?.activities?.forEach(activity => {
            if (activity.name === "Spotify") {
                spotifyData = {
                    track_id: activity.syncId,
                    timestamps: {
                        start: isoToTimestamp(activity.timestamps?.start),
                        end: isoToTimestamp(activity.timestamps?.end)
                    },
                    album: activity.assets?.large_text || '',
                    album_art_url: activity.assets?.large_image ? `https://i.scdn.co/image/${activity.assets.large_image.replace("spotify:", "")}` : '',
                    artist: activity.state,
                    song: activity.details
                };
                listeningToSpotify = true;
            }

            activitiesData.push({
                id: activity.id,
                name: activity.name,
                type: activity.type,
                timestamps: {
                    start: activity.timestamps?.start ? isoToTimestamp(activity.timestamps.start) : undefined
                },
                created_at: activity.createdAt ? isoToTimestamp(activity.createdAt) : undefined,
                details: activity.details,
                state: activity.state,
                assets: activity.assets,
                party: activity.party
            });
        });

        const responseData = {
            data: {
                spotify: spotifyData,
                discord_user: discordUserData,
                activities: activitiesData,
                discord_status: presenceData.discord_status,
                active_on_discord_web: presenceData.active_on_discord_web,
                active_on_discord_desktop: presenceData.active_on_discord_desktop,
                active_on_discord_mobile: presenceData.active_on_discord_mobile,
                listening_to_spotify: listeningToSpotify
            },
            success: true
        };

        return responseData;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { success: false, message: "Internal Server Error" };
    }
}

module.exports = {
    client,
    fetchUserData
};
