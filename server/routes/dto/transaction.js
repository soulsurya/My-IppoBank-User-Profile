const TransactionRouterDTO = {};

TransactionRouterDTO.createTransaction = (request) => {
    console.info(`Inside TransactionRouterDTO.createTransaction where request = ${JSON.stringify(request)}`);
    return {
        customerId: request.customerId,
        accountId: request.accountId,
        transactionValue: request.amount,
        transactionType: request.transactionType,
        paymentMode: request.transactionMode,
        branchId: request.branchId
    };
}

TransactionRouterDTO.createUserTransaction = (request) => {
    console.info(`Inside TransactionRouterDTO.createUserTransaction where request = ${JSON.stringify(request)}`);
    return {
        customerId: request?.customerId,
        accountId: request?.accountId,
        transactionValue: request?.transactionValue,
        transactionType: request?.transactionType,
        paidToAccountId: request?.paidToAccountId || "",
        paidToIfsc: request?.paidToIfsc || "",
        paymentMode: request?.paymentMode || "",
    };
}

TransactionRouterDTO.getUserTransactions = (request) => {
    console.info(`Inside TransactionRouterDTO.getUserTransactions where request = ${JSON.stringify(request)}`);
    return request.customerId
}


export default TransactionRouterDTO;