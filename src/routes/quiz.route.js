import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuizAnswers,
  getQuizResults,
} from '../controllers/quiz.controller.js';

const router = Router();

router.use(verifyJWT); // All quiz routes require authentication

router.route('/').post(createQuiz).get(getAllQuizzes);
router.route('/:id').get(getQuizById);
router.route('/:id/submit').post(submitQuizAnswers);
router.route('/:id/results').get(getQuizResults);

export default router;
