const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Question Paper Generator API',
            version: '1.0.0',
            description: 'API for managing questions and generating question papers',
        },
        servers: [
            {
                url: 'https://question-paper-generator-rx2z.onrender.com/',
                description: 'Local development server',
            },
        ],
    },
    apis: ['./routes/questionRouter.js', './controllers/questionController.js' , './controllers/getQuestionsController.js'],
    components: {
        schemas: {
            Question: {
                type: 'object',
                properties: {
                    question: { type: 'string' },
                    subject: { type: 'string' },
                    topic: { type: 'string' },
                    difficulty: { type: 'string' },
                    marks: { type: 'integer' },
                },
                required: ['question', 'subject', 'topic', 'difficulty', 'marks'],
                example: {
                    question: 'Explain the concept of superconductivity',
                    subject: 'Physics',
                    topic: 'Superconductivity',
                    difficulty: 'Medium',
                    marks: 4,
                },
            },
            QuestionPaper: {
                type: 'object',
                properties: {
                    totalMarks: { type: 'integer' },
                    difficultyDistribution:
                    {
                        typeof: 'object',
                        properties: {
                            easy: { type: 'integer' },
                            medium: { type: 'integer' },
                            hard: { type: 'integer' },
                        }
                    }
                },
                required: ['totalMarks', 'difficultyDistribution'],
                example:
                {
                    "totalMarks": 100,
                    "difficultyDistribution":
                    {
                        "easy": 25,
                        "medium": 50,
                        "hard": 25
                    }
                }
                ,
            },
        },
    },
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    serveSwaggerUI: swaggerUi.serve,
    setupSwaggerUI: swaggerUi.setup(swaggerSpec),
};
