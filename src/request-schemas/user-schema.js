const { Joi, Segments } = require('celebrate');
const CONSTANT_ENUM = require('../helpers/constant-enums');

const registerUserByEmail = {
    // [Segments.HEADERS]: Joi.object()
    //     .keys({
    //         authorization: Joi.string().required()
    //     })
    //     .unknown(),
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),
        password: Joi.string()
            .min(8)
            // .pattern(/(?=.*[a-z])/, 'lowercase')
            // .pattern(/(?=.*[A-Z])/, 'uppercase')
            // .pattern(/(?=.*[0-9])/, 'number')
            // .pattern(/(?=.*[!@#$%^&*])/, 'special')
            .required()
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                // 'string.pattern.name': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                'any.required': 'Password is required'
            }),
        userName: Joi.string().required().messages({
            'any.required': 'Username is required'
        }),
        // role: Joi.string()
        //     .required()
        //     .valid(
        //         CONSTANT_ENUM.USER_ROLE.ADMIN,
        //         CONSTANT_ENUM.USER_ROLE.DISPATCHER,
        //         CONSTANT_ENUM.USER_ROLE.INSPECTOR,
        //         CONSTANT_ENUM.USER_ROLE.DRIVER,
        //         CONSTANT_ENUM.USER_ROLE.USER,
        //         CONSTANT_ENUM.USER_ROLE.APPROVER
        //     )
        //     .messages({
        //         'any.only': 'role must be from one of these admin, dispatcher, inspector, driver or user',
        //         'any.required': 'Role is required'
        //     }),
        // city: Joi.string().required().messages({
        //     'any.required': 'City is required'
        // }),
        // country: Joi.string().required().messages({
        //     'any.required': 'Country is required'
        // }),
        // streetAddress: Joi.string().required().messages({
        //     'any.required': 'Street Address is required'
        // }),
        // phoneNumber: Joi.string().required().messages({
        //     'any.required': 'PhoneNumber is required'
        // }),
        // image: Joi.string().allow(null, '').required().messages({
        //     'any.required': 'Image is required'
        // })
    })
};

const createApprovers = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.array().items(
        Joi.object().keys({
            email: Joi.string().email().required().messages({
                'string.email': 'Email must be a valid email address',
                'any.required': 'Email is required'
            }),
            userName: Joi.string().required().messages({
                'any.required': 'Username is required'
            }),
            designation: Joi.string().required().messages({
                'any.required': 'Designation is required'
            }),
            phoneNumber: Joi.string().required().messages({
                'any.required': 'PhoneNumber is required'
            })
        })
    )
};

const validOTP = {
    [Segments.BODY]: Joi.object().keys({
        otp: Joi.string().required().messages({
            'any.required': 'OTP is required'
        })
    })
};

const verifiedOTP = {
    [Segments.BODY]: Joi.object().keys({
        userID: Joi.string().required().messages({
            'any.required': 'userID is required'
        }),
        otp: Joi.string().required().messages({
            'any.required': 'OTP is required'
        })
    })
};

const sendOTPonEmail = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        })
    })
};

const updateEmailPassword = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.object().keys({
        userID: Joi.string().required().messages({
            'any.required': 'User ID is required'
        }),
        password: Joi.string()
            .min(8)
            .pattern(/(?=.*[a-z])/, 'lowercase')
            .pattern(/(?=.*[A-Z])/, 'uppercase')
            .pattern(/(?=.*[0-9])/, 'number')
            .pattern(/(?=.*[!@#$%^&*])/, 'special')
            .required()
            .label('Password')
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.name': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                'any.required': 'Password is required'
            }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm Password is required'
        })
    })
};

const updateMyProfilePassword = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.object().keys({
        currentPassword: Joi.string()
            .min(8)
            .pattern(/(?=.*[a-z])/, 'lowercase')
            .pattern(/(?=.*[A-Z])/, 'uppercase')
            .pattern(/(?=.*[0-9])/, 'number')
            .pattern(/(?=.*[!@#$%^&*])/, 'special')
            .required()
            .label('Password')
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.name': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                'any.required': 'Password is required'
            }),
        password: Joi.string()
            .min(8)
            .pattern(/(?=.*[a-z])/, 'lowercase')
            .pattern(/(?=.*[A-Z])/, 'uppercase')
            .pattern(/(?=.*[0-9])/, 'number')
            .pattern(/(?=.*[!@#$%^&*])/, 'special')
            .required()
            .label('Password')
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.name': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                'any.required': 'Password is required'
            }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm Password is required'
        })
    })
};

const updateMyPassword = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.object().keys({
        password: Joi.string()
            .min(8)
            .pattern(/(?=.*[a-z])/, 'lowercase')
            .pattern(/(?=.*[A-Z])/, 'uppercase')
            .pattern(/(?=.*[0-9])/, 'number')
            .pattern(/(?=.*[!@#$%^&*])/, 'special')
            .required()
            .label('Password')
            .messages({
                'string.min': 'Password must be at least 8 characters long',
                'string.pattern.name': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
                'any.required': 'Password is required'
            }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password').messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Confirm Password is required'
        })
    })
};

const getAllUsers = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown()
};

const verified = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().messages({
            'any.required': 'ID is required'
        })
    })
};

const loginWithEmail = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required'
        }),
        password: Joi.string().required().messages({
            'any.required': 'Password is required'
        })
    })
};

const createProfile = {
    [Segments.BODY]: Joi.object().keys({
        userName: Joi.string().max(15).alphanum().required().label('Username').messages({
            'string.max': 'Username must be at most 15 characters long',
            'string.alphanum': 'Username must contain only alphanumeric characters',
            'any.required': 'Username is required'
        }),
        gender: Joi.string().required().valid(CONSTANT_ENUM.GENDER.MALE, CONSTANT_ENUM.GENDER.FEMALE).messages({
            'any.only': 'Gender must be male or female',
            'any.required': 'Gender is required'
        })
    })
};

const deleteUser = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().messages({
            'any.required': 'ID is required'
        })
    })
};

const deleteAccount = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown()
};

const updateMyProfile = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.object().keys({
        userName: Joi.string()
            .optional()
            .messages({
                'any.required': 'Username is required'
            })
            .allow('', null),
        city: Joi.string()
            .optional()
            .messages({
                'any.required': 'City is required'
            })
            .allow('', null),
        country: Joi.string()
            .optional()
            .messages({
                'any.required': 'Country is required'
            })
            .allow('', null),
        streetAddress: Joi.string()
            .optional()
            .messages({
                'any.required': 'Street Address is required'
            })
            .allow('', null),
        phoneNumber: Joi.string()
            .optional()
            .messages({
                'any.required': 'PhoneNumber is required'
            })
            .allow('', null),
        image: Joi.string()
            .optional()
            .allow(null, '')
            .messages({
                'any.required': 'Image is required'
            })
            .allow('', null)
    })
};

const updateOtherUser = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.object().keys({
        userID: Joi.string().required().messages({
            'any.required': 'userID is required'
        }),
        email: Joi.string()
            .email()
            .optional()
            .messages({
                'string.email': 'Email must be a valid email address',
                'any.required': 'Email is required'
            })
            .allow('', null),
        userName: Joi.string()
            .optional()
            .messages({
                'any.required': 'Username is required'
            })
            .allow('', null),
        city: Joi.string()
            .optional()
            .messages({
                'any.required': 'City is required'
            })
            .allow('', null),
        country: Joi.string()
            .optional()
            .messages({
                'any.required': 'Country is required'
            })
            .allow('', null),
        streetAddress: Joi.string()
            .optional()
            .messages({
                'any.required': 'Street Address is required'
            })
            .allow('', null),
        phoneNumber: Joi.string()
            .optional()
            .messages({
                'any.required': 'PhoneNumber is required'
            })
            .allow('', null),
        image: Joi.string().optional().allow('', null).messages({
            'any.required': 'Image is required'
        }),
        role: Joi.string()
            .valid(
                CONSTANT_ENUM.USER_ROLE.ADMIN,
                CONSTANT_ENUM.USER_ROLE.DISPATCHER,
                CONSTANT_ENUM.USER_ROLE.INSPECTOR,
                CONSTANT_ENUM.USER_ROLE.DRIVER,
                CONSTANT_ENUM.USER_ROLE.USER,
                CONSTANT_ENUM.USER_ROLE.APPROVER
            )
            .messages({
                'any.only': 'role must be from one of these admin, dispatcher, inspector, driver or user',
                'any.required': 'Role is required'
            })
    })
};

const getUser = {
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required().messages({
            'any.required': 'ID is required'
        })
    })
};

const getUsers = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown()
};

const registerUserByOAuth = {
    [Segments.BODY]: Joi.object().keys(
        {
            // authToken: Joi.string().required().messages({
            //     'any.required': 'Auth token is required'
            // }),
            authProvider: Joi.string()
                .required()
                .valid(
                    CONSTANT_ENUM.AUTHTYPE.APPLE,
                    CONSTANT_ENUM.AUTHTYPE.GMAIL,
                    CONSTANT_ENUM.AUTHTYPE.SEED,
                )
                .messages({
                    'any.required': 'auth provider is required',
                    'any.only': 'auth provider must be from one of these GMAIL or APPLE'
                }),
            email: Joi.string().email().required().messages({
                // email: Joi.string().email().required().messages({
                //  'string.email': 'Email must be a valid email address',
                'any.required': 'Email is required'
            }),
            userName: Joi.string().required().messages({
                'any.required': 'User name is required'
            }),
        })
};

const updateUserSettings = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.object().keys({
        dailyLimit: Joi.string().required().messages({
            'any.required': 'daily limit is required'
        }),
        pouchPrice: Joi.string().required().messages({
            'any.required': 'price is required'
        }),
        pouchStrength: Joi.string().required().messages({
            'any.required': 'pouch strength is required'
        }),
    })
};

const updateSurveySettings = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string().required()
        })
        .unknown(),
    [Segments.BODY]: Joi.object().keys({
        dailyLimit: Joi.string().required().messages({
            'any.required': 'daily limit is required'
        }),
        pouchPrice: Joi.string().required().messages({
            'any.required': 'price is required'
        }),
        usageDuration: Joi.string().required().messages({
            'any.required': 'duration is required'
        }),
        quitPlanDays: Joi.string().required().messages({
            'any.required': 'quit plan is required'
        }),
    })
};

const UserValidator = {
    registerUserByEmail,
    createApprovers,
    updateMyProfile,
    updateOtherUser,
    validOTP,
    deleteUser,
    deleteAccount,
    getAllUsers,
    verified,
    verifiedOTP,
    loginWithEmail,
    updateEmailPassword,
    createProfile,
    getUser,
    getUsers,
    sendOTPonEmail,
    updateMyPassword,
    updateMyProfilePassword,
    registerUserByOAuth,
    updateUserSettings,
    updateSurveySettings
};

module.exports = UserValidator;
