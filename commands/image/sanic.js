module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/sanic.png"
        ]
      })
}

module.exports.help = {
    name: "sanic"
}