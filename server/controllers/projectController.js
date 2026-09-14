import Project from '../models/Project.js';
import Comment from '../models/Comment.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    const { category, difficulty, search, featured, page = 1, limit = 12 } = req.query;
    
    const query = { published: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$text = { $search: search };
    }
    
    const projects = await Project.find(query)
      .populate('author', 'name avatar username')
      .populate('category', 'name slug')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Project.countDocuments(query);
    
    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        projects,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:slug
// @access  Public
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar username bio')
      .populate('category', 'name slug');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'Not found'
      });
    }
    
    // Increment views
    project.views += 1;
    await project.save();
    
    // Get comments
    const comments = await Comment.find({ project: project._id })
      .populate('user', 'name avatar username')
      .sort({ createdAt: -1 });
    
    // Check if current user liked this
    let isLiked = false;
    if (req.user) {
      isLiked = project.likes.includes(req.user._id);
    }
    
    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: {
        project,
        comments,
        isLiked
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  try {
    req.body.author = req.user.id;
    
    // Handle image uploads - Cloudinary stores URL in file.path
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map(file => file.path || file.location || `/uploads/projects/${file.filename}`);
    }
    
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'Not found'
      });
    }
    
    // Check ownership
    if (project.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project',
        error: 'Forbidden'
      });
    }
    
    // Handle new image uploads - Cloudinary stores URL in file.path
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path || file.location || `/uploads/projects/${file.filename}`);
      req.body.images = [...(project.images || []), ...newImages];
    }
    
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: { project }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'Not found'
      });
    }
    
    if (project.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project',
        error: 'Forbidden'
      });
    }
    
    await project.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike project
// @route   POST /api/projects/:id/like
// @access  Private
export const likeProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'Not found'
      });
    }
    
    const likeIndex = project.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      // Unlike
      project.likes.splice(likeIndex, 1);
    } else {
      // Like
      project.likes.push(req.user.id);
    }
    
    await project.save();
    
    res.status(200).json({
      success: true,
      message: likeIndex > -1 ? 'Project unliked' : 'Project liked',
      data: {
        likesCount: project.likes.length,
        isLiked: likeIndex === -1
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to project
// @route   POST /api/projects/:id/comments
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        error: 'Not found'
      });
    }
    
    const comment = await Comment.create({
      user: req.user.id,
      project: req.params.id,
      content: req.body.content
    });
    
    await comment.populate('user', 'name avatar username');
    
    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: { comment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's projects
// @route   GET /api/projects/my-projects
// @access  Private
export const getMyProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ author: req.user.id })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: { projects }
    });
  } catch (error) {
    next(error);
  }
};
