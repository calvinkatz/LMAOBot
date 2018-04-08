const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN });
process.on('unhandledRejection', console.error)
manager.spawn();
manager.on('launch', shard => console.log(`Launched shard ${shard.id}`));
