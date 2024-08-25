# Lanyard-JS

This project provides an API to fetch user data and their activities from Discord, including Spotify integration.

## Table of Contents
- [Project Tree](#project-tree)
- [API Endpoints](#api-endpoints)
  - [Fetch User Data](#fetch-user-data)
- [Example Response](#example-response)
- [Discord Bot Commands](#discord-bot-commands)
- [Contributing](#contributing)
- [License](#license)

## Project Tree

```
📦 
├─ .gitignore
├─ LICENSE
├─ README.md
├─ package.json
└─ src
   ├─ api
   │  ├─ controllers
   │  │  └─ userController.js
   │  ├─ middlewware
   │  │  └─ errorMiddleware.js
   │  └─ routes
   │     └─ userRoutes.js
   ├─ bot
   │  ├─ commands
   │  │  └─ userdata.js
   │  └─ events
   │     ├─ messageCreate.js
   │     └─ ready.js
   ├─ config
   │  ├─ botConfig.js
   │  └─ serverConfig.js
   ├─ index.js
   ├─ services
   │  └─ userService.js
   └─ utils
      └─ dateUtils.js
```

## API Endpoints

### Fetch User Data

**Endpoint:** `GET /api/v1/user/:userid`

**Description:** Fetch detailed user data from Discord for a specified user ID.

**URL Parameters:**
- `userid` (required): The ID of the Discord user you want to retrieve data for.

**Example Response:**

```json
{
  "data": {
    "spotify": {
      "track_id": "spotify_track_id",
      "timestamps": {
        "start": 1609459200000,
        "end": 1609462800000
      },
      "album": "Album Name",
      "album_art_url": "https://i.scdn.co/image/spotify_image_id",
      "artist": "Artist Name",
      "song": "Song Title"
    },
    "discord_user": {
      "id": "user_id",
      "username": "username",
      "avatar": "avatar_url",
      "discriminator": "discriminator",
      "bot": false,
      "clan": null,
      "global_name": "username",
      "avatar_decoration_data": null,
      "display_name": "username",
      "public_flags": 0
    },
    "activities": [
      {
        "id": "activity_id",
        "name": "Activity Name",
        "type": 0,
        "timestamps": {
          "start": 1609459200000
        },
        "created_at": 1609459200000,
        "details": "Activity Details",
        "state": "Activity State",
        "assets": {
          "large_text": "Large Text",
          "large_image": "large_image_id"
        },
        "party": {
          "id": "party_id"
        }
      }
    ],
    "discord_status": "online",
    "active_on_discord_web": true,
    "active_on_discord_desktop": false,
    "active_on_discord_mobile": true,
    "listening_to_spotify": true
  },
  "success": true
}
```

## Commands

The bot responds to the following command in a Discord channel:

- `!userdata @user` - Fetches and displays the user data of the mentioned user in JSON format.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and create a pull request. 

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
