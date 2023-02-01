import constants from "../constants.js";

const UserAccountModel = {};

UserAccountModel.createAccount = (userDetails) => {
    console.info(`Inside UserAccountModel.createAccount where userDetails = ${JSON.stringify(userDetails)}`);
    let model = {
        [constants.MONGO_COLUMNS.CUSTOMER_ID]: userDetails.customerId,
        [constants.MONGO_COLUMNS.ACCOUNT_ID]: (Date.now())?.toString(),
        [constants.MONGO_COLUMNS.ACCOUNT_TYPE]: userDetails.accountType,
        [constants.MONGO_COLUMNS.USERNAME]: userDetails.userName,
        [constants.MONGO_COLUMNS.PHONE_NUMBER]: userDetails.phoneNumber,
        [constants.MONGO_COLUMNS.BRANCH_INFORMATION]: {
            [constants.MONGO_COLUMNS.BRANCH_ID]: constants.DEFAULT_BRANCH_DETAILS.BRANCH_ID,
            [constants.MONGO_COLUMNS.BRANCH_NAME]: constants.DEFAULT_BRANCH_DETAILS.BRANCH_NAME,
            [constants.MONGO_COLUMNS.IFSC]: constants.DEFAULT_BRANCH_DETAILS.IFSC,
        },
        [constants.MONGO_COLUMNS.CURRENT_BALANCE]: 0,
        [constants.MONGO_COLUMNS.CREATED_AT]: Date.now(),
        [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now(),
    }
    return model;
}

UserAccountModel.updateAccountForBankTransaction = (transactionDetails) => {
    console.info(`Inside UserAccountModel.updateAccountForBankTransaction where transactionDetails = ${JSON.stringify(transactionDetails)}`);
    let model = {
        idField: { [constants.MONGO_COLUMNS.CUSTOMER_ID]: transactionDetails.customerId, [constants.MONGO_COLUMNS.ACCOUNT_ID]: transactionDetails.accountId },
        docToUpdate: {
            $inc: {
                [constants.MONGO_COLUMNS.CURRENT_BALANCE]: transactionDetails.transactionType === constants.TRANSACTION_TYPES.CREDIT ? Number(transactionDetails.transactionValue) : Number(transactionDetails.transactionValue) * -1
            },
            $set: { [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now() }
        },
    }
    return model;
}

UserAccountModel.debitBalance = (transactionDetails) => {
    console.info(`Inside UserAccountModel.debitBalance where transactionDetails = ${JSON.stringify(transactionDetails)}`);
    let model = {
        idField: { [constants.MONGO_COLUMNS.ACCOUNT_ID]: transactionDetails.accountId },
        docToUpdate: {
            $inc: {
                [constants.MONGO_COLUMNS.CURRENT_BALANCE]: Number(transactionDetails.transactionValue) * -1
            },
            $set: { [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now() }
        },
    }
    return model;
}

UserAccountModel.creditBalance = (transactionDetails) => {
    console.info(`Inside UserAccountModel.creditBalance where transactionDetails = ${JSON.stringify(transactionDetails)}`);
    let model = {
        idField: { [constants.MONGO_COLUMNS.ACCOUNT_ID]: transactionDetails.accountId },
        docToUpdate: {
            $inc: {
                [constants.MONGO_COLUMNS.CURRENT_BALANCE]: Number(transactionDetails.transactionValue)
            },
            $set: { [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now() }
        },
    }
    return model;
}


export default UserAccountModel;