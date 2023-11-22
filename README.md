# Question Paper Generator

This is a Node.js application which generates question paper according to total marks and difficulty distribution from easy, medium and hard questions. The questions are fetched from the database and are shuffled before generating the question paper.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- **Node.js and npm**
- **Docker and Docker Desktop**

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. **Clone the repository**
    ```bash
    git clone https://github.com/hirentimbadiya/question_paper_generator.git
    ```
2. **Set up the environment variables in .env file**
3. **Start Docker Desktop**
4. **go to root directory** of the project ***i.e. question_paper_generator***
5. **Run `docker-compose up` to start the server**
6. **change url in swagger.js file to `http://localhost:3000` if you are running the server locally**
7. **Go to `http://localhost:3000/api-docs` to view the Swagger documentation**

## File Structure

- `app.js`: The main application file.
- `routes/questionRouter.js`: Handles question-related routes.
- `controllers/questionController.js`: Handles question-related logic.
- `controllers/getQuestionsController.js`: Handles logic for getting questions from the database.
- `models/questionModel.js`: Defines the question schema.
- `swagger.js`: Sets up Swagger documentation.
- `docker-compose.yml`: Sets up the docker containers.
- `Dockerfile`: Sets up the docker image.

## Built With

- [Node.js](https://nodejs.org/en/) - Backend runtime
- [Express.js](https://expressjs.com/) - The web framework used
- [MongoDB](https://www.mongodb.com/) - Database Management
- [Swagger](https://swagger.io/) - API Documentation

## Authors

- [**hirentimbadiya**](https://github.com/hirentimbadiya)
- **Email** : **hirentimbadiya74@gmail.com**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details