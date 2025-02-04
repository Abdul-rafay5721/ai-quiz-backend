const mongoose = require('mongoose');
const CONSTANT_ENUM = require('../helpers/constant-enums');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: true
        },
        // role: {
        //     type: String,
        //     enum: [
        //         CONSTANT_ENUM.USER_ROLE.ADMIN,
        //         CONSTANT_ENUM.USER_ROLE.DISPATCHER,
        //         CONSTANT_ENUM.USER_ROLE.INSPECTOR,
        //         CONSTANT_ENUM.USER_ROLE.USER,
        //         CONSTANT_ENUM.USER_ROLE.DRIVER,
        //         CONSTANT_ENUM.USER_ROLE.APPROVER
        //     ]
        // },
        // authProvider: {
        //     type: String,
        //     enum: [
        //         CONSTANT_ENUM.AUTHTYPE.SEED,
        //         CONSTANT_ENUM.AUTHTYPE.APPLE,
        //         CONSTANT_ENUM.AUTHTYPE.GMAIL
        //     ]
        // },
        // authId: {
        //     type: String,
        //     trim: true,
        // },
        // isVerified: {
        //     type: Boolean,
        //     default: true
        // },

        //otp: String,
        password: {
            type: String,
            trim: true,
            required: true
        },
        // city: String,
        // country: String,
        // streetAddress: String,
        // phoneNumber: String,
        // designation: String,
        image: String,
        isDeleted: {
            type: Boolean,
            default: false
        },
        deleteDate: Date
    },
    { timestamps: true }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!enteredPassword || !this.password) {
        throw new Error('Missing data for password comparison');
    }
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.pre(['updateOne', 'findByIdAndUpdate', 'findOneAndUpdate'], async function (next) {
    const data = this.getUpdate();
    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
    }
    next();
});


const User = mongoose.model('users', userSchema);
module.exports = User;
