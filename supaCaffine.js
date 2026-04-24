const pgp = require("pg-promise")();

const dbGen = pgp(process.env.PG_URI_GEN);
const dbMap = pgp({
  connectionString: process.env.PG_URI_GEN,
  ssl: { rejectUnauthorized: false }
});


async function read(db, project) {
  const res = await db.any(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `);

  console.log(
    project,
    "said in a very jittery voice that it has",
    res.length,
    "tables and it's very tired"
  );
}

async function write(db, project) {
  console.log("filling coffee for", project);

  await db.none(`
    UPDATE caffine
    SET last_caffine = to_timestamp($1 / 1000.0)
  `, [Date.now()]);
}

async function main() {
  try {
    await Promise.all([
      read(dbGen, "general"),
      read(dbMap, "community-map"),
      write(dbGen, "general"),
      write(dbMap, "community-map"),
    ]);
  } finally {
    pgp.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
