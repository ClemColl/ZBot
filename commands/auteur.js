module.exports = {
	name: 'auteur',
	description: "Returns the sender's name",
	execute(message, args) {
		console.log(`Executing ${this.name} command, initiated by ${message.author.username}`);
		message.channel.send(message.author.username);
	},
};