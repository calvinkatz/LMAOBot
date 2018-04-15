var rp = require('request-promise');

module.exports = {
  // Information
  name: 'reddit',
  description: 'Server Sub-Reddits.',
  usage: '<subreddit> <view>',
  explanation: {
    subreddit: {
      description: 'Subreddit to pull post from.',
      default: 'random'
    },
    view: {
      description: 'What sort of post to view.',
      default: 'hot',
      options: ['hot', 'new'],
    }
  },
  // Requirements
  // Custom Data
  subreddits: [
    'dankmemes',
    'fffffffuuuuuuuuuuuu',
    'vertical',
    'AdviceAnimals',
    'Inglip',
    'wholesomememes',
    'MemeEconomy',
    'BlackPeopleTwitter',
    'shittyadviceanimals',
    'ProgrammerHumor',
    'oddlysatisfying',
    'mildlyinfuriating',
    'softwaregore',
    'me_irl',
    'mildlyinteresting'
  ],
  // Function
  run: async (client, command, msg, args) => {
    let subreddit = command.subreddits[Math.floor(Math.random() * command.subreddits.length)];
    if (args.length > 0) {
      subreddit = args[0].toLowerCase();
    }

    let endpoint = 'hot';
    if (args.length >= 2 && command.explanation.view.options.includes(args[1].toLowerCase())) {
      endpoint = args[1].toLowerCase();
    }

    let response;
    try {
      response = await rp(`https://www.reddit.com/r/${subreddit}/${endpoint}.json?limit=100`);
    } catch (error) {
      return msg.channel.send({
        embed: {
          color: 0x00AE86,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: `r/${subreddit}/${endpoint}`,
          description: `Subreddit was not found :confused:`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: client.config.embed.footer,
          },
        },
      });
    }

    const posts = JSON.parse(response).data.children;

    if (posts.length === 0) {
      return msg.channel.send({
        embed: {
          color: 0x00AE86,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          title: `r/${subreddit}/${endpoint}`,
          description: `Nothing was found :confused:`,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: client.config.embed.footer,
          },
        },
      });
    }

    let index = 0;
    let checks = 0;
    do {
      if (checks >= 100) {
        return msg.channel.send({
          embed: {
            color: 0x00AE86,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL,
            },
            title: `r/${subreddit}/${endpoint}`,
            description: `Nothing was found :confused:`,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: client.config.embed.footer,
            },
          }
        });
      }
      checks += 1;

      index = Math.floor(Math.random() * posts.length);

      if (index < 0) {
        index = posts.length - 1;
      } else if (index > (posts.length - 1)) {
        index = 0;
      }
    } while (posts[index].data.over_18 || !('preview' in posts[index].data) || posts[index].data.preview.images.length === 0);

    const reply = await msg.channel.send({
      embed: command.post_embed(client, posts[index].data, {
        subreddit: subreddit,
        endpoint: endpoint,
      }),
    });

    await client.add_msg_reaction_listener(command, reply, ['⬅', '🔄', '➡'], {
      extra: {
        subreddit: subreddit,
        endpoint: endpoint,
        index: index,
        posts: posts,
      }
    });
  },
  post_embed: (client, post, data) => {
    return {
      color: 0x00AE86,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL,
      },
      title: `r/${data.subreddit}/${data.endpoint}`,
      description: `[${post.title}](https://reddit.com${post.permalink})\n${post.selftext}`,
      image: {
        url: post.preview.images[0].source.url,
      },
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: client.config.embed.footer,
      },
    };
  },
  on_reaction: (client, command, data, operation, reaction) => {
    let checks = 0;
    do {
      if (checks >= 100) {
        return data.message.edit({
          embed: {
            color: 0x00AE86,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL,
            },
            title: `r/${data.extra.subreddit}/${data.extra.endpoint}`,
            description: `Nothing was found :confused:`,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: client.config.embed.footer,
            },
          }
        });
      }
      checks += 1;

      if (reaction.emoji.name === '⬅') {
        data.extra.index -= 1;
      } else if (reaction.emoji.name === '🔄') {
        data.extra.index = Math.floor(Math.random() * data.extra.posts.length);
      } else if (reaction.emoji.name === '➡') {
        data.extra.index += 1;
      }

      if (data.extra.index < 0) {
        data.extra.index = data.extra.posts.length - 1;
      } else if (data.extra.index > (data.extra.posts.length - 1)) {
        data.extra.index = 0;
      }
    } while (data.extra.posts[data.extra.index].data.over_18 || !('preview' in data.extra.posts[data.extra.index].data) || data.extra.posts[data.extra.index].data.preview.images.length === 0);

    data.message.edit({
      embed: command.post_embed(client, data.extra.posts[data.extra.index].data, {
        subreddit: data.extra.subreddit,
        endpoint: data.extra.endpoint,
      }),
    });
  }
};