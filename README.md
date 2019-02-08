LMAOBot
=======

# About

Developed in Node.js

# Running The Bot
1. You'll need to setup Node.js, and Python 2.7+!

	* [Node.js](https://nodejs.org/en/)
	* [Python 2.7*](https://www.python.org/)

2. Insall dependencies.

> apt-get install build-essential autoconf libtool sqlite3 ffmpeg

3. Install pm2 for startup control.

```sh
npm install pm2@latest -g
```

4. In the project's directory:

```sh
npm install node-gyp-build
npm install
npm install sqlite3 ffmpeg bufferutil erlpack@discordapp/erlpack node-opus opusscript sodium libsodium-wrappers uws
cp start.sh.sample start.sh
```
5. Edit start.sh. Set TOKEN to your bot auth token.

6. Run start.sh

```sh
./start.sh
```

7. Use pm2 to save the service config and generate the startup script.

```sh
pm2 save
pm2 startup
```

8. Take the output section from 'pm2 startup' and run in the terminal.

The service should be running and enabled for automatic start at boot.
