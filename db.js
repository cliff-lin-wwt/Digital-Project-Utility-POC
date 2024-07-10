const { Pool } = require('pg')
const pool = new Pool( {
    host: 'db',
    port: 5432,
    user: 'CliffLin',
    password: '12345678910',
    database: 'postgres-vue'
})

module.exports = pool