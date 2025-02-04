const mongoose = require('mongoose');

const quizattemptSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        result: [],
        isDeleted: {
            type: Boolean,
            default: false
        },
        deleteDate: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
);

const QuizattemptSchemaDB = mongoose.model('quizattempt', quizattemptSchema);
module.exports = QuizattemptSchemaDB;
