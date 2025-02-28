const UserServices = require('../services/user-services');
const config = require('../config/config');
const { ErrorHandler } = require('../utils/error-handler');
const { isEmpty } = require('../utils/utils');
const jwt = require('jsonwebtoken');

// Middleware to validate user existence by email and JWT
module.exports = async (req, res, next) => {
    try {
        // Validate the JWT
        const token = req.headers.authorization?.split(' ')[1];

        if (isEmpty(token)) {
            return next(new ErrorHandler(403, 'Token is missing'));
        }

        try {
            const decoded = jwt.verify(token, config.server.jwtSecretKey); // Verify JWT using the private key
            const userExist = await UserServices.getUserByID(decoded.id, true); // Include password for middleware check
            if (!userExist) {
                return next(new ErrorHandler(409, "Couldn't find your account, please create an account"));
            }
            req.user = userExist; // Saving userInfo info like email for later use
            res.locals.loggedInUser = userExist; //passing logged in email to next
        } catch (err) {
            return next(new ErrorHandler(401, "Couldn't verify your identity, please try logging in again"));
        }
        next();
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler(404, 'User account not found'));
    }
};
