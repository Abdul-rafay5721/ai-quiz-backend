const express = require('express');
const userRouter = express.Router();
const audit = require('../middleware/audit');
const { celebrate } = require('celebrate');
const UserController = require('../controllers/user-controllers');
const UserValidator = require('../request-schemas/user-schema.js');
const checkAuth = require('../middleware/check-auth.js');
const authorizedRoles = require('../middleware/authorized-roles.js');
const CONSTANT_ENUM = require('../helpers/constant-enums.js');
const checkObjectId = require('../helpers/check-object-id');
const accessRoles = require('../middleware/access-roles.js');

const API = {
    REGISTER_EMAIL_USER: '/register/email',
    REGISTER_OAUTH_USER: '/authenticate/oauth',
    CREATE_APPROVERS: '/approvers',
    GET_ALL_USERS: '/',
    SEND_OTP_ON_EMAIL: '/send/otp/email',
    VERIFY_OTP: '/verify_otp',
    // UPDATE_APPROVERS: '/approvers',
    UPDATE_MY_PASSWORD: '/update/password',
    UPDATE_MY_PROFILE_PASSWORD: '/update/my/password',
    LOGIN_EMAIL: '/login/email',
    UPDATE_MY_PROFILE: '/my_profile',
    UPDATE_OTHER_PROFILE: '/other_profile',
    DELETE_ACCOUNT: '/delete-account',
    DELETE_USER: '/delete/:id',
    DROP_COLLECTION: '/drop',
    DECODE_TOKEN: '/token',
    GET_USER: '/:id',
    UPDATE_SETTINGS: '/settings',
    UPDATE_SURVEY: '/survey',
};

userRouter.post(
    API.REGISTER_EMAIL_USER,
    audit,
    celebrate(UserValidator.registerUserByEmail),
    // checkAuth,
    // authorizedRoles([CONSTANT_ENUM.USER_ROLE.ADMIN, CONSTANT_ENUM.USER_ROLE.DISPATCHER]),
    UserController.registerUserByEmail
);

userRouter.post(
    API.REGISTER_OAUTH_USER,
    audit,
    celebrate(UserValidator.registerUserByOAuth),
    UserController.registerOAuthUser
);

userRouter.post(API.CREATE_APPROVERS, audit, celebrate(UserValidator.createApprovers), checkAuth, authorizedRoles([CONSTANT_ENUM.USER_ROLE.ADMIN]), UserController.createApprovers);

userRouter.post(API.DECODE_TOKEN, UserController.getUserFromToken);

userRouter.get(
    API.GET_ALL_USERS,
    audit,
    celebrate(UserValidator.getUsers),
    checkAuth,
    // authorizedRoles([CONSTANT_ENUM.USER_ROLE.ADMIN, CONSTANT_ENUM.USER_ROLE.DISPATCHER]),
    UserController.getAllUsers
);

userRouter.get(API.GET_USER, audit, celebrate(UserValidator.getUser), checkObjectId, UserController.getUser);

userRouter.put(API.SEND_OTP_ON_EMAIL, audit, celebrate(UserValidator.sendOTPonEmail), UserController.sendOtpOnEmail);

userRouter.put(API.VERIFY_OTP, audit, celebrate(UserValidator.verifiedOTP), UserController.verifyOTP);

userRouter.put(API.UPDATE_MY_PASSWORD, audit, celebrate(UserValidator.updateMyPassword), checkAuth, UserController.updateEmailPassword);

userRouter.put(API.UPDATE_MY_PROFILE_PASSWORD, audit, celebrate(UserValidator.updateMyProfilePassword), checkAuth, UserController.updateMyProfilePassword);

userRouter.post(API.LOGIN_EMAIL, audit, celebrate(UserValidator.loginWithEmail), UserController.loginWithEmail);

userRouter.put(API.UPDATE_OTHER_PROFILE, checkAuth, accessRoles(), audit, celebrate(UserValidator.updateOtherUser), UserController.updateOtherProfile);

userRouter.put(API.UPDATE_MY_PROFILE, checkAuth, audit, celebrate(UserValidator.updateMyProfile), UserController.updateMyProfile);

userRouter.put(API.DELETE_ACCOUNT, checkAuth, audit, celebrate(UserValidator.deleteAccount), UserController.deleteMyAccount);

userRouter.put(
    API.DELETE_USER,
    audit,
    celebrate(UserValidator.deleteUser),
    checkObjectId,
    checkAuth,
    authorizedRoles([CONSTANT_ENUM.USER_ROLE.ADMIN, CONSTANT_ENUM.USER_ROLE.SUPER_ADMIN]),
    UserController.deleteUser
);

userRouter.post(API.DROP_COLLECTION, audit, checkAuth, authorizedRoles([CONSTANT_ENUM.USER_ROLE.ADMIN, CONSTANT_ENUM.USER_ROLE.SUPER_ADMIN]), UserController.dropUserCollection);

userRouter.put(API.UPDATE_SETTINGS, checkAuth, audit, celebrate(UserValidator.updateUserSettings), UserController.updateUserSettings);

userRouter.put(API.UPDATE_SURVEY, checkAuth, audit, celebrate(UserValidator.updateSurveySettings), UserController.updateUserSurvey);

module.exports = userRouter;
