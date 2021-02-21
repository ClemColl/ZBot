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
        if (result.rows[0] === null) return message.reply("Impossible de te trouver dans la base de données... Vous n'êtes pas assez compétitif?")
        const platform_id = result.rows[0].platform_id

        const api = 'https://ow-api.com/v1/stats/pc/eu/' + platform_id + '/profile'
        const response = await fetch(api)
        const ranks = await response.json()

        const tank = ranks.ratings[0],
              dps = ranks.ratings[1],
              healer = ranks.ratings[2]

            //:TODO For Each, same logic + variable max rank for rankIcon
            const tankString = tank ? tank.role.toUpperCase() + ': ' + tank.level + '  |  ' : ''
            const dpsString = dps ? dps.role.toUpperCase() + ': ' + dps.level + '  |  ' : ''
            const healerString = healer ? healer.role.toUpperCase() + ': ' + healer.level : ''

            const finalString = tankString + dpsString + healerString    
        //const ranks = 

        message.reply(finalString, {files: [tank.rankIcon || dps.rankIcon || healer.rankIcon || '']})
        
        //: TODO push data to db
	},
};