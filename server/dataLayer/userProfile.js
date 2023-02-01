import constants from "../constants.js";
import MongoConnection from "../mongo_layer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";
import UserProfilesQueryHolder from "../mongoLayer/userProfile.js";

const UserProfileDAO = {};

/**
 * This function is used to get the user profile for given phone number
 * @param {string} phoneNumber
 * @returns user profile
 */

UserProfileDAO.getUserProfileByPhoneNumber = async (phoneNumber) => {
    try {
        console.info(`In UserProfileDAO.getUserProfileByPhoneNumber where phoneNumber = ${phoneNumber}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.PHONE_NUMBER]: phoneNumber?.toString() };
        let result = await MongoCRUD.get(connectDb, constants.MONGO_COLLECTION.USER_PROFILES, query);
        return result || {};
    } catch (error) {
        console.error(`In UserProfileDAO.getUserProfileByPhoneNumber ERROR : ${error.message} where phoneNumber = ${phoneNumber}`);
        throw error;
    }
}

/**
 * This function is used to get the user details and accounts by customerId
 * @param {string} customerId
 * @returns user profile with accounts
 */

UserProfileDAO.getUserDetails = async (customerId) => {
    try {
        console.info(`In UserProfileDAO.getUserDetails where customerId = ${customerId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = UserProfilesQueryHolder.getUserProfileWithAccounts(customerId)
        let result = await MongoCRUD.getAggregatedQueryResult(connectDb, constants.MONGO_COLLECTION.USER_PROFILES, query);
        return result[0] || {};
    } catch (error) {
        console.error(`In UserProfileDAO.getUserDetails ERROR : ${error.message} where customerId = ${customerId}`);
        throw error;
    }
}

export default UserProfileDAO;