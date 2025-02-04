const CONSTANT_ENUM = require('../helpers/constant-enums');
const UserServices = require('../services/user-services');
const { ErrorHandler } = require('../utils/error-handler');
const { isEmpty } = require('../utils/utils');

// Middleware to validate user existence by email and JWT
module.exports =
    (isTrue = false) =>
    async (req, res, next) => {
        try {
            const role = req.user.role;
            const { id } = req.params;
            const { userID } = req.body;

            const userExist = await UserServices.getUserByID(userID || id, true);

            if (isEmpty(userExist)) throw new ErrorHandler(404, 'User account not found');

            if (isTrue) {
                if (role === CONSTANT_ENUM.USER_ROLE.ADMIN) next();
                else if (role === CONSTANT_ENUM.USER_ROLE.DISPATCHER && userExist?.role !== CONSTANT_ENUM.USER_ROLE.ADMIN) next();
                else if (role === CONSTANT_ENUM.USER_ROLE.INSPECTOR && ![CONSTANT_ENUM.USER_ROLE.ADMIN, CONSTANT_ENUM.USER_ROLE.DISPATCHER].includes(userExist?.role)) next();
                else if (role === CONSTANT_ENUM.USER_ROLE.DRIVER && CONSTANT_ENUM.USER_ROLE.DRIVER === userExist?.role) next();
                else return next(new ErrorHandler(401, 'You are not authorized'));
            } else {
                if (role === CONSTANT_ENUM.USER_ROLE.ADMIN && userExist?.role !== CONSTANT_ENUM.USER_ROLE.ADMIN) next();
                else if (role === CONSTANT_ENUM.USER_ROLE.DISPATCHER && ![CONSTANT_ENUM.USER_ROLE.ADMIN, CONSTANT_ENUM.USER_ROLE.DISPATCHER].includes(userExist?.role)) next();
                else if (role === CONSTANT_ENUM.USER_ROLE.INSPECTOR && userExist?.role === CONSTANT_ENUM.USER_ROLE.DRIVER) next();
                // else if (role === CONSTANT_ENUM.USER_ROLE.DRIVER && userExist?.role === CONSTANT_ENUM.USER_ROLE.DRIVER) next();
                else return next(new ErrorHandler(401, 'You are not authorized'));
            }
        } catch (err) {
            return next(new ErrorHandler(401, err?.message || "Couldn't verify your identity, please try logging in again"));
        }
    };
