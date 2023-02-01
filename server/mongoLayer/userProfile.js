const UserProfilesQueryHolder = {}
//AggregateQuery to get user collection from mongo only the projected fields are returned

const GET_USER_BY_CUSTOMER_ID = [
    {
        '$match': ''
    }, {
        '$lookup': {
            'from': 'UserAccounts',
            'localField': 'customerId',
            'foreignField': 'customerId',
            'as': 'accounts'
        }
    }, {
        '$unwind': {
            'path': '$accounts',
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$lookup': {
            'from': 'Transactions',
            'localField': 'accounts.accountId',
            'foreignField': 'accountId',
            'as': 'accounts.transactions'
        }
    }, {
        '$group': {
            '_id': '$customerId',
            'data': {
                '$first': '$$ROOT'
            },
            'accounts': {
                '$push': '$accounts'
            }
        }
    }, {
        '$addFields': {
            'data.accounts': '$accounts'
        }
    }, {
        '$replaceRoot': {
            'newRoot': '$data'
        }
    }
]

const GET_USER_ACCOUNT_BY_CUSTOMER_ID = [
    {
        '$match': ''
    }, {
        '$lookup': {
            'from': 'Transactions',
            'localField': 'accounts.accountId',
            'foreignField': 'accountId',
            'as': 'transactions'
        }
    }
]


UserProfilesQueryHolder.getUserProfileWithAccounts = (customerId) => {
    console.info(`In UserProfilesQueryHolder.getUserProfileWithAccounts where customerId = ${customerId}`);
    let queryString = JSON.parse(JSON.stringify(GET_USER_BY_CUSTOMER_ID));
    queryString[0]["$match"] = { customerId };
    console.info(`In UserMongo.getSubscribedUserByDate queryString = ${JSON.stringify(queryString)}`);
    return queryString;
}

UserProfilesQueryHolder.getUserProfileWithAccountsByBranchId = (branchId) => {
    console.info(`In UserProfilesQueryHolder.getUserProfileWithAccountsByBranchId where branchId = ${branchId}`);
    let queryString = JSON.parse(JSON.stringify(GET_USER_ACCOUNT_BY_CUSTOMER_ID));
    queryString[0]["$match"] = { 'branchInformation.branchId': branchId };
    console.info(`In UserMongo.getUserProfileWithAccountsByBranchId queryString = ${JSON.stringify(queryString)}`);
    return queryString;
}


export default UserProfilesQueryHolder;
