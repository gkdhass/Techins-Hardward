import express from 'express';
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  voteQuestion,
  createAnswer,
  voteAnswer,
  acceptAnswer,
  getMyQuestions
} from '../controllers/questionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getQuestions);
router.get('/my-questions', protect, getMyQuestions);
router.get('/:id', getQuestion);
router.post('/', protect, createQuestion);
router.put('/:id', protect, updateQuestion);
router.delete('/:id', protect, deleteQuestion);
router.post('/:id/vote', protect, voteQuestion);
router.post('/:id/answers', protect, createAnswer);

// Answer routes
router.post('/answers/:id/vote', protect, voteAnswer);
router.post('/answers/:id/accept', protect, acceptAnswer);

export default router;
