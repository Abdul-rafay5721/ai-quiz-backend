const UserServices = require('../services/user-services');
const { ErrorHandler } = require('../utils/error-handler');

// Middleware to check if email exist or not
const checkEmailExist = () => {
    return async (req, res, next) => {
        if ('email' in req.body) {
            try {
                const user = await UserServices.getUserByEmail(req.body.email);
                if (user?.email) {
                    return next(new ErrorHandler(404, 'Email Already exist'));
                }

                next();
            } catch (error) {
                res.status(500).send({ message: `Error accessing ${error}` });
            }
        } else {
            next();
        }
    };
};

module.exports = checkEmailExist;
