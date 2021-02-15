module.exports = {
	name: 'ping',
	description: 'Ping! Pong!',
	execute(message, args) {
		console.log(`Executing ${this.name} command, initiated by ${message.author.username}`);
		message.reply('pong');
	},
};