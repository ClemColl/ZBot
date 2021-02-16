const R6API = require('r6api.js');
const { email, pass } = require('../config.js');
//const players_registry = require('../data/players_registration.json')
const r6api = new R6API(email, pass);

module.exports = {
	name: 'register',
	description: 'Ping! Pong!',
	async execute(message, args) {
		console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`);
        let game = args[0]
        let nickname = args[1]
        
        if (game === 'r6') {
            
            // Get Sender's discord ID
            const sendersID = message.author.id
            const sendersName = message.author.username
            message.channel.send(sendersName + ': Ton ID Discord est ' + sendersID);

            // today.toJSON()

            // Get uPlay ID

            try {
                const nicknameId = await r6api.getId('uplay', nickname).then(el => el[0].id);
                message.channel.send(nickname + ': Ton ID uPlay est ' + nicknameId);
            } catch (error) {
                message.channel.send("La commande r6 a timeout... @Zepri doit replonger dans le code");
            }

            // Save to json
                // Setup json file

            // Get current lvl


            message.channel.send('Inscription réussie!');
        } else
        if (game === 'lol') {
            message.channel.send('Désolé, nous sommes en 2021');
        } else
        if (game === 'ow') {
            message.channel.send('Work in Progress..');
        } else {
            message.channel.send('Problème!');
        }
	},
};