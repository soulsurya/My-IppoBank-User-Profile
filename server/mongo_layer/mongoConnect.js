import { MongoClient } from 'mongodb';

const MongoConnection = {}

let connectionObject = {}

/**
 * Creating a async
 * @param {The database name} database 
 */
MongoConnection.createConnectionAsync = async (database = process.env.MONGO_DB) => {
    const url = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_URL + "/";
    const client = new MongoClient(url + database, { useUnifiedTopology: true });
    await client.connect().then((client) => {
        connectionObject[database] = client.db(database)
    })
}

MongoConnection.getConnection = async (database) => {
    if (connectionObject[database] === undefined || connectionObject[database] === null) {
        await MongoConnection.createConnectionAsync(database)
    }
    return connectionObject[database]
}

export default MongoConnection