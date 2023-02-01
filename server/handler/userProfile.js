import constants from "../constants.js";
import lodash from 'lodash';
import UserProfileHandlerDTO from "./dto/userProfile.js";
import UserProfileModel from "../model/userProfile.js";
import UserProfilePersistence from "../persistence/userProfile.js";
import UserProfileDAO from "../dataLayer/userProfile.js";
import UserAccountDAO from "../dataLayer/userAccount.js";
import UserAccountHandler from "./userAccount.js";

const UserProfileHandler = {}

UserProfileHandler.getUserDetails = async (customerId) => {
    try {
        console.info(`UserProfileHandler.getUserDetails where customerId = ${customerId}`);
        let handlerResponse = UserProfileHandlerDTO.getBaseResponse();
        handlerResponse.data = await UserProfileDAO.getUserDetails(customerId);
        if (lodash.isEmpty(handlerResponse.data)) {
            handlerResponse.success = false;
            handlerResponse.message = constants.CUSTOM_MESSAGES[102]
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.getUserDetails where customerId = ${customerId} and error is ${error.message}`);
        throw error;
    }
};

UserProfileHandler.getAccountsByBranchId = async (branchId) => {
    try {
        console.info(`UserProfileHandler.getAccountsByBranchId where branchId = ${branchId}`);
        let handlerResponse = UserProfileHandlerDTO.getBaseResponse();
        handlerResponse.data = await UserAccountDAO.getAccountsByBranchId(branchId);
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.getAccountsByBranchId where branchId = ${branchId} and error is ${error.message}`);
        throw error;
    }
};

UserProfileHandler.getUserDetailsByNumber = async (phoneNumber) => {
    try {
        console.info(`UserProfileHandler.getUserDetailsByNumber where phoneNumber = ${phoneNumber}`);
        let handlerResponse = UserProfileHandlerDTO.getBaseResponse();
        handlerResponse.data = await UserProfileDAO.getUserProfileByPhoneNumber(phoneNumber);
        if (lodash.isEmpty(handlerResponse.data)) {
            handlerResponse.success = false;
            handlerResponse.message = constants.CUSTOM_MESSAGES[102]
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.getUserDetailsByNumber where phoneNumber = ${phoneNumber} and error is ${error.message}`);
        throw error;
    }
};

UserProfileHandler.createUser = async (routerDTO) => {
    try {
        console.info(`UserProfileHandler.createUser where routerDTO = ${JSON.stringify(routerDTO)}`);
        let handlerResponse = UserProfileHandlerDTO.getBaseResponse();
        let previousAccount = await UserAccountDAO.getAccountByCustomerIdAndAccountType(routerDTO);
        if (!lodash.isEmpty(previousAccount)) {
            handlerResponse.message = constants.CUSTOM_MESSAGES[101];
            handlerResponse.success = false;
        } else {
            let userProfileModel = UserProfileModel.createUser(routerDTO);
            await UserProfilePersistence.createProfile(userProfileModel);
            await UserAccountHandler.createAccount(routerDTO);
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.createUser where routerDTO = ${JSON.stringify(routerDTO)} and error is ${error.message}`);
        throw error;
    }
};

UserProfileHandler.createUserProfile = async (routerDTO) => {
    try {
        console.info(`UserProfileHandler.createUserProfile where routerDTO = ${JSON.stringify(routerDTO)}`);
        let handlerResponse = UserProfileHandlerDTO.getBaseResponse();
        let userProfile = await UserProfileDAO.getUserProfileByPhoneNumber(routerDTO.phoneNumber);
        if (lodash.isEmpty(userProfile)) {
            userProfile = UserProfileModel.createUserProfile(routerDTO);
            await UserProfilePersistence.insertOne(userProfile);
        }
        handlerResponse.data = userProfile.customerId
        if (!handlerResponse.data) {
            handlerResponse.message = constants.CUSTOM_MESSAGES[100];
            handlerResponse.success = false;
        }
        return handlerResponse;
    } catch (error) {
        console.error(`In UserProfileHandler.createUserProfile where routerDTO = ${JSON.stringify(routerDTO)} and error is ${error.message}`);
        throw error;
    }
};

export default UserProfileHandler;