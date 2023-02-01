import Joi from 'joi';

const UserProfileSchema = {}

UserProfileSchema.createUser = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    userName: Joi.string().required(),
    accountType: Joi.string().required(),
    dob: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    idType: Joi.string().required(),
    idNumber: Joi.string().required(),
    customerId: Joi.string().required()
});

UserProfileSchema.createUserProfile = Joi.object().keys({
    phoneNumber: Joi.string().required(),
    userName: Joi.string().required()
});

UserProfileSchema.getUserDetails = Joi.object().keys({
    customerId: Joi.string().required()
});

UserProfileSchema.getAccountsByBranchId = Joi.object().keys({
    branchId: Joi.string().required()
});

UserProfileSchema.getUserDetailsByNumber = Joi.object().keys({
    phoneNumber: Joi.string().required()
});


export default UserProfileSchema;