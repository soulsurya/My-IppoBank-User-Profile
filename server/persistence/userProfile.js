import constants from "../constants.js";
import MongoConnection from "../mongoLayer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";

const UserProfilePersistence = {};


UserProfilePersistence.createProfile = async (profileDetails) => {
    try {
        console.debug(`In UserProfilePersistence.createProfile where profileDetails = ${JSON.stringify(profileDetails)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let idField = { customerId: profileDetails?.idField };
        let docToUpdate = { $set: profileDetails.docToUpdate }
        return await MongoCRUD.update(connectDb, constants.MONGO_COLLECTION.USER_PROFILES, idField, docToUpdate);
    } catch (error) {
        console.error(`In UserProfilePersistence.createProfile throwing an error for profileDetails = ${JSON.stringify(profileDetails)} with message = ${error.message}`);
        throw error;
    }
}

UserProfilePersistence.insertOne = async (profileDetails) => {
    try {
        console.debug(`In UserProfilePersistence.insertOne where profileDetails = ${JSON.stringify(profileDetails)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        return await MongoCRUD.insert(connectDb, constants.MONGO_COLLECTION.USER_PROFILES, profileDetails);
    } catch (error) {
        console.error(`In UserProfilePersistence.insertOne throwing an error for profileDetails = ${JSON.stringify(profileDetails)} with message = ${error.message}`);
        throw error;
    }
}


export default UserProfilePersistence;