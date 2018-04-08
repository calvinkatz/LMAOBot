module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/lol.png"
        ]
    });
}

module.exports.help = {
    name: "lol"
}