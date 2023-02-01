import Router from 'express-promise-router';
import constants from '../constants.js';
import Utils from '../utils.js'
import TransactionRouterDTO from './dto/transaction.js';
import TransactionHandler from '../handler/transaction.js';
import TransactionSchema from '../joiSchemas/transaction.js';

const router = Router();

router.get("/getByCustomerId", async function (req, res) {
    try {
        let { error } = TransactionSchema.getByCustomerId.validate(req.query);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let customerId = TransactionRouterDTO.getUserTransactions(req.query);
        let result = await TransactionHandler.getUserTransactions(customerId);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/getByCustomerId with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/create", async function (req, res) {
    try {
        let { error } = TransactionSchema.createTransaction.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = TransactionRouterDTO.createTransaction(req.body);
        let result = await TransactionHandler.createTransaction(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in user/getByCustomerId with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

router.post("/createUserTransaction", async function (req, res) {
    try {
        let { error } = TransactionSchema.createUserTransaction.validate(req.body);
        if (error) {
            return res.status(400).json(Utils.formMessage(error.message, 400));
        }
        let routerDTO = TransactionRouterDTO.createUserTransaction(req.body);
        let result = await TransactionHandler.createUserTransaction(routerDTO);
        return res.jsonp(Utils.formMessage(result.success ? result.data : result.message, result.success ? 200 : 400));
    } catch (error) {
        console.error(`Error in transaction/createUserTransaction with message = ${error.message}`)
        return res.jsonp(Utils.formMessage(constants.DEFINED_ERRORS[701], 400));
    }
})

export default router;