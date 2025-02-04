const QuizattemptServices = require('../services/quizattempt');
const { wrapAsync } = require('../utils/wrapAsync');

const createData = async (req, res) => {
    const payloadData = req.body;

    const resp = await QuizattemptServices.createData(payloadData);

    return res.status(201).json({
        data: resp,
        message: 'Record saved successfully'
    });
};

const updateData = async (req, res) => {
    const updateData = req.body;

    const { userId, result } = updateData;
    let resp = null;

    const userData = await QuizattemptServices.getDataByUserID(userId);

    if (!userData) {
        resp = await QuizattemptServices.createData({ userId, result: [result] });
    } else {
        const isNew = userData.result.findIndex((el) => el._id === result._id);
        resp = isNew < 0 ? await QuizattemptServices.pushData(userId, result) : await QuizattemptServices.updateData(userId, result);
    }

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

    if (req.params?.id) resp = await QuizattemptServices.getDataByID(req.params?.id, filter);
    else resp = await QuizattemptServices.getAllData(filter);

    return res.status(200).json({
        data: resp,
        message: 'Record fetch successfully'
    });
};

const getUserData = async (req, res) => {
    const resp = await QuizattemptServices.getDataByUserID(req.params?.userId);

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

    const resp = await QuizattemptServices.deleteDataByID(id, filter);

    return res.status(200).json({
        data: resp,
        message: 'Record delete successfully'
    });
};

const QuizattemptController = {
    createData: wrapAsync(createData),
    updateData: wrapAsync(updateData),
    getData: wrapAsync(getData),
    getUserData: wrapAsync(getUserData),
    deleteDataByID: wrapAsync(deleteDataByID)
};

module.exports = QuizattemptController;
