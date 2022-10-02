const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'MOCK1',
    password: 'vuthu1201',
    port: 5432,
})

module.exports = client