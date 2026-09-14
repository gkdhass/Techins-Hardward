import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res, next) => {
  try {
    const { level, category, search, page = 1, limit = 12 } = req.query;
    
    const query = { published: true };
    
    if (level) query.level = level;
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }
    
    const courses = await Course.find(query)
      .populate('instructor', 'name avatar')
      .populate('category', 'name slug')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Course.countDocuments(query);
    
    res.status(200).json({
      success: true,
      message: 'Courses retrieved successfully',
      data: {
        courses,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:slug
// @access  Public
export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('instructor', 'name avatar bio')
      .populate('category', 'name slug');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
        error: 'Not found'
      });
    }
    
    const lessons = await Lesson.find({ course: course._id, published: true })
      .sort({ order: 1 });
    
    let isEnrolled = false;
    let enrollment = null;
    
    if (req.user) {
      enrollment = await Enrollment.findOne({
        user: req.user._id,
        course: course._id
      });
      isEnrolled = !!enrollment;
    }
    
    res.status(200).json({
      success: true,
      message: 'Course retrieved successfully',
      data: {
        course,
        lessons,
        isEnrolled,
        enrollment
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private (Instructor, Admin)
export const createCourse = async (req, res, next) => {
  try {
    req.body.instructor = req.user.id;
    
    // When using Cloudinary, req.file.path contains the Cloudinary URL
    // When using memory storage, would need manual upload
    if (req.file) {
      req.body.thumbnail = req.file.path || req.file.location || `/uploads/courses/${req.file.filename}`;
    }
    
    const course = await Course.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { course }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Instructor, Admin)
export const updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
        error: 'Not found'
      });
    }
    
    // Check ownership
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course',
        error: 'Forbidden'
      });
    }
    
    // When using Cloudinary, req.file.path contains the Cloudinary URL
    if (req.file) {
      req.body.thumbnail = req.file.path || req.file.location || `/uploads/courses/${req.file.filename}`;
    }
    
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: { course }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Instructor, Admin)
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
        error: 'Not found'
      });
    }
    
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course',
        error: 'Forbidden'
      });
    }
    
    await course.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
export const enrollInCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
        error: 'Not found'
      });
    }
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: req.user.id,
      course: req.params.id
    });
    
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course',
        error: 'Duplicate enrollment'
      });
    }
    
    const enrollment = await Enrollment.create({
      user: req.user.id,
      course: req.params.id
    });
    
    // Update enrollment count
    course.enrollmentCount += 1;
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: { enrollment }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my enrolled courses
// @route   GET /api/courses/my-learning
// @access  Private
export const getMyLearning = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate({
        path: 'course',
        populate: [
          { path: 'instructor', select: 'name avatar' },
          { path: 'category', select: 'name slug' }
        ]
      })
      .sort({ lastAccessedAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Enrolled courses retrieved',
      data: { enrollments }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete lesson
// @route   POST /api/courses/:courseId/lessons/:lessonId/complete
// @access  Private
export const completeLesson = async (req, res, next) => {
  try {
    const enrollment = await Enrollment.findOne({
      user: req.user.id,
      course: req.params.courseId
    });
    
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found',
        error: 'Not enrolled'
      });
    }
    
    // Check if already completed
    const alreadyCompleted = enrollment.completedLessons.some(
      cl => cl.lesson.toString() === req.params.lessonId
    );
    
    if (!alreadyCompleted) {
      enrollment.completedLessons.push({
        lesson: req.params.lessonId,
        completedAt: Date.now()
      });
      
      // Calculate progress
      const totalLessons = await Lesson.countDocuments({ course: req.params.courseId, published: true });
      enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
      
      // Check if course completed
      if (enrollment.progress === 100) {
        enrollment.completed = true;
        enrollment.completedAt = Date.now();
      }
      
      enrollment.lastAccessedAt = Date.now();
      await enrollment.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Lesson marked as complete',
      data: { enrollment }
    });
  } catch (error) {
    next(error);
  }
};
