import constants from "../constants.js";

const TransactionModel = {};

TransactionModel.create = (transactionDetails, accountDetails) => {
    console.info(`Inside TransactionModel.create where transactionDetails = ${JSON.stringify(transactionDetails)} and accountDetails = ${JSON.stringify(accountDetails)}`);
    //TODO:  Currently using Date.now() to create unique identifier we will get payment id from payment service provider 
    let model = {
        [constants.MONGO_COLUMNS.CUSTOMER_ID]: transactionDetails.customerId,
        [constants.MONGO_COLUMNS.ACCOUNT_ID]: transactionDetails.accountId,
        [constants.MONGO_COLUMNS.TRANSACTION_VALUE]: transactionDetails.transactionValue,
        [constants.MONGO_COLUMNS.TRANSACTION_TYPE]: transactionDetails.transactionType,
        [constants.MONGO_COLUMNS.PAYMENT_MODE]: transactionDetails.paymentMode,
        [constants.MONGO_COLUMNS.CLOSING_BALANCE]: (Number(accountDetails.currentBalance) || 0) - (Number(transactionDetails.transactionValue) || 0),
        [constants.MONGO_COLUMNS.BRANCH_ID]: transactionDetails?.branchId || "",
        [constants.MONGO_COLUMNS.IS_PAYMENT_COMPLETE]: true,
        [constants.MONGO_COLUMNS.PAYMENT_ID]: (Date.now())?.toString(),
        [constants.MONGO_COLUMNS.CREATED_AT]: Date.now(),
        [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now(),
    }
    return model;
}

TransactionModel.createFromUser = (transactionDetails, accountDetails) => {
    console.info(`Inside createFromUser.create where transactionDetails = ${JSON.stringify(transactionDetails)} and accountDetails = ${JSON.stringify(accountDetails)}`);
    //TODO:  Currently using Date.now() to create unique identifier we will get payment id from payment service provider 
    let model = {
        [constants.MONGO_COLUMNS.CUSTOMER_ID]: transactionDetails.customerId,
        [constants.MONGO_COLUMNS.ACCOUNT_ID]: transactionDetails.accountId,
        [constants.MONGO_COLUMNS.TRANSACTION_VALUE]: transactionDetails.transactionValue,
        [constants.MONGO_COLUMNS.TRANSACTION_TYPE]: transactionDetails.transactionType,
        [constants.MONGO_COLUMNS.PAYMENT_MODE]: transactionDetails.paymentMode,
        [constants.MONGO_COLUMNS.CLOSING_BALANCE]: transactionDetails.transactionType === constants.TRANSACTION_TYPES.DEBIT ? (Number(accountDetails.currentBalance) || 0) - (Number(transactionDetails.transactionValue) || 0) : (Number(accountDetails.currentBalance) || 0) + (Number(transactionDetails.transactionValue) || 0),
        [constants.MONGO_COLUMNS.BRANCH_ID]: transactionDetails?.branchId || "",
        [constants.MONGO_COLUMNS.PAID_TO_IFSC]: transactionDetails?.paidToIfsc,
        [constants.MONGO_COLUMNS.PAID_TO_ACCOUNT_ID]: transactionDetails?.paidToAccountId,
        [constants.MONGO_COLUMNS.IS_PAYMENT_COMPLETE]: true,
        [constants.MONGO_COLUMNS.PAYMENT_ID]: (Date.now())?.toString(),
        [constants.MONGO_COLUMNS.CREATED_AT]: Date.now(),
        [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now(),
    }
    return model;
}


export default TransactionModel;