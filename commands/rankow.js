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
        if (result.rows[0] == undefined) return message.reply("Impossible de te trouver dans la base de données... Vous n'êtes pas assez compétitif?")
        const platform_id = result.rows[0].platform_id

        const response = await fetch(`https://ow-api.com/v1/stats/pc/eu/${platform_id}/profile`)
        const ranks = await response.json()

        var finalString = "Tu n'es pas classé sur ce jeu, ou ton profil est privé"
        
        if (ranks.ratings) {
                finalString = ''
                var highestRank = 0
                var highestRankImage = ''

                ranks.ratings.forEach(rating => {
                        finalString = finalString + `**${rating.role.toUpperCase()}** ${rating.level} \n`
                        if (rating.level > highestRank) highestRank = rating.level, highestRankImage = rating.rankIcon
                })
        }

        if (highestRankImage == '') {
                message.channel.send(finalString)
        } else {
                message.channel.send(finalString, {files: [highestRankImage]})
        }
        
        
        //: TODO push data to db
	},
};