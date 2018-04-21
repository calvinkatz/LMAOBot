const {google} = require('googleapis')
const sheets = google.sheets('v4')

require("dotenv").config(); // this is for windows only. REMOVE WHEN UPLOADING TO VPS!!!!!4!!!!

module.exports = {
  // Information
  name: 'feedback',
  aliases: ['fb'],
  description: 'Give the bot developers feedback!',
  args: {
    req: true,
    min: 1,
  },
  cooldown: 60,
  // Function
  run: (client, command, message, args) => {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_ID,
      process.env.GOOGLE_SECRET
    );

    oauth2Client.credentials = {
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    };

    oauth2Client.refreshAccessToken((err, tokens) => {
    if (err) return message.channel.send("An exception occured! Please try again later.").then(console.error(err));

    oauth2Client.credentials = tokens;

    sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [new Date().toISOString(), message.author.id, message.author.tag, args.join(" "), '=\"#\"&Row()-5']   
        ],
      },
      auth: oauth2Client
    }, (err, response) => {
      if (err) return message.channel.send(":x: An exception occured! Try again in a moment!");
    });

    message.channel.send(`${client.config.emojis.info} Thank you! We have received your feedback.
**PLEASE NOTE**: Abusing this command will result in a permanent ban from ever using it again!`)

  })
  }
};
