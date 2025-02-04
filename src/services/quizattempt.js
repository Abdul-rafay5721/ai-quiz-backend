const QuizattemptSchemaDB = require('../models/quizattempt');

const createData = async (payloadData) => await QuizattemptSchemaDB(payloadData).save();

const updateData = async (id, newData) => await QuizattemptSchemaDB.findOneAndUpdate({ userId: id, 'result._id': newData._id }, { $set: { 'result.$': newData } }, { new: true });

const pushData = async (id, newData) => await QuizattemptSchemaDB.findOneAndUpdate({ userId: id }, { $push: { result: newData } }, { new: true });

const getAllData = async (filter) => await QuizattemptSchemaDB.find(filter);

const getDataByID = async (id, filter) => await QuizattemptSchemaDB.findById(id, filter);

const getDataByUserID = async (id) => await QuizattemptSchemaDB.findOne({ userId: id });

const deleteDataByID = async (id, filter) =>
    await QuizattemptSchemaDB.findOneAndUpdate(
        { _id: id, ...filter },
        {
            isDeleted: true,
            deleteData: new Date()
        },
        {
            new: true
        }
    );

const QuizattemptServices = {
    createData,
    updateData,
    getAllData,
    getDataByID,
    getDataByUserID,
    deleteDataByID,
    pushData
};

module.exports = QuizattemptServices;
