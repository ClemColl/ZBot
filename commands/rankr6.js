const R6API = require('r6api.js');
const { email, pass } = require('../config.js');
//const players_registry = require('../data/players_registration.json')
const r6api = new R6API(email, pass);

module.exports = {
	name: 'rankr6',
	description: 'Shows your r6 rank',
	async execute(message, args) {
        console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`);
        
        //const sendersID = message.author.id;

        // search for uPlayID in players_registry
       // const uplayID = players_registry.players[sendersID].platforms.uplayID;

        // get the data with the API call
       // const data = await r6api.getRank('uplay', uplayID, { regions: ['emea'] });
       // const rank = data[0].seasons[20].regions.emea.current

        // push data to json file


        // send message with the stats
		//message.reply('tu es ' + rank.name + ' avec ' + rank.mmr + ' de MMR.', {files: [rank.image]});
        message.reply("Cette commande ne fonctionne pas pour l'instant... Mais Zepri est sur le coup!")
	},
};