module.exports = {
  // Information
  name: 'eval',
  description: 'Do shit around Discord. (╯°□°）╯︵ ┻━┻',
  // Requirements
  dev_only: true,
  // Function
  run: async (client, command, msg, args) => {
    const evalargs = msg.content.split(' ').slice(2);

    const clean = text => {
      if (typeof text === 'string') {
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
      } else {
        return text;
      }
    };

    try {
      const code = evalargs.join(' ');
      let evaled = await eval(code);

      if (typeof evaled !== 'string') evaled = require('util').inspect(evaled).slice(0, 1950);

      msg.channel.send(clean(evaled), {
        code: 'xl',
      });
    } catch (err) {
      msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  },
};