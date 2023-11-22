const Question = require('../models/questionModel');


/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - question
 *         - subject
 *         - topic
 *         - difficulty
 *         - marks
 *       properties:
 *         question:
 *           type: string
 *         subject:
 *           type: string
 *         topic:
 *           type: string
 *         difficulty:
 *           type: string
 *         marks:
 *           type: integer
 *       example:
 *         question: "Explain the concept of superconductivity"
 *         subject: "Physics"
 *         topic: "Superconductivity"
 *         difficulty: "Medium"
 *         marks: 4
 *     QuestionPaperRequest:
 *       type: object
 *       required:
 *          - totalMarks
 *          - difficultyDistribution
 *       properties:
 *         totalMarks:
 *           type: integer
 *         difficultyDistribution:
 *           type: object
 *           required:
 *              - easy
 *              - medium
 *              - hard
 *           properties:
 *              easy:
 *                  type: integer
 *              medium:
 *                  type: integer
 *              hard:
 *                  type: integer
 *       example:
 *         totalMarks: 100
 *         difficultyDistribution:
 *           easy: 25
 *           medium: 50
 *           hard: 25
 * 
 *     QuestionPaperResponse:
 *       type: object
 *       properties:
 *         questionPaper:
 *           type: array
 *         totalMarksGenerated:
 *           type: integer
 *       example:
 *         questionPaper: []
 *         totalMarksGenerated: 100
 *              
 */


// Function to add a new question
/**
 * @swagger
 * /questions/add:
 *   post:
 *     summary: Add a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question added successfully
 *       500:
 *         description: Internal Server Error
 */
const addQuestion = async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).send('Question added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


/**
 * @swagger
 * /questions/generate-paper:
 *   post:
 *     summary: generate a question paper
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionPaperRequest'
 *     responses:
 *       201:
 *         description: Question Paper generated successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionPaperResponse'
 *       500:
 *         description: Internal Server Error
 */
const generateQuestionPaper = async (req, res) => {
    try {
        //! Parse request parameters
        const { totalMarks, difficultyDistribution } = req.body;

        //* Calculate the number of marks for each difficulty level
        const easyMarksCount = Math.floor((difficultyDistribution.easy / 100) * totalMarks);
        const mediumMarksCount = Math.floor((difficultyDistribution.medium / 100) * totalMarks);
        const hardMarksCount = Math.floor((difficultyDistribution.hard / 100) * totalMarks);

        //* Track the category-wise sum of marks
        let easySum = 0;
        let mediumSum = 0;
        let hardSum = 0;

        const easyQuestions = await Question.find({ difficulty: 'Easy' });
        const totalEasyQuestions = easyQuestions.sort(() => Math.random() - 0.5).filter((question) => {
            if (easySum + question.marks <= easyMarksCount) {
                easySum += question.marks;
                return true;
            }
        });

        const mediumQuestions = await Question.find({ difficulty: 'Medium' });
        const totalMediumQuestions = mediumQuestions.sort(() => Math.random() - 0.5).filter((question) => {
            if (mediumSum + question.marks <= mediumMarksCount) {
                mediumSum += question.marks;
                return true;
            }
        });


        const hardQuestions = await Question.find({ difficulty: 'Hard' });
        const totalHardQuestions = hardQuestions.sort(() => Math.random() - 0.5).filter((question) => {
            if (hardSum + question.marks <= hardMarksCount) {
                hardSum += question.marks;
                return true;
            }
        });

        //* Combine the questions from different difficulty levels
        let questionPaper = [...totalEasyQuestions, ...totalMediumQuestions, ...totalHardQuestions];

        let remainingMarks = totalMarks - questionPaper.reduce((sum, question) => sum + question.marks, 0);

        if (remainingMarks > 0) {
            let randomQuestion = await Question.find();
            const randomArray = [...randomQuestion].sort((a, b) => b.marks - a.marks);

            for (let i = 0; i < randomArray.length; i++) {
                const element = randomArray[i];
                if (remainingMarks === 0) {
                    break;
                }

                if (element.marks > remainingMarks) {
                    continue;
                } else {
                    questionPaper.push(element);
                    remainingMarks -= element.marks;
                }
            }
        }

        questionPaper.sort(() => Math.random() - 0.5);

        let totalMarksGenerated = questionPaper.reduce((sum, question) => sum + question.marks, 0);

        res.status(200).json({
            questionPaper,
            totalMarksGenerated
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    addQuestion,
    generateQuestionPaper
};