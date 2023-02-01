import constants from "../constants.js";
import MongoConnection from "../mongoLayer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const TransactionPersistence = {};

TransactionPersistence.insertOne = async (transactionModel) => {
    try {
        console.debug(`In TransactionPersistence.insertOne where transactionModel = ${JSON.stringify(transactionModel)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        return await MongoCRUD.insert(connectDb, constants.MONGO_COLLECTION.TRANSACTIONS, transactionModel);
    } catch (error) {
        console.error(`In TransactionPersistence.insertOne throwing an error for transactionModel = ${JSON.stringify(transactionModel)} with message = ${error.message}`);
        throw error;
    }
}

export default TransactionPersistence;