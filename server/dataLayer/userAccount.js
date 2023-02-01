import constants from "../constants.js";
import MongoConnection from "../mongo_layer/mongoConnect.js";
import MongoCRUD from "../mongoLayer/mongoCrud.js";
import UserProfilesQueryHolder from "../mongoLayer/userProfile.js";

const UserAccountDAO = {};

/**
 * This function is used to get the user profile for given phone number
 * @param {string} phoneNumber
 * @returns user account
 */

UserAccountDAO.getAccountByCustomerIdAndAccountType = async (userDetails) => {
    try {
        console.info(`In UserProfileDAO.getUserProfileByPhoneNUmber where userDetails = ${JSON.stringify(userDetails)}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.CUSTOMER_ID]: userDetails?.customerId, [constants.MONGO_COLUMNS.ACCOUNT_TYPE]: userDetails?.accountType };
        let result = await MongoCRUD.get(connectDb, constants.MONGO_COLLECTION.USER_ACCOUNTS, query);
        return result || {};
    } catch (error) {
        console.error(`In UserAccountDAO.getAccountByCustomerIdAndAccountType ERROR : ${error.message} where userDetails = ${JSON.stringify(userDetails)}`);
        throw error;
    }
}

/**
 * This function is used to get the user profile for given accountId
 * @param {string} accountId
 * @returns user account
 */

UserAccountDAO.getAccountByAccountId = async (accountId) => {
    try {
        console.info(`In UserProfileDAO.getAccountByAccountId where accountId = ${accountId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = { [constants.MONGO_COLUMNS.ACCOUNT_ID]: accountId };
        let result = await MongoCRUD.get(connectDb, constants.MONGO_COLLECTION.USER_ACCOUNTS, query);
        return result || {};
    } catch (error) {
        console.error(`In UserAccountDAO.getAccountByAccountId ERROR : ${error.message} where accountId = ${accountId}`);
        throw error;
    }
}

/**
 * This function is used to get the user details and accounts by branchId
 * @param {string} branchId
 * @returns user profile with accounts
 */

UserAccountDAO.getAccountsByBranchId = async (branchId) => {
    try {
        console.info(`In UserAccountDAO.getAccountsByBranchId where branchId = ${branchId}`);
        let connectDb = await MongoConnection.getConnection(process.env.MONGO_DB);
        let query = UserProfilesQueryHolder.getUserProfileWithAccountsByBranchId(branchId)
        let result = await MongoCRUD.getAggregatedQueryResult(connectDb, constants.MONGO_COLLECTION.USER_ACCOUNTS, query);
        return result || {};
    } catch (error) {
        console.error(`In UserAccountDAO.getAccountsByBranchId ERROR : ${error.message} where branchId = ${branchId}`);
        throw error;
    }
}

export default UserAccountDAO;