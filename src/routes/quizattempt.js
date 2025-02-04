const express = require('express');
const quizattemptRouter = express.Router();
const { celebrate } = require('celebrate');
const QuizattemptValidator = require('../request-schemas/quizattempt');
const QuizattemptController = require('../controllers/quizattempt');

const API = {
    CREATE: '/',
    UPDATE: '/answer',
    GET: '/',
    GET_BY_USER_ID: '/user/:userId',
    DELETE: '/:id'
};

quizattemptRouter.post(API.CREATE, celebrate(QuizattemptValidator.createData), QuizattemptController.createData);

quizattemptRouter.put(API.UPDATE, QuizattemptController.updateData);

// quizattemptRouter.get(
//   API.GET,
//   QuizattemptController.getData
// );

quizattemptRouter.get(API.GET_BY_USER_ID, QuizattemptController.getUserData);

quizattemptRouter.delete(API.DELETE, celebrate(QuizattemptValidator.getDataByID), QuizattemptController.deleteDataByID);

module.exports = quizattemptRouter;
