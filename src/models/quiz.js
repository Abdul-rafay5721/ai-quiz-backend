const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            trim: true
        },
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

const QuizSchemaDB = mongoose.model('quiz', quizSchema);
module.exports = QuizSchemaDB;
