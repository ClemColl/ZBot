const fs = require('fs');
const Discord = require('discord.js');
const pool = require('./clientpool.js')

// reading ENV vars
const { prefix, token } = require('./config.js')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', async () => {
  client.user.setActivity("l'évolution", { type: "WATCHING"})
  console.log('Up and running!');
  await pool.connect()
  console.log('Connected to DB!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('On dirait que cette commande ne fonctionne pas... Zepri doit replonger dans le code')
  }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(token);