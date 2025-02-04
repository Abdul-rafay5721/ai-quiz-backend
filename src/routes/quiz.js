
const express = require('express');
const quizRouter = express.Router();
const { celebrate } = require('celebrate');
const QuizValidator = require('../request-schemas/quiz');
const QuizController = require('../controllers/quiz');

const API = {
  CREATE: '/',
  UPDATE: '/answer',
  GET: '/',
  GET_BY_ID: '/:id',
  DELETE: '/:id',
};

quizRouter.post(
  API.CREATE,
  celebrate(QuizValidator.createData),
  QuizController.createData
);

quizRouter.put(
  API.UPDATE,
  QuizController.updateData
);

quizRouter.get(
  API.GET,
  QuizController.getData
);

quizRouter.get(
  API.GET_BY_ID,
  celebrate(QuizValidator.getDataByID),
  QuizController.getData
);

quizRouter.delete(
  API.DELETE,
  celebrate(QuizValidator.getDataByID),
  QuizController.deleteDataByID
);

module.exports = quizRouter;


