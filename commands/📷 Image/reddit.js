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
      options: ['hot', 'new', 'rising'],
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
    'shittyadviceanimals'
  ],
  // Function
  run: async (client, command, msg, args) => {
    let subreddit = command.subreddits[Math.floor(Math.random() * command.subreddits.length)];
    if (args.length > 0) {
      subreddit = args[0].toLowerCase();
    }

    let endpoint = 'hot';
    if (args.length >= 2 && command.explanation.view.indexOf(args[1].toLowerCase()) !== -1) {
      endpoint = args[1].toLowerCase();
    }

    const posts = JSON.parse(await rp(`https://www.reddit.com/r/${subreddit}/${endpoint}.json?limit=100`)).data.children;
    const index = Math.floor(Math.random() * posts.length);

    const reply = await msg.channel.send({
      embed: command.post_embed(client, posts[index].data, {
        subreddit: subreddit,
        endpoint: endpoint,
      }),
    });

    await client.add_msg_reaction_listener(command, reply, ['⬅', '🔄', '➡'], {
      data: {
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
  on_reaction: (client, msg, operation, reaction) => {
    console.log('reaction!');
  }
};