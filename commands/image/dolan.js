module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/dolan.png"
        ]
      })
}

module.exports.help = {
    name: "dolan"
}