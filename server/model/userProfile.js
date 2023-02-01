import constants from "../constants.js";

const UserProfileModel = {};

UserProfileModel.createUser = (userDetails) => {
    console.info(`Inside UserProfileModel.createUser where userDetails = ${JSON.stringify(userDetails)}`);
    let model = {
        idField: { [constants.MONGO_COLUMNS.CUSTOMER_ID]: userDetails.customerId },
        docToUpdate: {
            [constants.MONGO_COLUMNS.ADDRESS]: {
                [constants.MONGO_COLUMNS.PINCODE]: userDetails.pincode,
                [constants.MONGO_COLUMNS.STATE]: userDetails.state
            },
            [constants.MONGO_COLUMNS.DOB]: userDetails.dob,
            [constants.MONGO_COLUMNS.IS_ACTIVE]: true,
            [constants.MONGO_COLUMNS.DOCUMENT_DETAILS]: {
                [constants.MONGO_COLUMNS.DOCUMENT_NUMBER]: userDetails.idNumber,
                [constants.MONGO_COLUMNS.DOCUMENT_TYPE]: userDetails.idType
            },
            [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now()
        }
    }
    return model;
}

UserProfileModel.createUserProfile = (userDetails) => {
    console.info(`Inside UserProfileModel.createUserProfile where userDetails = ${JSON.stringify(userDetails)}`);
    let model = {
        [constants.MONGO_COLUMNS.CUSTOMER_ID]: (Date.now())?.toString(),
        [constants.MONGO_COLUMNS.IS_ACTIVE]: false,
        [constants.MONGO_COLUMNS.USERNAME]: userDetails.userName,
        [constants.MONGO_COLUMNS.PHONE_NUMBER]: userDetails.phoneNumber,
        [constants.MONGO_COLUMNS.CREATED_AT]: Date.now(),
        [constants.MONGO_COLUMNS.UPDATED_AT]: Date.now()
    }
    return model;
}

export default UserProfileModel;