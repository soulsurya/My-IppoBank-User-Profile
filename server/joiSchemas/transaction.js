import Joi from 'joi';
import constants from '../constants.js';

const TransactionSchema = {}

TransactionSchema.createTransaction = Joi.object().keys({
    customerId: Joi.string().required(),
    accountId: Joi.string().required(),
    transactionValue: Joi.string().required(),
    transactionType: Joi.string().required().valid(constants.TRANSACTION_TYPES.CREDIT, constants.TRANSACTION_TYPES.DEBIT),
    paymentMode: Joi.string().required(),
    branchId: Joi.string().required(),
});

TransactionSchema.createUserTransaction = Joi.object().keys({
    customerId: Joi.string().required(),
    accountId: Joi.string().required(),
    transactionValue: Joi.string().required(),
    transactionType: Joi.string().required(),
    paidToAccountId: Joi.string().optional().allow(null, ''),
    paidToIfsc: Joi.string().optional().allow(null, ''),
    paymentMode: Joi.string().required(),
});

TransactionSchema.getByCustomerId = Joi.object().keys({
    customerId: Joi.string().required()
});


export default TransactionSchema;