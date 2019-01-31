LMAOBot
=======

<img src="https://discordbots.org/api/widget/398413630149885952.svg?sanitize=true">

> A Discord bot with dank memes, and an even danker soundboard.

# About

Developed in Node.js and run by memes, this bot is the dankest thing around!

# Contact

You can contact us, the developers, in our support server:

* [Support Server](https://discordapp.com/invite/aQ25yFy)

# Inviting The Bot

There are multiple ways to invite our bot to your servers!

* [Direct](https://discordapp.com/oauth2/authorize/?permissions=1341643969&scope=bot&client_id=398413630149885952)
* [DiscordBots.org](https://discordbots.org/bot/398413630149885952)


# Contributing

> Fork, edit and commit!
**Please note:** All **major** contributers will be rewarded. (Name on info command)

# Running The Bot
1. You'll need to setup Node.js, and Python 2.7+!

	* [Node.js](https://nodejs.org/en/)
	* [Python 2.7*](https://www.python.org/)

2. Once you have Node.js & Python 2.7* setup, run the following command in the project's directory:

> npm install

Once you've finished installing the node modules using the command above, you'll be able to run the bot!

**NOTE:** We do not endorse self hosting the bot under any circumstances. We host the bot 24/7 on our servers.

# CK - Changes

Ubuntu 18.04

apt-get install build-essential autoconf libtool sqlite3 ffmpeg

As root
~~~~~
npm install pm2@latest -g
~~~~~

Create lmaobot user with a home directory. Add user to sudoers.
Impersinate lmaobot:
~~~~
npm install node-gyp-build
npm install
npm install sqlite3 ffmpeg bufferutil erlpack@discordapp/erlpack node-opus opusscript sodium libsodium-wrappers uws
cp start.sh.sample start.sh
~~~~

Edit start.sh
Set environment variable TOKEN to bot auth token.
Start using script.

~~~~
pm2 save
pm2 startup
~~~~

Run command outputed by 'pm2 startup'
Reboot

~~~~
systemctl status pm2-lmaobot
~~~~

Service should be running.