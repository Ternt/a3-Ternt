const mongo      = require('mongodb');
const dotenv     = require('dotenv').config();

const mongodb = {
    db: null,
}

async function connectDatabase() {
    const db_uri     = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/`;
    const client     = new mongo.MongoClient(db_uri);
    await client.connect();

    mongodb.db = client.db('A3-Ternt');
}

module.exports = {
    mongodb: mongodb,
    connectDatabase: connectDatabase,
};