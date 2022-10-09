require('dotenv').config()
const pgp = require('pg-promise')();

async function read(connectionString, project) {
  const db = pgp(connectionString)
  const res = await db.any(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`)
  console.log(project, 'has', res.length, 'tables' )
}

read(process.env.PG_URI_GEN, 'general')
read(process.env.PG_URI_DEK, 'deck')
pgp.end()

// SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'
