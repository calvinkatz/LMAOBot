const prefix = "lmao";
module.exports.run = (client, message, args) => {
    var rollargs = message.content.substring(prefix.length);
    if (rollargs[1] != null ){
        var random = Math.floor(Math.random() *  100) + 1
        message.channel.send("You rolled a " + random + "!");
        }
}

module.exports.help = {
    name: "roll"
}