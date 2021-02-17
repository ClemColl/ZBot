const { Pool } = require ('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    tcp_keepalives_idle: 0,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool