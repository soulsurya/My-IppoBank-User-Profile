let constants = {
    DEFINED_ERRORS: {
        401: "Unauthorized to access the URL",
        701: "OOPS!! We are working on it",
        500: "Internal Server Error",
        200: "Success"
    },
    CUSTOM_MESSAGES: {
        100: "Error while creating user profile!",
        101: "Sorry, user already has this type of account!",
        102: "User account not found!",
        103: "Transaction failed, please try again!",
        400: "Page doesn't exist",
        401: 'This user is not authorized',
    },
    TYPE: {
        CONTENT_TYPE: "content-type",
        APPLICATION_URL_ENCODED: "application/x-www-xform-urlencoded",
        APPLICATION_JSON: "application/json",
        AUTHORIZATION: 'Authorization',
    },
    MONGO_COLUMNS: {
        CUSTOMER_ID: "customerId",
        PHONE_NUMBER: "phoneNumber",
        CREATED_AT: "createdAt",
        UPDATED_AT: "updatedAt",
        ADDRESS: "address",
        PINCODE: "pincode",
        STATE: "state",
        DOB: 'dob',
        DOCUMENT_DETAILS: "documentDetails",
        USERNAME: "userName",
        DOCUMENT_NUMBER: "documentNumber",
        DOCUMENT_TYPE: "documentType",
        ACCOUNT_ID: "accountId",
        ACCOUNT_TYPE: "accountType",
        CURRENT_BALANCE: "currentBalance",
        PAYMENT_ID: "paymentId",
        BRANCH_ID: 'branchId',
        BRANCH_NAME: 'branchName',
        IFSC: 'ifsc',
        BRANCH_INFORMATION: "branchInformation",
        TRANSACTION_VALUE: "transactionValue",
        TRANSACTION_TYPE: "transactionType",
        PAYMENT_MODE: "paymentMode",
        IS_PAYMENT_COMPLETE: "isPaymentComplete",
        PAID_TO_ACCOUNT_ID: 'paidToTransactionId',
        PAID_TO_IFSC: "paidToIfsc",
        IS_ACTIVE: 'isActive',
        CLOSING_BALANCE: 'closingBalance'
    },
    MONGO_COLLECTION: {
        USER_PROFILES: "UserProfiles",
        USER_ACCOUNTS: "UserAccounts",
        TRANSACTIONS: "Transactions",
    },
    /**
     * Came up with this simple definition all 
     * we need to do is define all of them here 
     * Mongo crud will take care of the rest
     */
    MONGO_INDEXES: {
        UserProfiles: {
            INDEXES: [
                {
                    "customerId": 1
                },
                {
                    "phoneNumber": 1
                }
            ]
        },
        UserAccounts: {
            INDEXES: [
                {
                    "customerId": 1
                },
                {
                    "accountId": 1
                },
                {
                    "branchInformation.branchId": 1
                },

            ]
        },
        Transactions: {
            INDEXES: [
                {
                    "customerId": 1
                },
                {
                    "accountId": 1
                }
            ]
        },
    },
    DEFAULT_BRANCH_DETAILS: {
        IFSC: 'BROBOMANIA',
        BRANCH_NAME: "Ahmedabad",
        BRANCH_ID: "63d8c9b5a1c039f2dfa8fa0a"
    },
    TRANSACTION_TYPES: {
        CREDIT: 'CREDIT',
        DEBIT: "DEBIT"
    }
}

export default constants;