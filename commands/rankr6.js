const R6API = require('r6api.js');
const { email, pass } = require('../config.js');
const { Pool } = require('pg')

const r6api = new R6API(email, pass);

module.exports = {
	name: 'rankr6',
	description: 'Shows your r6 rank',
	async execute(message, args) {
        console.log(`Executing ${this.name} command, initiated by ${message.author.username}, with args ${args}`);
        
        const user_id = message.author.id

        // search for platform_id in db
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

        pool.connect(err => {
            if(err) throw err;
            console.log('Connected to PostgreSQL db')
        })

       const query = "SELECT platform_id FROM account_table WHERE user_id = '" + user_id + "' and platform_name = 'uPlay'";

        pool.query(query, function(err, result) {         
            if(err) throw err;
            const patform_id = result
            // get the data with the API call
            const data = await r6api.getRank('uplay', patform_id, { regions: ['emea'] });
            const rank = data[0].seasons[20].regions.emea.current

            //: TODO push data to db

            // send message with the stats
            message.reply('tu es ' + rank.name + ' avec ' + rank.mmr + ' de MMR.', {files: [rank.image]});
        });

        pool.end(err => {
            if(err) throw err; 
            console.log('Disconnected from PostgresSQL');
          });
       
        //message.reply("Cette commande ne fonctionne pas pour l'instant... Mais Zepri est sur le coup!")
	},
};