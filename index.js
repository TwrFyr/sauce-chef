const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS]});
client.commands = new Collection();

// register commands dynamically
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const cooldowns = new Collection();

client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity(`${prefix}help`, {type: 'LISTENING'});
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // check if command is registered, else return
  if (!client.commands.has(commandName)) {
    return;
  }

  // handle invalid command usage
  const command = client.commands.get(commandName);
  if (command.guildOnly && message.channel.type !== 'text') {
    if (message.channel.type === 'dm') {
      return message.channel.send('I can\'t execute that command inside DMs!');
    }
    return message.channel.reply('I can\'t execute that command inside DMs!');
  }
  if (command.args && !args.length) {
    let reply = `You didn't provide the necessary arguments, ${message.author}`;

    if (command.usage) {
      reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // handle command cooldowns
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    // execute command
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('error executing that command');
  }
});

client.login(token);
