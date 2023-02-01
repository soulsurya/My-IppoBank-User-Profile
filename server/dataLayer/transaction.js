import constants from "../constants.js";
import MongoConnection from "../mongo_layer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const TransactionDAO = {};

/**
 * This function is used to get the customer transactions
 * @param {string} customerId
 * @returns transactions
 */

TransactionDAO.getTransactionsByCustomerId = async (customerId) => {
    try {
        console.info(`In TransactionDAO.getTransactionsByCustomerId where customerId = ${customerId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.CUSTOMER_ID]: customerId };
        let result = await MongoCRUD.getFullMongoObject(connectDb, constants.MONGO_COLLECTION.TRANSACTIONS, query);
        return result || {};
    } catch (error) {
        console.error(`In TransactionDAO.getTransactionsByCustomerId ERROR : ${error.message} where customerId = ${customerId}`);
        throw error;
    }
}


export default TransactionDAO;