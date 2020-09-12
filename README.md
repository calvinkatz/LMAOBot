# LMAOBot

## About

Developed in Node.js

## Running The Bot

You'll need to setup Node.js, and Python 2.7+!

* [Node.js](https://nodejs.org/en/)
* [Python 2.7*](https://www.python.org/)

Install dependencies:

```sh
# Ubuntu
apt-get install build-essential autoconf libtool sqlite3 ffmpeg git

# CentOS 7
rpm -v --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm
yum install -y autoconf gcc-c++ libtool git make ffmpeg

# CentOS 8
dnf install epel-release dnf-utils
yum-config-manager --set-enabled PowerTools
yum-config-manager --add-repo=https://negativo17.org/repos/epel-multimedia.repo
dnf install -y autoconf gcc-c++ libtool git make ffmpeg
```


Install pm2 for startup control:

```sh
npm install pm2@latest -g
```

Download the bot:

```sh
cd /opt
git clone https://github.com/calvinkatz/LMAOBot.git
```

Add user and setup permissions:

```sh
useradd -r -m lmaobot
chown -R lmaobot:lmaobot /opt/LMAOBot
chmod 664 /opt/LMAOBot/database.sql
su - lmaobot
cd /opt/LMAOBot
```

In the project's directory:

```sh
npm install node-gyp-build
npm install
npm install sqlite3 ffmpeg bufferutil erlpack@discordapp/erlpack node-opus opusscript sodium libsodium-wrappers uws
cp start.sh.sample start.sh
```

Edit *start.sh* and set TOKEN to your bot auth token then run the script.

Use pm2 to save the service config and generate the startup script:

```sh
pm2 save
pm2 startup
```

Take the output section from 'pm2 startup' and run in the terminal.

The service should be running and enabled for automatic start at boot.

Exclude the database from updates:

```sh
git update-index --assume-unchanged database.sql
```
