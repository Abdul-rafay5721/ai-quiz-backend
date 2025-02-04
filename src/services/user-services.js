const User = require('../models/user-model');
const OTP = require('../models/otp-model');

const createUser = async (postData) => await User.create(postData);

const getUserByEmail = async (email, includePassword = false) => {
    const projection = includePassword ? {} : { password: 0 };
    return await User.findOne({ email }, projection);
};

const getAllUsers = async (filters = {}) =>
    await User.find({ ...filters, isDeleted: false }, { password: 0 })
        .sort({ createdAt: -1 })
        .lean();

const getNumberOfUsers = async (filter = {}) => await User.countDocuments(filter);

const getUser = async (filter, includePassword = false) => {
    const projection = includePassword ? {} : { password: 0 };
    return await User.findOne({ ...filter }, projection).lean();
};

const updateUserByID = async (id, updateData) => await User.findByIdAndUpdate(id, { ...updateData }, { new: true }).lean();

const updateUserByEmail = async (email, updateData) => await User.findOneAndUpdate({ email }, { ...updateData }, { new: true }).lean();

const getUserByID = async (id, includePassword = false) => {
    const projection = includePassword ? {} : { password: 0 };
    return await User.findOne({ _id: id }, projection).lean();
};

const getOTPByEmail = async (email, otp) => await OTP.findOne({ email, otp });

const getOTPByID = async (_id, otp) => await User.findOne({ _id, otp }, { password: 0 });

const dropUserCollection = async () => {
    await User.db.syncIndexes();
    await User.collection.drop();
};


const createBulkUsers = async (users) => await User.insertMany(users);

const UserServices = {
    createUser,
    getUserByEmail,
    getAllUsers,
    getNumberOfUsers,
    getUser,
    updateUserByID,
    updateUserByEmail,
    getUserByID,
    getOTPByEmail,
    dropUserCollection,
    getOTPByID,
    createBulkUsers
};

module.exports = UserServices;
