const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const questionRouter = require('./routes/questionRouter');
const swagger = require('./swagger');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(cors());

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Swagger documentation setup
app.use('/api-docs', swagger.serveSwaggerUI, swagger.setupSwaggerUI);

app.get("/", (req, res) => {
    res.status(200).send("Server Is Up and Running. API Docs are available at /api-docs route");
})

// Use questionRouter for handling question-related routes
app.use('/questions', questionRouter);


// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Handle 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is Up and Running on Port ${port}`);
});