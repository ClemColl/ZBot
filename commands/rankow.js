//const R6API = require('r6api.js')
//const { r6Mail, r6Pass } = require('../config.js')
const pool = require('../clientpool.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'rankow',
	description: 'Shows your ow rank',
	async execute(message, args) {
        console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`);
        
        const user_id = message.author.id

        const queryText = "SELECT platform_id FROM account_table WHERE user_id = '" + user_id + "' and platform_name = 'Battle.net'";
        const result = await pool.query(queryText)
        const platform_id = result.rows[0].platform_id

        const api = 'https://ow-api.com/v1/stats/pc/eu/' + platform_id + '/profile'
        const response = await fetch(api)
        const ranks = await response.json()
        const tank = ranks.ratings[0],
              dps = ranks.ratings[1], 
              healer = ranks.ratings[2]

              const finalString =
              'tu es ' + tank.level + ' en ' + tank.role + '\n' +
              'tu es ' + dps.level + ' en ' + dps.role + '\n' +
              'tu es ' + healer.level + ' en ' + healer.role + '\n'
        //const ranks = 

        message.reply(finalString, {files: [tank.rankIcon, ranks.ratings[1].rankIcon, ranks.ratings[2].rankIcon]})
        
        //: TODO push data to db
	},
};