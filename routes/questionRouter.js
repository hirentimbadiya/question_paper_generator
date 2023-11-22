const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const getQuestionsController = require("../controllers/getQuestionsController");

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API for managing questions
 */

/** ADD A QUESTION
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
router.post('/add', questionController.addQuestion);


/** GENERATE PAPER 
 * @swagger
 * /questions/generate-paper:
 *   post:
 *     summary: Generate a question paper
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalMarks:
 *                 type: integer
 *               difficultyDistribution:
 *                 type: object
 *                 properties:
 *                   easy:
 *                     type: integer
 *                   medium:
 *                     type: integer
 *                   hard:
 *                     type: integer
 *             example:
 *               totalMarks: 100
 *               difficultyDistribution:
 *                 easy: 25
 *                 medium: 50
 *                 hard: 25   
 *     responses:
 *       200:
 *         description: Question paper generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionPaper:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Question'
 *                 totalMarksGenerated:
 *                   type: integer
 *               example:
 *                 questionPaper:
 *                   - question: "What is the capital of India?"
 *                     subject: "Geography"
 *                     topic: "Countries and Capitals"
 *                     difficulty: "Easy"
 *                     marks: 1
 *                 totalMarksGenerated: 100
 *       500:
 *         description: Internal Server Error
 */
router.post('/generate-paper', questionController.generateQuestionPaper);


// GET ALL QUESTIONS ROUTE
/** ADD A QUESTION
 * @swagger
 * /questions/all:
 *   get:
 *     summary: get All Questions
 *     tags: [Questions]
 *     responses:
 *       201:
 *         description: All Questions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              example:
 *                   - question: "Explain the Laws of Motion"
 *                     subject: "Physics"
 *                     topic: "Laws of Motion"
 *                     difficulty: "Easy"
 *                     marks: 2
 *                   - question: "Solve for x: 2x + 5 = 15"
 *                     subject: "Mathematics"
 *                     topic: "Algebra"
 *                     difficulty: "Medium"
 *                     marks: 6
 *       500:
 *         description: Internal Server Error
 */
router.get('/all', getQuestionsController.getAllQuestions);


/** GET ALL QUESTIONS OF A SUBJECT ROUTE
 * @swagger
 * /questions/subject/{subject}:
 *   get:
 *     summary: get All Questions Of a Pertiular Subject
 *     tags: [Questions]
 *     parameters:
 *      - in: path
 *        name: subject
 *        schema:
 *          type: string
 *          required: true
 *          description: Name of the subject
 *          example: Mathematics
 *          enum: [Mathematics, Physics, Chemistry, Biology, English]
 *     responses:
 *       201:
 *         description: All Questions Of a Pertiular Subject fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              example:
 *                   - question: "Explain the Laws of Motion"
 *                     subject: "Physics"
 *                     topic: "Laws of Motion"
 *                     difficulty: "Easy"
 *                     marks: 2
 *                   - question: "Explain the concept of superconductivity"
 *                     subject: "Physics"
 *                     topic: "Superconductivity"
 *                     difficulty: "Medium"
 *                     marks: 4
 *       500:
 *         description: Internal Server Error
 */
router.get('/subject/:subject', getQuestionsController.getQuestionsBySubject);


/** GET ALL QUESTIONS OF A DIFFICULTY ROUTE
 * @swagger
 * /questions/difficulty/{difficulty}:
 *   get:
 *     summary: get All Questions Of a Pertiular Difficulty
 *     tags: [Questions]
 *     parameters:
 *      - in: path
 *        name: difficulty
 *        schema:
 *          type: string
 *          required: true
 *          description: Difficulty of the question
 *          example: Medium
 *          enum: [Easy, Medium, Hard]
 *     responses:
 *       201:
 *         description: All Questions Of a Pertiular Difficulty fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              example:
 *                   - question: "Explain the Laws of Motion"
 *                     subject: "Physics"
 *                     topic: "Laws of Motion"
 *                     difficulty: "Easy"
 *                     marks: 2
 *                   - question: "Solve for x: x + 5 = 15"
 *                     subject: "Mathematics"
 *                     topic: "Algebra"
 *                     difficulty: "Easy"
 *                     marks: 2
 *       500:
 *         description: Internal Server Error
 */
router.get('/difficulty/:difficulty', getQuestionsController.getQuestionsByCategory);

module.exports = router;