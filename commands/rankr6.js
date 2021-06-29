const { r6Mail, r6Pass } = require('../config.js')
const R6API = require('r6api.js').default;
const pool = require('../clientpool.js')

module.exports = {
	name: 'rankr6',
	description: 'Shows your r6 rank',
	async execute(message, args) {
        console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`);
        
        
        const r6api =  new R6API({email: r6Mail, password: r6Pass });
        const user_id = message.author.id
        const queryText = `SELECT platform_id FROM account_table WHERE user_id = '${user_id}' and platform_name = 'uPlay'`;

        await pool.query(queryText)
        .then(async (result) => {
                const platform_id = result.rows[0].platform_id
                await r6api.getRanks('uplay', platform_id, { regionsIds: 'emea', boardIds: 'pvp_ranked', seasons: [-1] })
                .then(result => {
                        const data = result[0].seasons
                        const rank = Object.values(data)[0].regions.emea.boards.pvp_ranked.current
                        
                        message.reply('tu es ' + rank.name + ' avec ' + rank.mmr + ' de MMR.', {files: [rank.icon]})
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