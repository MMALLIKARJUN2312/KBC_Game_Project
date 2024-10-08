const questionModel = require('../models/questionModel');

const getQuestions = async (req, res) => {
    try {
        const questions = await questionModel.getAllQuestions();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({error : error.message})
    }
};

module.exports = {getQuestions};