import { asyncHandler } from '../utilities/asyncHandler.js';
import { ApiError } from '../utilities/ApiError.js';
import { ApiResponse } from '../utilities/ApiResponse.js';
import { Quiz } from '../model/quiz.model.js';
import { Question } from '../model/question.model.js';
import { Result } from '../model/result.model.js';

const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, questions } = req.body;

  if (!title || !description || !questions || questions.length === 0) {
    throw new ApiError(400, 'All fields are required');
  }

  const quiz = await Quiz.create({
    title,
    description,
    createdBy: req.user._id,
  });

  const questionDocs = await Question.insertMany(
    questions.map(q => ({ ...q, quiz: quiz._id })),
  );

  quiz.questions = questionDocs.map(q => q._id);
  await quiz.save();

  return res
    .status(201)
    .json(new ApiResponse(201, quiz, 'Quiz created successfully'));
});

const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find().select('title description createdAt');

  return res
    .status(200)
    .json(new ApiResponse(200, quizzes, 'Quizzes retrieved successfully'));
});

const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate('questions');

  if (!quiz) {
    throw new ApiError(404, 'Quiz not found');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, quiz, 'Quiz retrieved successfully'));
});

const submitQuizAnswers = asyncHandler(async (req, res) => {
  const { answers } = req.body;
  const quiz = await Quiz.findById(req.params.id).populate('questions');

  if (!quiz) {
    throw new ApiError(404, 'Quiz not found');
  }

  if (!answers || answers.length !== quiz.questions.length) {
    throw new ApiError(400, 'Invalid answers submission');
  }

  let score = 0;
  const resultAnswers = quiz.questions.map((question, index) => {
    const isCorrect = question.correctAnswerIndex === answers[index];
    if (isCorrect) score++;
    return {
      question: question._id,
      selectedAnswer: answers[index],
      isCorrect,
    };
  });

  const result = await Result.create({
    user: req.user._id,
    quiz: quiz._id,
    score,
    totalQuestions: quiz.questions.length,
    answers: resultAnswers,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Quiz submitted successfully'));
});

const getQuizResults = asyncHandler(async (req, res) => {
  const results = await Result.find({
    user: req.user._id,
    quiz: req.params.id,
  }).sort({ completedAt: -1 });

  if (results.length === 0) {
    throw new ApiError(404, 'No results found for this quiz');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, results, 'Quiz results retrieved successfully'));
});

export {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuizAnswers,
  getQuizResults,
};
