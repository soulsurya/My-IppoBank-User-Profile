import Router from 'express-promise-router';
import constants from '../constants.js';
import Utils from '../utils.js'
import UserProfileSchema from '../joiSchemas/userProfile.js';
import UserProfileRouterDTO from './dto/userProfile.js';
import UserProfileHandler from '../handler/userProfile.js';

const router = Router();

router.get("/getUserById", async function (req, res) {
    try {
        let { error } = UserProfileSchema.getUserDetails.validate(req.query);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let customerId = UserProfileRouterDTO.getUserDetails(req.query);
        let result = await UserProfileHandler.getUserDetails(customerId);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/get with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.get("/getByBranchId", async function (req, res) {
    try {
        let { error } = UserProfileSchema.getAccountsByBranchId.validate(req.query);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let branchId = UserProfileRouterDTO.getAccountsByBranchId(req.query);
        let result = await UserProfileHandler.getAccountsByBranchId(branchId);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/get with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.get("/getUserByNumber", async function (req, res) {
    try {
        let { error } = UserProfileSchema.getUserDetailsByNumber.validate(req.query);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let phoneNumber = UserProfileRouterDTO.getUserDetailsByNumber(req.query);
        let result = await UserProfileHandler.getUserDetailsByNumber(phoneNumber);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/get with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/createUser", async function (req, res) {
    try {
        let { error } = UserProfileSchema.createUser.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = UserProfileRouterDTO.createUser(req.body);
        let result = await UserProfileHandler.createUser(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/createUser with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/createUserOnSignUp", async function (req, res) {
    try {
        let { error } = UserProfileSchema.createUserProfile.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = UserProfileRouterDTO.createUserProfile(req.body);
        let result = await UserProfileHandler.createUserProfile(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/createUserOnSignUp with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

export default router;