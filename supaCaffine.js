require('dotenv').config()
const pgp = require('pg-promise')();
const dbGen = pgp(process.env.PG_URI_GEN)
const dbDek = pgp(process.env.PG_URI_DEK)

async function read(db, project) {
  const res = await db.any(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`)
  console.log(project, 'has', res.length, 'tables' )
}

async function write(db, project) {
  let date = new Date()
  date = date.toUTCString().slice(0, 25)
  console.log('setting all rows of table test in project', project, 'to', date)
  const res = await db.any(`UPDATE test SET caffine='${date}';`)
}

read(dbGen, 'general')
read(dbDek, 'deck')

write(dbGen, 'general')
write(dbDek, 'deck')

pgp.end()
