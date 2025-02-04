const config = require('../config/config');
const CONSTANT_ENUM = require('../helpers/constant-enums');
const UserServices = require('../services/user-services');
const { ErrorHandler } = require('../utils/error-handler');
const { randomNumberGenerate, isEmpty, generatePassword } = require('../utils/utils');
const { wrapAsync } = require('../utils/wrapAsync');
const jwt = require('jsonwebtoken');
const generateToken = require('../helpers/generate-token');

// Helper function to send response
const sendResponse = (res, data, message = 'Operation successful') => {
    res.status(200).json({ data, message });
};

// Login with email
const loginWithEmail = wrapAsync(async (req, res) => {
    const { email, password } = res.locals.jsonReq;

    const user = await UserServices.getUserByEmail(email, true);

    if (isEmpty(user)) throw new ErrorHandler(404, 'User account not found');

    if (!(await user.matchPassword(password))) throw new ErrorHandler(400, 'Incorrect email or password');

    const token = generateToken(user._id, user.role, '7d');
    const userWithoutPassword = await UserServices.getUserByID(user._id);
    sendResponse(res, { user: userWithoutPassword, token }, 'User logged in successfully');
});

// Register user by email
const registerUserByEmail = wrapAsync(async (req, res) => {
    const { email, password, userName } = res.locals.jsonReq;
    // const newPassword = generatePassword(8);

    let user = await UserServices.getUserByEmail(email, true);
    if (user && user?._id) throw new ErrorHandler(401, 'User already exists');

    if (!user) {
        user = await UserServices.createUser({
            email,
            password: password,
            userName,
            lastVisit: new Date()
        });
    }

    // await OTP.create({ otp, email });
    // MAIL_HANDLER.sendEmailToUserWithOTP(email, otp);

    const rest = { ...user };
    /* eslint-disable no-unused-vars */
    const { ..._rest } = rest['_doc'];
    const token = generateToken(user._id, user.role, '30d');

    // const userWithoutPassword = await UserServices.getUserByID(user._id);
    sendResponse(res, { user: _rest, token }, `User registered successfully`);
});

// Send OTP on email
const sendOtpOnEmail = wrapAsync(async (req, res) => {
    const { email } = res.locals.jsonReq;
    const newOtp = randomNumberGenerate(5);

    const user = await UserServices.getUserByEmail(email, true);

    if (isEmpty(user)) throw new ErrorHandler(404, 'User account not found');

    user.otp = newOtp;
    await user.save();

    // MAIL_HANDLER.sendEmailToUserWithOTP(email, otp);

    sendResponse(res, { otp: newOtp, userID: user?._id }, 'OTP has been sent to your email');
});

// Verify OTP
const verifyOTP = wrapAsync(async (req, res) => {
    const { userID, otp } = res.locals.jsonReq;

    const otpValid = await UserServices.getOTPByID(userID, otp);
    if (!otpValid) throw new ErrorHandler(401, 'OTP could not be verified, please try again');

    otpValid.otp = '';
    await otpValid.save();

    const token = generateToken(otpValid._id, otpValid.role, '30min');

    /* eslint-disable no-unused-vars */
    // const {  ...rest } = otpValid;

    sendResponse(res, { token }, 'User account verified successfully');
});

// Update email password
const updateEmailPassword = wrapAsync(async (req, res) => {
    const { password } = res.locals.jsonReq;
    const { user: userDetails } = req;

    const user = await UserServices.getUserByEmail(userDetails?.email, true);

    if (isEmpty(user)) throw new ErrorHandler(404, 'User account not found');

    const updatedUser = await UserServices.updateUserByID(user._id, { password });
    if (!updatedUser) throw new ErrorHandler(404, 'User does not exist');

    // const userWithoutPassword = await UserServices.getUserByID(user._id);
    sendResponse(res, {}, 'Password updated successfully');
});

// Update user email password
const updateUserEmailPassword = wrapAsync(async (req, res) => {
    const { password, userID } = res.locals.jsonReq;
    const { user } = req;

    const updatedUser = await UserServices.updateUserByID(userID, { password });
    if (!updatedUser) throw new ErrorHandler(404, 'User does not exist');

    const userWithoutPassword = await UserServices.getUserByID(user._id);
    sendResponse(res, userWithoutPassword, 'Password updated successfully');
});

// Update profile
const updateMyProfile = wrapAsync(async (req, res) => {
    const updateData = res.locals.jsonReq;
    const { user } = req;

    const updatedUser = await UserServices.updateUserByID(user._id, updateData);
    const userWithoutPassword = await UserServices.getUserByID(updatedUser._id);
    sendResponse(res, userWithoutPassword, 'User profile updated successfully');
});

// Update others roles profile
const updateOtherProfile = wrapAsync(async (req, res) => {
    const { userID, ...rest } = res.locals.jsonReq;

    console.log({ data: res.locals.jsonReq });

    const updatedUser = await UserServices.updateUserByID(userID, rest);
    const userWithoutPassword = await UserServices.getUserByID(updatedUser?._id, true);
    sendResponse(res, userWithoutPassword, 'User profile updated successfully');
});

// Get user profile
const getProfile = wrapAsync(async (req, res) => {
    const { user } = req;
    const userWithoutPassword = await UserServices.getUserByID(user._id);
    sendResponse(res, userWithoutPassword, 'User found successfully');
});

// Delete my account
const deleteMyAccount = wrapAsync(async (req, res) => {
    const { status = true } = res.locals.jsonReq;
    const { loggedInUser } = res.locals;

    const updatedUser = await UserServices.updateUserByID(loggedInUser._id, {
        isDeleted: status,
        deleteDate: new Date()
    });

    const userWithoutPassword = await UserServices.getUserByID(updatedUser._id);
    sendResponse(res, userWithoutPassword, 'Your account has been deleted successfully');
});

// Admin Routes
const getAllUsers = wrapAsync(async (req, res) => {
    const filters = {};
    // if (req.query['role']) filters.role = req.query.role;

    const users = await UserServices.getAllUsers(filters);
    sendResponse(res, users, 'Users found successfully');
});

const getUser = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const user = await UserServices.getUserByID(id);

    if (isEmpty(user)) throw new ErrorHandler(404, 'User account not found');

    sendResponse(res, user, 'User fetched successfully');
});

const deleteUser = wrapAsync(async (req, res) => {
    const { status } = res.locals.jsonReq;
    const { id } = req.params;

    const updatedUser = await UserServices.updateUserByID(id, {
        isDeleted: status,
        deleteDate: new Date()
    });

    const userWithoutPassword = await UserServices.getUserByID(updatedUser._id);
    sendResponse(res, userWithoutPassword, 'User account deleted successfully');
});

const dropUserCollection = wrapAsync(async (req, res) => {
    const result = await UserServices.dropUserCollection();
    sendResponse(res, result, 'Collection dropped successfully');
});

const getUserFromToken = wrapAsync(async (req, res) => {
    const { token } = req.body;

    if (!token) throw new ErrorHandler(404, 'Token not found');

    const decoded = jwt.verify(token, config.server.jwtSecretKey);
    let user = await UserServices.getUserByID(decoded.id, true);

    if (!user) throw new ErrorHandler(404, 'User not found');

    user = await UserServices.updateUserByID(user._id, { lastVisit: new Date() });
    const userWithoutPassword = await UserServices.getUserByID(user._id);
    sendResponse(res, userWithoutPassword, 'Token Verified');
});

const createDefaultAdmin = async () => {
    const isAdminExist = await UserServices.getNumberOfUsers({ role: CONSTANT_ENUM.USER_ROLE.ADMIN });

    if (isAdminExist === 0) {
        await UserServices.createUser({
            userName: 'John doe',
            email: config.server.email,
            password: config.server.password,
            role: CONSTANT_ENUM.USER_ROLE.ADMIN,
            isVerified: true,
            lastVisit: new Date()
        });

    }
};

const createApprovers = wrapAsync(async (req, res) => {
    const [...users] = req.body;

    if (!users?.length) throw new ErrorHandler(404, 'Users data missing');

    let createdUserIds = [];

    const emailList = users?.map((el) => el.email);
    const usersList = await UserServices.getAllUsers({ email: { $in: emailList } });

    let existingUsers = [];
    let newUsers = [];

    if (usersList?.length) {
        for (let index = 0; index < users.length; index++) {
            const element = users[index];

            const userIndex = usersList.findIndex((el) => el.email === element.email);

            if (userIndex > -1) existingUsers = [...existingUsers, usersList[userIndex]._id];
            else newUsers = [...newUsers, { ...element, role: CONSTANT_ENUM.USER_ROLE.APPROVER }];
        }
    } else {
        newUsers = users.map((el) => ({ ...el, role: CONSTANT_ENUM.USER_ROLE.APPROVER }));
    }

    if (newUsers?.length) {
        const createdUsers = await UserServices.createBulkUsers(newUsers);
        createdUserIds = createdUsers.map((user) => user._id);
    }

    const userData = [...existingUsers, ...createdUserIds];
    sendResponse(res, userData, 'Users created successfully');
});

const updateMyProfilePassword = wrapAsync(async (req, res) => {
    const { currentPassword, password } = res.locals.jsonReq;
    const { email, _id: userID } = req.user;

    const user = await UserServices.getUserByEmail(email, true);

    if (!(await user.matchPassword(currentPassword))) throw new ErrorHandler(400, 'Incorrect email or password');

    const updatedUser = await UserServices.updateUserByID(userID, { password });
    if (!updatedUser) throw new ErrorHandler(404, 'User does not exist');

    sendResponse(res, {}, 'Password updated successfully');
});


const registerOAuthUser = wrapAsync(async (req, res) => {
    const { authToken, authProvider = 'GMAIL', email, userName } = res.locals.jsonReq;

    let user = await UserServices.getUserByEmail(email);

    if (!user) {
        user = await UserServices.createUser({
            userName,
            email,
            authProvider,
            lastVisit: new Date()
        });
    }
    const token = generateToken(user._id, user.role, '30d');
    const userWithoutPassword = await UserServices.getUserByID(user._id);
    sendResponse(res, { user: userWithoutPassword, token }, 'User logged in successfully');

});

const updateUserSettings = wrapAsync(async (req, res) => {
    const { loggedInUser } = res.locals;
    const { ...rest } = res.locals.jsonReq;
    const updatedUser = await UserServices.updateUserByID(loggedInUser._id, rest);
    const userWithoutPassword = await UserServices.getUserByID(updatedUser?._id, false);
    sendResponse(res, userWithoutPassword, 'User profile updated successfully');
});

const updateUserSurvey = wrapAsync(async (req, res) => {
    const { loggedInUser } = res.locals;
    const { ...rest } = res.locals.jsonReq;
    let fieldsToUpdate = { ...rest, isSurveyComplete: true };
    const updatedUser = await UserServices.updateUserByID(loggedInUser._id, fieldsToUpdate);
    const userWithoutPassword = await UserServices.getUserByID(updatedUser?._id, false);
    sendResponse(res, userWithoutPassword, 'User profile updated successfully');
});

module.exports = {
    registerUserByEmail,
    sendOtpOnEmail,
    verifyOTP,
    updateEmailPassword,
    loginWithEmail,
    updateMyProfile,
    updateOtherProfile,
    getAllUsers,
    getUser,
    deleteUser,
    dropUserCollection,
    getUserFromToken,
    getProfile,
    deleteMyAccount,
    createDefaultAdmin,
    updateUserEmailPassword,
    createApprovers,
    updateMyProfilePassword,
    registerOAuthUser,
    updateUserSettings,
    updateUserSurvey
};
