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

        var finalString = ''
        var highestRank = 0
        var highestRankImage = ''
        
        if (ranks.ratings) {
                if (tank = ranks.ratings[0]) {
                        finalString = finalString + `TANK: ${tank.level}  |  `
                        if (tank.level > highestRank) highestRank = tank.level, highestRankImage = tank.rankIcon
                } else {finalString = finalString + 'TANK: Non classé | '}
                
                if (dps = ranks.ratings[1]) {
                        finalString = finalString + `DPS: ${dps.level}  |  `
                        if (dps.level > highestRank) highestRank = dps.level, highestRankImage = dps.rankIcon
                } else {finalString = finalString + 'DPS: Non classé | '}

                if (heal = ranks.ratings[2]) {
                        finalString = finalString + `HEAL: ${heal.level}`
                        if (heal.level > highestRank) highestRankImage = heal.rankIcon
                } else {finalString = finalString + 'HEAL: Non classé'}
        } else { finalString = "Tu n'es pas classé sur ce jeu, et tu fais chier tout le monde"}
        
        if (highestRankImage == '') {
                message.reply(finalString)
        } else {
                message.reply(finalString, {files: [highestRankImage]})
        }
        
        
        //: TODO push data to db
	},
};