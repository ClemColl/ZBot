const { apex_key } = require('../config.js')
//const pool = require('../clientpool.js')
const fetch = require('node-fetch')

module.exports = {
	name: 'rankapex',
	description: 'Shows your apex rank',
	async execute(message, args) {
        console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`);
        
        const platform_id = "Twitch_Zepri"
        
        const response = await fetch(`https://api.mozambiquehe.re/bridge?version=5&platform=PC&player=${platform_id}&auth=${apex_key}`)
        const data = await response.json()
        //const user_id = message.author.id
        //const queryText = `SELECT platform_id FROM account_table WHERE user_id = '${user_id}' and platform_name = 'uPlay'`;

        const rank = data.global.rank

        message.reply(`Tu es ${rank.rankName} ${rank.rankDiv} avec ${rank.rankScore} points`, {files: [rank.rankImg]})
                
        //: TODO push data to db
        
	}
};