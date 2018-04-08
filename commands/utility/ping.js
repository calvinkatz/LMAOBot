module.exports.run = (client, message, args) => {
    message.channel.send(`P0ng!!1!11! My connection to the server is \`${Date.now() - message.createdTimestamp} ms\` :alien:`);
}

module.exports.help = {
    name: "ping"
}