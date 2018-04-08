module.exports.run = (client, message, args) => {
    message.channel.send(`I agree with ${message.member.user}`);
}

module.exports.help = {
    name: "agree"
}