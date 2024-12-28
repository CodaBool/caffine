const pgp = require('pg-promise')();
const dbGen = pgp(process.env.PG_URI_GEN)
const dbMap = pgp(process.env.PG_URI_MAP)
//const dbDek = pgp(process.env.PG_URI_DEK)

async function read(db, project) {
  const res = await db.any(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`)
  console.log(project, 'said in a very jittery voice that it has', res.length, "tables and it's very tired" )
}

async function write(db, project) {
  let date = new Date()
  date = date.toUTCString().slice(0, 25)
  console.log('filling coffee for', project)
  const res = await db.any(`UPDATE caffine SET last_caffine=(to_timestamp(${Date.now()} / 1000.0));`)
//  const res = await db.any(`UPDATE caffine SET caffine='${date}';`  `UPDATE caffine SET caffine='(to_timestamp(${Date.now()} / 1000.0))'`)
}

read(dbGen, 'general')
read(dbMap, 'community-map')
//read(dbDek, 'deck')

write(dbGen, 'general')
write(dbMap, 'community-map')
//write(dbDek, 'deck')

pgp.end()
