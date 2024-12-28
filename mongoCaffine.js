const { MongoClient } = require('mongodb')

async function read(uri, dbName, collName) {
  if (!uri || !dbName || !collName) {
    console.error('ERROR: missing mongoDB uri, database name, or collection name')
    return
  }
  const client = new MongoClient(uri)
  try {
    console.log("connecting to", dbName, collName)
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collName)
    const findResult = await collection.find({}).toArray()
    console.log(`${dbName}.${collName} has`, findResult.length, 'documents')
  } catch (error) {
    console.log(error)
  } finally {
    client.close()
  }
}

//read(process.env.MONGO_URI_STAT_CODADASH_COM, 'myFirstDatabase', 'statements')
// always get bad creds on this, despite being exactly what the server is using
// and the db is open to all IPs
read(process.env.MONGO_URI_TYPE_RACER, 'game', 'games')
//read(process.env.MONGO_URI_TYPE_RACER, 'scrape', 'upcoming-movies')
read(process.env.MONGO_URI_MARKET, 'market', 'accounts')
