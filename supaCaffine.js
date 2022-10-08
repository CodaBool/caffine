require('dotenv').config()
const pgp = require('pg-promise')();

async function read(connectionString, table) {
  const db = pgp(connectionString)
  const res = await db.any(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`)
  console.log('res', res)
}

read(process.env.PG_URI_GEN, 'trending_github')
read(process.env.PG_URI_DEK, 'trending_github')
pgp.end()

// SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'