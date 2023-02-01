import constants from "../constants.js";
import MongoConnection from "../mongoLayer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const UserAccountPersistence = {};


UserAccountPersistence.update = async (accountDetails) => {
    try {
        console.debug(`In UserAccountPersistence.update where accountDetails = ${JSON.stringify(accountDetails)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let idField = { customerId: accountDetails?.idField };
        let docToUpdate = { $set: accountDetails.docToUpdate }
        return await MongoCRUD.update(connectDb, constants.MONGO_COLLECTION.USER_ACCOUNTS, idField, docToUpdate);
    } catch (error) {
        console.error(`In UserAccountPersistence.update throwing an error for accountDetails = ${JSON.stringify(accountDetails)} with message = ${error.message}`);
        throw error;
    }
}

UserAccountPersistence.insertOne = async (accountModel) => {
    try {
        console.debug(`In UserAccountPersistence.insertOne where accountModel = ${JSON.stringify(accountModel)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        return await MongoCRUD.insert(connectDb, constants.MONGO_COLLECTION.USER_ACCOUNTS, accountModel);
    } catch (error) {
        console.error(`In UserAccountPersistence.insertOne throwing an error for accountModel = ${JSON.stringify(accountModel)} with message = ${error.message}`);
        throw error;
    }
}

UserAccountPersistence.updateBalance = async (updateModel) => {
    try {
        console.debug(`In UserAccountPersistence.updateBalance where updateModel = ${JSON.stringify(updateModel)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let idField = updateModel?.idField;
        let docToUpdate = updateModel?.docToUpdate
        return await MongoCRUD.update(connectDb, constants.MONGO_COLLECTION.USER_ACCOUNTS, idField, docToUpdate);
    } catch (error) {
        console.error(`In UserAccountPersistence.updateBalance throwing an error for updateModel = ${JSON.stringify(updateModel)} with message = ${error.message}`);
        throw error;
    }
}


export default UserAccountPersistence;