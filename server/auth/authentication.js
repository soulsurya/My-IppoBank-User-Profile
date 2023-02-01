import dotenv from 'dotenv';
import constants from "../constants.js";
import Utils from "./../utils.js";
dotenv.config();

export const authenticateRequest = (request, response, next) => {
    let authorization = request.headers.authorization;
    if (authorization === process.env.AUTH_KEY) {
        next();
    } else {
        response.status(401).json(Utils.formMessage(constants.DEFINED_ERRORS[401], 401));
    }
}