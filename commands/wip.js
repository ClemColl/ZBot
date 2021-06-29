const R6API = require('r6api.js')
const { r6Mail, r6Pass } = require('../config.js')
const r6api = new R6API(r6Mail, r6Pass)

module.exports = {
	name: 'wip',
	description: 'wip',
	execute(message, args) {
		console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`)

		message.reply('error' + reason)
	}
};