module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          "img/megusta.png"
        ]
      })
}

module.exports.help = {
    name: "megusta"
}