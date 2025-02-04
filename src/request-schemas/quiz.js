
const { Joi, Segments } = require('celebrate');

const createData = {
  [Segments.BODY]: Joi.object().keys({
    userName: Joi.string().required('user name is required'),
  }),
};

const getDataByID = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required('id is required'),
  }),
};

const QuizValidator = {
  createData,
  getDataByID
};

module.exports = QuizValidator;


