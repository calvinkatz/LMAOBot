module.exports.run = (client, message, args) => {
    message.channel.send({
        files: [
          'img/pepe.png'
        ]
      });
}

module.exports.help = {
    name: "pepe"
}