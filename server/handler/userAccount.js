import UserAccountHandlerDTO from "./dto/userAccount.js";
import UserAccountModel from "../model/userAccount.js";
import UserAccountPersistence from "../persistence/userAccount.js";

const UserAccountHandler = {}

UserAccountHandler.createAccount = async (accountDetails) => {
    try {
        console.info(`UserProfileHandler.createAccount where accountDetails = ${JSON.stringify(accountDetails)}`);
        let handlerResponse = UserAccountHandlerDTO.getBaseResponse();
        let userAccountModel = UserAccountModel.createAccount(accountDetails);
        handlerResponse.data = await UserAccountPersistence.insertOne(userAccountModel);
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.createAccount where accountDetails = ${JSON.stringify(accountDetails)} and error is ${error.message}`);
        throw error;
    }
};

UserAccountHandler.updateBalanceFromBank = async (transactionDetails) => {
    try {
        console.info(`UserProfileHandler.updateBalanceFromBank where transactionDetails = ${JSON.stringify(transactionDetails)}`);
        let handlerResponse = UserAccountHandlerDTO.getBaseResponse();
        let updateAccountModel = UserAccountModel.updateAccountForBankTransaction(transactionDetails);
        handlerResponse.data = await UserAccountPersistence.updateBalance(updateAccountModel);
        if (handlerResponse?.data?.modifiedCount !== 1) {
            handlerResponse.success = false
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.updateBalanceFromBank where transactionDetails = ${JSON.stringify(transactionDetails)} and error is ${error.message}`);
        throw error;
    }
};

UserAccountHandler.creditBalance = async (transactionDetails) => {
    try {
        console.info(`UserProfileHandler.creditBalance where transactionDetails = ${JSON.stringify(transactionDetails)}`);
        let handlerResponse = UserAccountHandlerDTO.getBaseResponse();
        let updateAccountModel = UserAccountModel.creditBalance(transactionDetails);
        handlerResponse.data = await UserAccountPersistence.updateBalance(updateAccountModel);
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.creditBalance where transactionDetails = ${JSON.stringify(transactionDetails)} and error is ${error.message}`);
        throw error;
    }
};

UserAccountHandler.debitBalance = async (transactionDetails) => {
    try {
        console.info(`UserProfileHandler.debitBalance where transactionDetails = ${JSON.stringify(transactionDetails)}`);
        let handlerResponse = UserAccountHandlerDTO.getBaseResponse();
        let updateAccountModel = UserAccountModel.debitBalance(transactionDetails);
        handlerResponse.data = await UserAccountPersistence.updateBalance(updateAccountModel);
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.debitBalance where transactionDetails = ${JSON.stringify(transactionDetails)} and error is ${error.message}`);
        throw error;
    }
};

export default UserAccountHandler;