const QuizSchemaDB = require('../models/quiz');

const createData = async (payloadData) => await QuizSchemaDB(payloadData).save();

const feedData = async (quizList) => await QuizSchemaDB.insertMany(quizList);

const updateData = async (id, updateData) => 
await QuizSchemaDB.findByIdAndUpdate(id, { ...updateData }, { new: true });

const getAllData = async (filter) => await QuizSchemaDB.find(filter);

const getDataByID = async (id, filter) => await QuizSchemaDB.findById(id, filter);

const deleteDataByID = async (id, filter) => await QuizSchemaDB.findOneAndUpdate(
    { _id: id, ...filter },
    {
      isDeleted: true,
      deleteData: new Date()
    },
    {
      new: true,
    }
  );

const QuizServices = {
  createData,
  feedData,
  updateData,
  getAllData,
  getDataByID,
  deleteDataByID,
};

module.exports = QuizServices;

