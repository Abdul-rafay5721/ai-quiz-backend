const QuizServices = require('../services/quiz');
const quizQuestions = require('../temp/quiz');
const { wrapAsync } = require('../utils/wrapAsync');

const createData = async (req, res) => {
    const payloadData = req.body;

    const resp = await QuizServices.createData(payloadData);

    return res.status(201).json({
        data: resp,
        message: 'Record saved successfully'
    });
};

const feedQuiz = async () => {
    const allQuiz = await QuizServices.getAllData({});

    if (allQuiz?.length) return null;

    const quizList = quizQuestions;

    await QuizServices.feedData(quizList);

    return 'Record created';
};

const updateData = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const resp = await QuizServices.updateData(id, updateData);

    return res.status(200).json({
        data: resp,
        message: 'Record update successfully'
    });
};

const getData = async (req, res) => {
    let resp = null;

    const filter = Object.keys(req.query).reduce((a, b) => {
        a[b] = req.query[b];
        return a;
    }, {});

    if (req.params?.id) resp = await QuizServices.getDataByID(req.params?.id, filter);
    else resp = await QuizServices.getAllData(filter);

    return res.status(200).json({
        data: resp,
        message: 'Record fetch successfully'
    });
};

const deleteDataByID = async (req, res) => {
    const { id } = req.params;

    const filter = Object.keys(req.query).reduce((a, b) => {
        a[b] = req.query[b];
        return a;
    }, {});

    const resp = await QuizServices.deleteDataByID(id, filter);

    return res.status(200).json({
        data: resp,
        message: 'Record delete successfully'
    });
};

const QuizController = {
    createData: wrapAsync(createData),
    updateData: wrapAsync(updateData),
    getData: wrapAsync(getData),
    deleteDataByID: wrapAsync(deleteDataByID),
    feedQuiz
};

module.exports = QuizController;
