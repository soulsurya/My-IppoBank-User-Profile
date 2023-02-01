import lodash from 'lodash';
import constants from "../constants.js";
import TransactionDAO from "../dataLayer/transaction.js";
import UserAccountDAO from "../dataLayer/userAccount.js";
import TransactionModel from "../model/transaction.js";
import TransactionPersistence from "../persistence/transaction.js";
import TransactionHandlerDTO from "./dto/transaction.js";
import UserAccountHandler from "./userAccount.js";

const TransactionHandler = {}

TransactionHandler.getUserTransactions = async (customerId) => {
    try {
        console.info(`TransactionHandler.getUserTransactions where customerId = ${customerId}`);
        let handlerResponse = TransactionHandlerDTO.getBaseResponse();
        let userTransactions = await TransactionDAO.getUserTransactions(customerId);
        handlerResponse.data = TransactionHandlerDTO.getUserTransactionsResponse(userTransactions);
        return handlerResponse;
    } catch (error) {
        console.error(`In TransactionHandler.getUserTransactions where customerId = ${customerId} and error is ${error.message}`);
        throw error;
    }
};

TransactionHandler.createTransaction = async (transactionDetails) => {
    try {
        console.info(`TransactionHandler.createTransaction where transactionDetails = ${JSON.stringify(transactionDetails)}`);
        let handlerResponse = TransactionHandlerDTO.getBaseResponse();
        let accountDetails = await UserAccountDAO.getAccountByAccountId(transactionDetails.accountId);
        let transactionModel = TransactionModel.create(transactionDetails, accountDetails);
        // Ideally we should use a transaction here to ensure the Atomicity and Consistency of the transaction but mongoDb requires replica set to be enabled to use transaction, so currently using synchronous CRUD operations
        //TODO: create a mongoDb transaction for updating transaction in DB 
        let updateUserAccount = await UserAccountHandler.updateBalanceFromBank(transactionDetails);
        if (!updateUserAccount.success) {
            handlerResponse.success = false;
            handlerResponse.message = constants.CUSTOM_MESSAGES[103]
        } else {
            await TransactionPersistence.insertOne(transactionModel);
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In TransactionHandler.createTransaction where transactionDetails = ${JSON.stringify(transactionDetails)} and error is ${error.message}`);
        throw error;
    }
};

TransactionHandler.createUserTransaction = async (transactionDetails) => {
    try {
        // Ideally we should use a transaction here to ensure the Atomicity and Consistency of the transaction but mongoDb requires replica set to be enabled to use transaction, so currently using synchronous CRUD operations
        //TODO: create a mongoDb transaction for updating transaction in DB 
        console.info(`TransactionHandler.createUserTransaction where transactionDetails = ${JSON.stringify(transactionDetails)}`);
        let handlerResponse = TransactionHandlerDTO.getBaseResponse();
        let accountDetails = await UserAccountDAO.getAccountByAccountId(transactionDetails.accountId);
        if (transactionDetails?.transactionType === constants.TRANSACTION_TYPES.DEBIT) {
            // Ideally we should first check if account exists or not then throw error, but for now I'm directly updating the record
            // TODO: Check if account exists then apply transaction
            await UserAccountHandler.creditBalance({ accountId: transactionDetails?.paidToAccountId, transactionValue: transactionDetails?.transactionValue })
            await UserAccountHandler.debitBalance(transactionDetails)
        } else {
            await UserAccountHandler.creditBalance(transactionDetails);
        }
        let transactionModel = TransactionModel.createFromUser(transactionDetails, accountDetails);
        await TransactionPersistence.insertOne(transactionModel);

        return handlerResponse;
    } catch (error) {
        console.error(`In TransactionHandler.createUserTransaction where transactionDetails = ${JSON.stringify(transactionDetails)} and error is ${error.message}`);
        throw error;
    }
};

export default TransactionHandler;