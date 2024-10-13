# MCQ Quiz API

This project is a RESTful API for a Multiple Choice Question (MCQ) quiz application built with Node.js, Express, and MongoDB.

## Deployed API

The API is deployed and accessible at:

https://vcriate-assignment-g3iw.onrender.com

You can use this URL as the base for all API endpoints described below.

## Features

- User authentication (register, login, logout)
- Create and manage quizzes
- Take quizzes and submit answers
- View quiz results

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- MongoDB (v4 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/kkapil94/vcriate-assignment.git
   cd vcriate-assignment
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/mcq-quiz-db
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=10d
   ```
   Replace `your_access_token_secret` and `your_refresh_token_secret` with strong, unique secrets.

## Running the Application

To start the server, run:

```
npm run dev
```

The server will start on `http://localhost:4000` (or the port you specified in the .env file).

## API Endpoints

### Authentication

1. Register a new user

   - POST `/api/v1/users/register`
   - Body: `{ "fullName": "John Doe", "email": "john@example.com", "username": "johndoe", "password": "securepassword" }`

2. Login

   - POST `/api/v1/users/login`
   - Body: `{ "email": "john@example.com", "password": "securepassword" }` or `{ "username": "johndoe", "password": "securepassword" }`

3. Logout (Protected)

   - POST `/api/v1/users/logout`
   - Requires authentication

4. Refresh Token

   - POST `/api/v1/users/refresh-token`
   - Body: `{ "refreshToken": "your_refresh_token" }` (can also be sent in cookie)

5. Change Password (Protected)
   - POST `/api/v1/users/change-password`
   - Body: `{ "oldPassword": "oldpassword", "newPassword": "newpassword" }`
   - Requires authentication

### Quizzes (All Protected)

1. Create a new quiz

   - POST `/api/v1/quiz`
   - Body:
     ```json
     {
       "title": "JavaScript Basics",
       "description": "Test your knowledge of JavaScript fundamentals",
       "questions": [
         {
           "text": "Which keyword is used to declare a variable in JavaScript?",
           "options": ["var", "let", "const", "All of the above"],
           "correctAnswerIndex": 3
         }
         // ... more questions
       ]
     }
     ```

2. Get all quizzes

   - GET `/api/v1/quiz`

3. Get a specific quiz

   - GET `/api/v1/quiz/:id`

4. Submit quiz answers

   - POST `/api/v1/quiz/:id/submit`
   - Body: `{ "answers": [3, 1, 0, 2, 1] }` (array of selected answer indices)

5. Get quiz results
   - GET `/api/v1/quiz/:id/results`

## Testing the API

You can use tools like Postman or cURL to test the API endpoints. Here's an example workflow:

1. Register a new user
2. Login to get the access token
3. Use the access token in the Authorization header for subsequent requests
4. Create a new quiz
5. Get all quizzes to see your created quiz
6. Get a specific quiz by ID
7. Submit answers for the quiz
8. View the results of your quiz attempt

Remember to include the access token in the Authorization header for all protected routes:

```
Authorization: Bearer your_access_token_here
```
