import constants from "../../constants.js";
import Utils from "../../utils.js";

const TransactionHandlerDTO = {};

TransactionHandlerDTO.getBaseResponse = () => {
    return {
        success: true,
        message: "",
        data: {}
    }
}

TransactionHandlerDTO.getUserTransactionsResponse = (transactions) => {
    try {
        console.info(`In TransactionHandlerDTO.getUserTransactionsResponse where transactions = ${JSON.stringify(transactions)}`);
        return Utils.buildMap(transactions, constants.MONGO_COLUMNS.ACCOUNT_ID);
    } catch (error) {
        console.error(`Error in TransactionHandlerDTO.getUserTransactionsResponse where transactions = ${JSON.stringify(transactions)} with message = ${error.message}`);
    }
}

export default TransactionHandlerDTO;