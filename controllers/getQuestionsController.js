const Question = require("../models/questionModel");


const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getQuestionsBySubject = async (req, res) => {
    try {
        let { subject } = req.params;
        subject = subject.charAt(0).toUpperCase() + subject.slice(1);
        const questions = await Question.find({ subject: subject });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getQuestionsByCategory = async (req, res) => {
    try {
        let { difficulty } = req.params;
        difficulty = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        const questions = await Question.find({ difficulty: difficulty });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllQuestions,
    getQuestionsBySubject,
    getQuestionsByCategory
};
