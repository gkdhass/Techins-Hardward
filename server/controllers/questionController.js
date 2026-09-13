import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
export const getQuestions = async (req, res, next) => {
  try {
    const { tags, search, sort = '-createdAt', page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const questions = await Question.find(query)
      .populate('author', 'name avatar username reputation')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);
    
    const count = await Question.countDocuments(query);
    
    res.status(200).json({
      success: true,
      message: 'Questions retrieved successfully',
      data: {
        questions,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single question
// @route   GET /api/questions/:id
// @access  Public
export const getQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('author', 'name avatar username reputation bio');
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
        error: 'Not found'
      });
    }
    
    // Increment views
    question.views += 1;
    await question.save();
    
    // Get answers
    const answers = await Answer.find({ question: question._id })
      .populate('author', 'name avatar username reputation')
      .sort({ accepted: -1, votes: -1, createdAt: 1 });
    
    res.status(200).json({
      success: true,
      message: 'Question retrieved successfully',
      data: {
        question,
        answers
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create question
// @route   POST /api/questions
// @access  Private
export const createQuestion = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    
    const question = await Question.create(req.body);
    await question.populate('author', 'name avatar username');
    
    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      data: { question }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private
export const updateQuestion = async (req, res, next) => {
  try {
    let question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
        error: 'Not found'
      });
    }
    
    if (question.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this question',
        error: 'Forbidden'
      });
    }
    
    question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Question updated successfully',
      data: { question }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete question
// @route   DELETE /api/questions/:id
// @access  Private
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
        error: 'Not found'
      });
    }
    
    if (question.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this question',
        error: 'Forbidden'
      });
    }
    
    await question.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Question deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Vote on question
// @route   POST /api/questions/:id/vote
// @access  Private
export const voteQuestion = async (req, res, next) => {
  try {
    const { type } = req.body; // 'up' or 'down'
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
        error: 'Not found'
      });
    }
    
    const userId = req.user.id;
    const upvoteIndex = question.upvotes.indexOf(userId);
    const downvoteIndex = question.downvotes.indexOf(userId);
    
    if (type === 'up') {
      if (upvoteIndex > -1) {
        // Remove upvote
        question.upvotes.splice(upvoteIndex, 1);
      } else {
        // Add upvote and remove downvote if exists
        question.upvotes.push(userId);
        if (downvoteIndex > -1) {
          question.downvotes.splice(downvoteIndex, 1);
        }
      }
    } else if (type === 'down') {
      if (downvoteIndex > -1) {
        // Remove downvote
        question.downvotes.splice(downvoteIndex, 1);
      } else {
        // Add downvote and remove upvote if exists
        question.downvotes.push(userId);
        if (upvoteIndex > -1) {
          question.upvotes.splice(upvoteIndex, 1);
        }
      }
    }
    
    await question.save();
    
    res.status(200).json({
      success: true,
      message: 'Vote recorded',
      data: {
        votes: question.votes,
        hasUpvoted: question.upvotes.includes(userId),
        hasDownvoted: question.downvotes.includes(userId)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create answer
// @route   POST /api/questions/:id/answers
// @access  Private
export const createAnswer = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
        error: 'Not found'
      });
    }
    
    const answer = await Answer.create({
      question: req.params.id,
      author: req.user.id,
      body: req.body.body
    });
    
    // Update answer count
    question.answerCount += 1;
    await question.save();
    
    await answer.populate('author', 'name avatar username reputation');
    
    res.status(201).json({
      success: true,
      message: 'Answer created successfully',
      data: { answer }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Vote on answer
// @route   POST /api/answers/:id/vote
// @access  Private
export const voteAnswer = async (req, res, next) => {
  try {
    const { type } = req.body;
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({
        success: false,
        message: 'Answer not found',
        error: 'Not found'
      });
    }
    
    const userId = req.user.id;
    const upvoteIndex = answer.upvotes.indexOf(userId);
    const downvoteIndex = answer.downvotes.indexOf(userId);
    
    if (type === 'up') {
      if (upvoteIndex > -1) {
        answer.upvotes.splice(upvoteIndex, 1);
      } else {
        answer.upvotes.push(userId);
        if (downvoteIndex > -1) {
          answer.downvotes.splice(downvoteIndex, 1);
        }
      }
    } else if (type === 'down') {
      if (downvoteIndex > -1) {
        answer.downvotes.splice(downvoteIndex, 1);
      } else {
        answer.downvotes.push(userId);
        if (upvoteIndex > -1) {
          answer.upvotes.splice(upvoteIndex, 1);
        }
      }
    }
    
    await answer.save();
    
    res.status(200).json({
      success: true,
      message: 'Vote recorded',
      data: {
        votes: answer.votes,
        hasUpvoted: answer.upvotes.includes(userId),
        hasDownvoted: answer.downvotes.includes(userId)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept answer
// @route   POST /api/answers/:id/accept
// @access  Private
export const acceptAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);
    
    if (!answer) {
      return res.status(404).json({
        success: false,
        message: 'Answer not found',
        error: 'Not found'
      });
    }
    
    const question = await Question.findById(answer.question);
    
    // Only question author can accept answer
    if (question.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only question author can accept an answer',
        error: 'Forbidden'
      });
    }
    
    // Unaccept previous answer if exists
    if (question.acceptedAnswer) {
      await Answer.findByIdAndUpdate(question.acceptedAnswer, { accepted: false });
    }
    
    // Accept this answer
    answer.accepted = true;
    await answer.save();
    
    question.acceptedAnswer = answer._id;
    question.solved = true;
    await question.save();
    
    res.status(200).json({
      success: true,
      message: 'Answer accepted',
      data: { answer }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's questions
// @route   GET /api/questions/my-questions
// @access  Private
export const getMyQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({ author: req.user.id })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Questions retrieved successfully',
      data: { questions }
    });
  } catch (error) {
    next(error);
  }
};
