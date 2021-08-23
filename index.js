require('dotenv').config()
const { MongoClient } = require('mongodb')

async function read(uri, dbName, collName) {
  if (!uri || !dbName || !collName) {
    console.error('ERROR: missing mongoDB uri, database name, or collection name')
    return
  }
  const client = new MongoClient(uri)
  try {
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

read(process.env.MONGO_URI_STAT_CODADASH_COM, 'myFirstDatabase', 'statements')
read(process.env.MONGO_URI_TYPE_RACER, 'game', 'games')
read(process.env.MONGO_URI_TYPE_RACER, 'scrape', 'upcoming-movies')
read(process.env.MONGO_URI_MARKET, 'market', 'accounts')