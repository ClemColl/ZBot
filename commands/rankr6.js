const R6API = require('r6api.js')
const { r6Mail, r6Pass } = require('../config.js')
const pool = require('../clientpool.js')

module.exports = {
	name: 'rankr6',
	description: 'Shows your r6 rank',
	async execute(message, args) {
        console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`);
        
        const user_id = message.author.id
        const queryText = `SELECT platform_id FROM account_table WHERE user_id = '${user_id}' and platform_name = 'uPlay'`;

        await pool.query(queryText)
        .then(async (result) => {
                const platform_id = result.rows[0].platform_id
                await new R6API(r6Mail, r6Pass).getRank('uplay', platform_id, { regions: ['emea'], seasons: [-1] })
                .then(result => {
                        const data = result[0].seasons
                        const rank = Object.values(data)[0].regions.emea.current

                        message.reply('tu es ' + rank.name + ' avec ' + rank.mmr + ' de MMR.', {files: [rank.image]})
                }
                , reason => {
                        message.reply(`Erreur de merde: ${reason})`)
                })
                
        }, reason => {
                message.reply(`Erreur de merde: ${reason})`)
        })
                
        //: TODO push data to db
        
	}
};