module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/spiderman.jpg"
        ]
      })
}

module.exports.help = {
    name: "spiderman"
}